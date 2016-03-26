<?php
$m = new MongoClient(); // connect
$db = $m->selectDB("auth");

$collection = $db->users;

// insert
$user = array(
	'name' => 'Yanina Yushkevich'
);
//$collection->insert($user);
//echo "ID: " . $user['_id'] . "<br/>";

// update
$filter = array('_id' => new MongoId('56ebbe2db278fd10dda5823a'));
$new =
	array(
		'$set' => array(
			//'name' => 'Ilya Ivanovich Bakharevich'
			'address' => 'Miasnikova str, 78 - 1'
		))
;
$options['multiple'] = false;
//$collection->update($filter, $new, $options);


// get all
$cursor = $collection->find();
foreach ($cursor as $user) {
	//echo "<pre>";print_r($user);
	//echo $user['_id'] . "<br/>";
	//echo $user['name'];
}

// get one
$filter = array('name' => 'Ilya Bakharevich');
$cursor = $collection->find($filter);
foreach ($cursor as $user) {
	//echo "<pre>";print_r($user);
	//echo $user['_id'] . "<br/>";
	//echo $user['name'];
}


// deleting
$filter = array('field' => 'foo');
//$collection->remove($filter);