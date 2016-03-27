<?php
$key = $_REQUEST['key'];
$rep = $_REQUEST['rep'];

$url = "https://xmlsearch.yandex.ru/xcheckcaptcha?key={$key}&rep={$rep}";

$ch = curl_init();

//echo $url;

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Cookie: spravka=' . @$_COOKIE['spravka'], 'X-Real-Ip: ' . @$_SERVER["REMOTE_ADDR"]));
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_VERBOSE, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$file = curl_exec($ch);
curl_close($ch);

//echo $file;

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($file, 0, $header_size);
$body = substr($file, $header_size);

//echo "Headers: " . $header . "\n\n" . $body;