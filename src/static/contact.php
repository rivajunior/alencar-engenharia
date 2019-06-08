<?php

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];

    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        // MailChimp API credentials
        $API_KEY = 'a3a29a72565e38cb700a588e921752dd-us20';
        $LIST_ID = '9e67587f52';

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
        curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $API_KEY);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
        $result = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        header('Content-Type: application/json');
        http_response_code($httpCode);

        // store the status message based on response code
        if ($httpCode === 200) {
            echo "{ message: 'Sucesso! Recebemos seus dados. Em breve um de nossos consultores entrará em contato.' }";
        } else {
            switch ($httpCode) {
                case 214:
                    echo "{ message: 'Nós já recebemos seus dados. Aguarde, que em breve entraremos em contato. }";
                    break;
                default:
                    echo "{ message: 'Houve algum problema. Por favor, tente novamente.' }";
                    break;
            }
        }
    }else{
        echo "{ message: 'Por favor, envie um e-mail válido.' }";
    }
}
