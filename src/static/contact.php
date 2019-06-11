<?php

include('./MailChimp.php');

use \DrewM\MailChimp\MailChimp;

// MailChimp API credentials
$api_key = 'd89063433b9cfdda27830cd21aaec8b7-us20';
$list_id = 'b1d6354484';

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
