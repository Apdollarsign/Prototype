<!-- /**
* Author's Name: Aaditya Parajuli
* Student ID: 2357526
*/ -->

<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pastWeatherData";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database
$sqlCreateDb = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sqlCreateDb) === TRUE) {
    echo "";
} else {
    echo "Error creating database: " . $conn->error;
}

// Select the database
$conn->select_db($dbname);

// Create table
$sqlCreateTable = "
    CREATE TABLE IF NOT EXISTS weatherData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    currentDay VARCHAR(20),
    currentDate DATE,
     weatherCondition VARCHAR(50),
    weatherIcon VARCHAR(50),
    temperature FLOAT,
    windSpeed FLOAT,
    humidity INT,
    pressure INT
    )
";

if ($conn->query($sqlCreateTable) === TRUE) {
    echo "";
} else {
    echo "Error creating table: " . $conn->error;
}

// Close the connection
$conn->close();
?>
