<?php

require 'vendor/autoload.php'

$name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

$client = new GuzzleHttp\Client([
  'base_url' => 'http://admin.devonwalker.me'
]);

$response = $client->post('/message', [
    'body' => compact('name', 'email', 'message')
]);

echo json_encode($response->getBody());
