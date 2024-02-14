<?php
// connects file
include("2357526_index.php");

$city = 'Zhezkazgan';
$apikey = 'd68840f8f3425a2e27ee32abffd88623';
$apiUrl = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apikey}";

// gets the data from API
$api_data = file_get_contents($apiUrl); 
// decodes the JSON data into an associative array (key:value pairs)
$weather_data = json_decode($api_data, true);

$currentDay = date('D');
$currentDate = date('Y-m-d'); 

$weatherCondition = $weather_data['weather'][0]['description'];
$weatherIcon = $weather_data['weather'][0]['icon'];
$temperature = $weather_data['main']['temp'] - 273.15;
$windSpeed = $weather_data['wind']['speed'];
$humidity = $weather_data['main']['humidity'];
$pressure = $weather_data['main']['pressure'];

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Insert the data into the table
$sqlInsert = "
    INSERT INTO weatherData (currentDay, currentDate, weatherCondition, weatherIcon, temperature, windSpeed, humidity, pressure)
    VALUES ('$currentDay', '$currentDate', '$weatherCondition', '$weatherIcon', $temperature, $windSpeed, $humidity, $pressure)
";

if ($conn->query($sqlInsert) === TRUE) {
    echo "";
} else {
    echo "Error inserting data: " . $conn->error;
}

// Close the database connection
$conn->close();
?>
