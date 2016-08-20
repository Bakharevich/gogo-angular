<?php
header('Content-Type: text/html; charset=utf-8');

$query = urlencode($_REQUEST['query']);

$url = "http://suggest.yandex.net/suggest-ff.cgi?part=" . $query;
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$file = curl_exec($ch);
curl_close($ch);

$arr = json_decode($file);
//echo "<pre>"; print_r($arr);

$result['results'] = $arr[1];

echo json_encode($result);