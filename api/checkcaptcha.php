<?php
$key = $_REQUEST['key'];
$rep = $_REQUEST['rep'];

$url = "https://xmlsearch.yandex.ru/xcheckcaptcha?key=" . urlencode($key) . "&rep=" . urlencode($rep);

$ch = curl_init();

//echo $url;

curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-Real-Ip: ' . @$_SERVER["REMOTE_ADDR"]));
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$file = curl_exec($ch);
$info = curl_getinfo($ch);
curl_close($ch);

echo "<pre>"; print_r($info);

preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $file, $matches);

$cookies = array();

foreach($matches[1] as $item) {
	parse_str($item, $cookie);
	$cookies = array_merge($cookies, $cookie);
}

$_COOKIE['spravka'] = @$cookies['spravka'];