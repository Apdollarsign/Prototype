<!-- /**
* Author's Name: Aaditya Parajuli
* Student ID: 2357526
*/ -->

<?php
// Include the file that establishes the database connection
include("2357526_index.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Select all data from the table
$sqlSelect = "SELECT * FROM weatherData";
$result = $conn->query($sqlSelect);

// Check if there is any data
if ($result->num_rows > 0) {
    $data = array();

    // Fetch each row and add it to the data array
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    // Close the database connection
    $conn->close();

    // Convert data to JSON format
    $json_data = json_encode($data);

    // Set headers to indicate JSON content
    header('Content-Type: application/json');


    // Output the JSON data
    echo $json_data;
} else {
    // If no data is found, return an empty JSON array
    echo json_encode([]);
}

?>