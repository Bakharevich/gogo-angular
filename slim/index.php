<?php
session_start();

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

// config
$config['displayErrorDetails'] = true;

if ($_SERVER['REMOTE_ADDR'] == "127.0.0.1") {
	$config['db']['host'] = "127.0.0.1";
	$config['db']['user'] = "gogoby";
	$config['db']['pass'] = "12345";
	$config['db']['dbname'] = "gogoby_public";
}
else {
	$config['db']['host'] = "127.0.0.1";
	$config['db']['user'] = "gogoby_public";
	$config['db']['pass'] = "mornjmoupp";
	$config['db']['dbname'] = "gogoby_public";
}

$config['yandex']['translateKey'] = "trnsl.1.1.20141114T081421Z.ee87f86ccbd82797.d6867de0c1215a33786b0f8073aa88ec4f62edba";

// classes autoload
spl_autoload_register(function ($classname) {
	require ("../classes/" . $classname . ".php");
});

$app = new \Slim\App(["settings" => $config]);

// dependincies
$container = $app->getContainer();

// monolog
$container['logger'] = function($c) {
	$logger = new \Monolog\Logger('my_logger');
	$file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
	$logger->pushHandler($file_handler);
	return $logger;
};

// db
$container['db'] = function ($c) {
	$db = $c['settings']['db'];
	$pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
		$db['user'], $db['pass']);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	return $pdo;
};

// view
$container['view'] = new \Slim\Views\PhpRenderer('templates/');

// jsonview
$container['jsonview'] = function($c) {
	return new \Slim\Views\JsonView();
};

// routes
$app->get('/', function (Request $request, Response $response) {
	$name = $request->getAttribute('name');
	$response->getBody()->write("Hello, $name");

	$this->logger->addInfo("Something interesting happened");

	return $response;
})->setName('main');

// Users get
$app->get('/users', function (Request $request, Response $response) {
	$this->logger->addInfo('/users/ called');

	//$model = new UsersModel($this->db);
	//$response = $this->view->render($response, "users.phtml", ["users" => array(1,2,3), "router" => $this->router]);

	return $response;
})->setName('users');

