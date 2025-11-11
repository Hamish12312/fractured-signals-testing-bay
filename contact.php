<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize form inputs
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Basic validation
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill out the form completely and use a valid email address.";
        exit;
    }

    // Your email address
    $to = "info@fracturedsignals.uk";
    $subject = "New message from Fractured Signals website";

    // Build email content
    $email_content  = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Email headers
    $headers  = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "OK";
    } else {
        http_response_code(500);
        echo "Sorry, there was an error sending your message.";
    }
} else {
    http_response_code(403);
    echo "Forbidden request";
}
?>
