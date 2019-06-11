<?php

include('./MailChimp.php');

use \DrewM\MailChimp\MailChimp;

// MailChimp API credentials
$api_key = 'a3a29a72565e38cb700a588e921752dd-us20';
$list_id = '007a483bd5';

$MailChimp = new MailChimp($api_key);

$data = json_decode(file_get_contents('php://input'));

$name = $data->name;
$phone = $data->phone;
$email = $data->email;

$result = $MailChimp->post("lists/$list_id/members", [
    "merge_fields" => [
        "FNAME" => $name,
        "LNAME" => "",
        "PHONE" => $phone
    ],
    'email_address' => $email,
    'status'        => 'subscribed',
]);

$response = $MailChimp->getLastResponse()['headers'];

header('Content-Type: application/json');

http_response_code($response['http_code']);

if ($response['http_code'] === 200) {
    $msg = ['message' => 'Sucesso! Recebemos seus dados. Em breve um de nossos consultores entrará em contato.'];
} else {
    switch ($response['http_code']) {
        case 214:
        $msg = ['message' => 'Nós já recebemos seus dados. Aguarde, que em breve entraremos em contato.'];
            break;
        default:
            $msg = ['message' => 'Houve algum problema. Por favor, tente novamente.'];
            break;
    }
}

echo json_encode($msg);
