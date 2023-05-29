
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
header("Content-Security-Policy: font-src 'self' data:; img-src 'self' data:;");

function connection()
{
    $conn = mysqli_connect("localhost", "root", "");
    if ($conn) {
        mysqli_select_db($conn, "e-commerce");
        return $conn;
    } else {
        die("<h1>Connection to the database failed. Refresh the page.</h1>");
    }
}

if (isset($_POST["submit"])) {
    $conn = connection();
    $lastname = mysqli_real_escape_string($conn, $_POST['last_name']);
    $firstname = mysqli_real_escape_string($conn, $_POST['first_name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $username = $firstname . $lastname[0];

    $select_query = "SELECT email FROM customers WHERE email='$email'";
    $response = mysqli_query($conn, $select_query);
    if ($response) {
        $rowcount = mysqli_num_rows($response);
        if ($rowcount == 0) { // Email not found, insert user data
            $hashed_password = password_hash($password, PASSWORD_DEFAULT); // Hash the password
            $insert_query = "INSERT INTO customers (firstName, lastName, username, password, email) VALUES ('$firstname', '$lastname', '$username', '$hashed_password', '$email')";
            $insert_respond = mysqli_query($conn, $insert_query);
            if ($insert_respond) {
                echo json_encode(array("success" => true, "message" => "Go to home.html"));
            } else {
                die("Insert query error: " . mysqli_error($conn));
            }
        } else { // Email found, login
            echo json_encode(array("success" => false, "message" => "Email found. Please login instead."));
        }
    } else {
        die("<h1>Query error. Refresh the page.</h1>");
    }
}
?>
