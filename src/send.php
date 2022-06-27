<?php

$name = $_POST['name'];
$email = $_POST['email'];
$msg = $_POST['msg'];

$message = '<html>
                <body>
                  <p><b>Имя:</b> ' . $name . '</p>
                  <p><b>Email:</b> ' . $email . '</p>
                  <p><b>Сообщение:</b> ' . $msg . '</p>
                </body>
              </html>';

$subject = "=?utf-8?b?" . base64_encode("Сообщение с сайта") . "?=";
$headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";

$success = mail("danil@letmepresentmyself.site", $subject, $message, $headers);
echo $success;