// Create user
$app->post('/users', function (Request $request, Response $response) {
	$data = $request->getParsedBody();

	$userData = [];
	$userData['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
	$userData['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
	$userData['password'] = filter_var($data['password'], FILTER_SANITIZE_STRING);
	$userData['password2'] = filter_var($data['password2'], FILTER_SANITIZE_STRING);

	// check password
	if ($userData['password'] != $userData['password2']) {
		$res = array(
			'status' => array(
				'code' => 200,
				'error' => true,
				'message' => 'Passwords are not cofirmed'
			)
		);

		return $response->withJson($res, 200);
	}

	// check if such user exists
	$statement = $this->db->prepare("SELECT * FROM Users WHERE Email = :email LIMIT 1");
	$statement->execute(array("email" => $userData['email']));
	$res = $statement->fetch();

	if (!empty($res['Email'])) {
		$res = array(
			'status' => array(
				'code' => 200,
				'error' => true,
				'message' => 'Such user exists'
			)
		);

		return $response->withJson($res, 200);
	}


	// add user
	$statement = $this->db->prepare("INSERT INTO Users (Email, Password, Name) VALUES (:email, :password, :name)");
	$statement->execute(array("email" => $userData['email'], "password" => md5($userData['password']), "name" => $userData['name']));

	$userId = $this->db->lastInsertId();

	$_SESSION['user_info'] = array(
		'user_id' => $userId,
		'email' => $userData['email'],
		'name' => $userData['name']
	);

	$res = array(
		'status' => array(
			'code' => 200,
			'error' => false,
			'message' => 'Added user successfully'
		),
		'data' => array(
			'user_id' => $userId,
			'email' => $userData['email'],
			'name' => $userData['name']
		)
	);

	//return $this->jsonview->render($response, $res, 200);
	$newResponse = $response->withJson($res, 200);

	return $newResponse;
})->setName('users_add');

// Sign in user
$app->put('/users/signin', function (Request $request, Response $response) {
	$data = $request->getParsedBody();

	$userData = [];
	$userData['email'] = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
	$userData['password'] = filter_var($data['password'], FILTER_SANITIZE_STRING);

	// get info about user
	$statement = $this->db->prepare("SELECT * FROM Users WHERE Email = :email AND Password = :password LIMIT 1");
	$statement->execute(array("email" => $userData['email'], "password" => md5($userData['password'])));
	$res = $statement->fetch();

	if (empty($res['Email'])) {
		$res = array(
			'status' => array(
				'code' => 400,
				'error' => true,
				'message' => 'Email or password are incorrect'
			)
		);

		return $response->withJson($res, 400);
	}
	else {
		$_SESSION['user_info'] = array(
			'user_id' => $res['UserId'],
			'email' => $res['Email'],
			'name' => $res['Name']
		);

		// authenticate user
		$res = array(
			'status' => array(
				'code' => 200,
				'error' => false,
				'message' => 'Welcome!'
			),
			'data' => $_SESSION['user_info']
		);

		return $response->withJson($res, 200);
	}

	return $newResponse;
})->setName('users_signin');

// Sign in user
$app->get('/users/signout', function (Request $request, Response $response) {
	$data = $request->getParsedBody();

	$userData = [];

	if (empty($_SESSION['user_info'])) {
		$res = array(
			'status' => array(
				'code' => 403,
				'error' => true,
				'message' => 'You are not authorized'
			)
		);

		return $response->withJson($res, 403);
	}
	else {
		// destroy session
		setcookie(session_name(), '', 100);
		session_unset();
		session_destroy();
		$_SESSION = array();

		// authenticate user
		$res = array(
			'status' => array(
				'code' => 200,
				'error' => false,
				'message' => 'Successfully logout'
			)
		);

		return $response->withJson($res, 200);
	}

	return $newResponse;
})->setName('users_logout');

// Get user me
$app->get('/users/me', function (Request $request, Response $response) {
	$data = $request->getParsedBody();

	$userData = [];

	if (empty($_SESSION['user_info']['user_id'])) {
		$res = array(
			'status' => array(
				'code' => 403,
				'error' => true,
				'message' => 'You are not authorized'
			)
		);

		return $response->withJson($res, 403);
	}

	$userId = $_SESSION['user_info']['user_id'];

	// get info about user
	$statement = $this->db->prepare("SELECT * FROM Users WHERE UserId = :userId LIMIT 1");
	$statement->execute(array("userId" => $userId));
	$res = $statement->fetch();

	if (empty($res['Email'])) {
		$res = array(
			'status' => array(
				'code' => 403,
				'error' => true,
				'message' => 'You are not authorized'
			)
		);

		return $response->withJson($res, 403);
	}
	else {
		// authenticate user
		$res = array(
			'status' => array(
				'code' => 200,
				'error' => false,
				'message' => 'Welcome!'
			),
			'data' => array(
				'user_id' => $res['UserId'],
				'email' => $res['Email'],
				'name' => $res['Name']
			)
		);

		return $response->withJson($res, 200);
	}

	return $newResponse;
})->setName('users_me');

//
// translate
//
$app->get('/translate/getlangs', function (Request $request, Response $response) {
	$yandexKey = $this->get('settings')['yandex']['translateKey'];
	$url = "https://translate.yandex.net/api/v1.5/tr.json/getLangs?key={$yandexKey}&ui=en";
	$res = file_get_contents($url);

	$res = array(
		'status' => array(
			'code' => 200,
			'error' => false,
			'message' => 'Get langs'
		),
		'data' => json_decode($res)
	);

	return $response->withJson($res, 200);


})->setName('translate_getlangs');

$app->get('/translate/translate', function (Request $request, Response $response) {
	$yandexKey = $this->get('settings')['yandex']['translateKey'];

	$data = $request->getQueryParams();

	$userData = [];
	$userData['from'] = filter_var($data['from'], FILTER_SANITIZE_STRING);
	$userData['to'] = filter_var($data['to'], FILTER_SANITIZE_STRING);
	$userData['text'] = urlencode(filter_var($data['text'], FILTER_SANITIZE_STRING));

	$url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key={$yandexKey}&text={$userData['text']}&lang={$userData['from']}-{$userData['to']}";
	$res = file_get_contents($url);

	$res = array(
		'status' => array(
			'code' => 200,
			'error' => false,
			'message' => 'Translate'
		),
		'data' => json_decode($res)
	);

	return $response->withJson($res, 200);


})->setName('translate_translate');

$app->run();