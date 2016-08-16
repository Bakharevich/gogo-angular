<?php
require dirname(__FILE__) . '/vendor/autoload.php';

use Yandex\Dictionary\DictionaryClient;

$key = "trnsl.1.1.20141114T081421Z.ee87f86ccbd82797.d6867de0c1215a33786b0f8073aa88ec4f62edba";

$dictionaryClient = new DictionaryClient($key);
$languages = $dictionaryClient->getLanguages();
echo "<pre>"; print_r($languages);

// get langs

$query = "Привет! Как твои дела?";
$lang = "be";

$url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' . $key . '&text=' . urlencode($query) . '&lang=' . $lang . '&format=html&options=&callback=';
$getTranslation = file_get_contents($url);
//$translation = Zend_Json::decode($getTranslation);

echo "<pre>"; print_r($getTranslation);