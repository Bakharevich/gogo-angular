<?php
require_once 'config.php';

$query = $_REQUEST['q'];
if (!empty($_REQUEST['p'])) {
	$page = (int) $_REQUEST['p'];
}
else $page = 1;

$url = $CONFIG['proxy_url'] . urlencode($query) . "&p=" . $page . "&ip=" . $_SERVER['REMOTE_ADDR'] . "&spravka=" . @$_COOKIE['spravka'];
//echo urldecode($query) . "<br/>";
//echo $query . "<br/>";
//echo $url; exit();

//exit();

//echo $url;exit();

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$file = curl_exec($ch);
curl_close($ch);

$result = array();

if (!empty($file)) {
	//echo $file;
	//$xml = simplexml_load_string($file);
	$xml = new SimpleXMLElement($file);

	if ($xml->response->error) {
		$codesArr = $xml->xpath('response/error');
		$code = (string) $codesArr[0]->attributes()[0];

		// show me captcha
		if ($code == 100) {
			$urlArr = $xml->xpath('captcha-img-url');
			$url = (string) $urlArr[0];

			$keyArr = $xml->xpath('captcha-key');
			$key = (string) $keyArr[0];

			$statusArr = $xml->xpath('captcha-status');
			$status = (string) $statusArr[0];


			$result = array(
				'code' => $code,
				'captcha-img-url' => $url,
				'key' => $key,
				'status' => $status

			);
		}

		//echo "<pre>"; print_r($result);
		echo json_encode($result);
	}
	else {
		$response = $xml->response;

		// human results
		//$foundHumanArr = $xml->xpath('found-human');
		//$foundHuman = $foundHumanArr[0];
		//echo "<pre>"; var_dump($foundHuman);

		/// FOUND HUMAN!!!


		// request id
		$res = $response->reqid;
		if (!empty($res)) $result['reqid'] = $res;
		else $result['reqid'] = '';

		// results
		foreach ($response->results->grouping->group as $group) {
			$res = new stdClass();
			$res->url = $group->doc->url;
			$res->domain = $group->doc->domain;
			$res->title = isset($group->doc->title) ? highlight($group->doc->title) : $group->doc->url;
			$res->headline = isset($group->doc->headline) ? highlight($group->doc->headline) : null;
			$res->passages = isset($group->doc->passages->passage) ? $group->doc->passages->passage : null;
			$res->sitelinks = isset($group->doc->snippets->sitelinks->link) ? $group->doc->snippets->sitelinks->link : null;
			$res->size = isset($group->doc->size) ? $group->doc->size : null;
			//$res ->modtime      = isset($group->doc->modtime)?$group->doc->modtime:null;
			$res->charset = isset($group->doc->charset) ? $group->doc->charset : null;

			// hightlight
			//$res->title_hightlighted = highlight($res->title);
			$passage = "";
			if ($res->passages != null) {
				foreach ($res->passages as $one) {
					$passage .= highlight($one);
				}

				$res->passage = $passage;
			}

			$savedCopy = $group->xpath('doc/saved-copy-url');
			$res->savedCopy = isset($savedCopy[0]) ? $savedCopy[0] : null;

			//array_push($result, $res);
			$result['results'][] = $res;
			//echo "<pre>"; print_r($group); echo "</pre>";

		}

		echo json_encode($result);
	}
	//echo "<pre>"; print_r($result);
	//echo "<pre>"; print_r($xml);
	//echo "<pre>"; print_r($res);


	//$json = json_encode($xml);
	//echo $json;
}

//echo "<pre>"; print_r($result); exit();



function highlight($xml)
{
	// FIXME: very strangely method
	$text = $xml->asXML();

	$text = str_replace('<hlword>', '<strong>', $text);
	$text = str_replace('</hlword>', '</strong>', $text);
	$text = strip_tags($text, '<strong>');

	return $text;
}