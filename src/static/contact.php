<?php

$data = json_decode(file_get_contents('php://input'));

$name = $data->name;
$phone = $data->phone;
$email = $data->email;

header('Content-Type: application/json');

if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // MailChimp API credentials
    $API_KEY = 'a3a29a72565e38cb700a588e921752dd-us20';
    $LIST_ID = '007a483bd5';

    // MailChimp API URL
    $memberID = md5(strtolower($email));
    $dataCenter = substr($API_KEY,strpos($API_KEY,'-') + 1);
    $url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $LIST_ID . '/members/' . $memberID;

    // member information
    $json = json_encode([
        'name'          => $name,
        'email_address' => $email,
        'status'        => 'subscribed',
    ]);

    // send a HTTP POST request with curl
    $ch = curl_init($url);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_HTTPHEADER => array(
          "authorization: Basic $API_KEY",
          "content-type: application/json"
        ),
    ));
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    http_response_code($httpCode);

    // store the status message based on response code
    if ($httpCode === 200) {
        echo "{ message: 'Sucesso! Recebemos seus dados. Em breve um de nossos consultores entrará em contato.' }";
    } else {
        switch ($httpCode) {
            case 214:
                echo "{ message: 'Nós já recebemos seus dados. Aguarde, que em breve entraremos em contato.' }";
                break;
            default:
                echo "{ message: 'Houve algum problema. Por favor, tente novamente.' }";
                break;
        }
    }
} else {
    echo "{ message: 'Por favor, envie um e-mail válido.'}";
}
