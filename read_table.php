<!DOCTYPE html>
<!--
Author: Robert Lie (mobilefish.com)
The read_table.php file retrieves data from table sensor_data and displays it in the browser.
See LoRa/LoRaWAN Tutorial 27
https://www.mobilefish.com/download/lora/lora_part27.pdf

Prerequisites:
Install the following applications:
- MySQL version: 5.7.17 (mysql -V)
- PHP version: 5.6.30 (php -i)

Usage:
1) Change the MySQL username and password.
2) Open a browser and open file read_table.php

Additional information:
- LoRa/LoRaWAN Tutorial 25
  https://youtu.be/lZXiaMFYwfw
  https://www.mobilefish.com/download/lora/lora_part25.pdf
- LoRa/LoRaWAN Tutorial 26
  https://youtu.be/EMoZ9taGZRs
  https://www.mobilefish.com/download/lora/lora_part26.pdf
-->

<html>
<head>
<title>Mobilefish.com - Read table sensor_data</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<style type="text/css">
body {font-size: 1em; font-family: arial, helvetica; background-color: #fffada;}
table {border-width: 1px 1px 1px 1px; border-spacing: 1px; border-style: solid solid solid solid; border-color: #6E85BB; border-collapse: collapse; background-color: white;}
td {border-width: 1px 1px 1px 1px; padding: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: #6E85BB; background-color: #FFFFCC; -moz-border-radius:0 0 0 0; }
th {border-width: 1px 1px 1px 1px; padding: 1px 1px 1px 1px; border-style: solid solid solid solid; border-color: #6E85BB; background-color: #E6E6E6; -moz-border-radius: 0 0 0 0; text-align: left; }
</style>
</head>
<body>
<h2>Read table sensor_data</h2>

<table>
<tr>
	<th>Id</th>
	<th>hardware_serial</th>
	<th>port</th>
	<th>counter</th>
	<th>payload_raw</th>
	<th>time</th>
	<th>frequency</th>
	<th>modulation</th>
	<th>data_rate</th>
	<th>airtime</th>
	<th>coding_rate</th>
	<th>gateways</th>
</tr>

<?php

function decoder($bytes){
    if(strlen($bytes) == 1) {
        if(ord($bytes[0]) == 1) {
            return "{'button': 'activated'}";
        } else {
            return "{'error': 'button action unknown'}";
        }
    } else if(strlen($bytes) == 4) {
        $humidity = hexdec(bin2hex($bytes[0].$bytes[1])) / 100;
        $temperature = hexdec(bin2hex($bytes[2].$bytes[3])) / 100;
        return "{'humidity': $humidity, 'temperature': $temperature }";
    } else {
        return "{'error': 'payload unknown'}";
    }
}

$servername = "localhost";
$username = "ENTER_MYSQL_ACCOUNT_NAME_HERE";
$password = "ENTER_MYSQL_PASSWORD_HERE";
$database = "ttn_demo_db";
$table = "sensor_data";

// Connecting, selecting database
$link = mysql_connect($servername, $username, $password) or die('Could not connect: ' . mysql_error());
mysql_select_db($database) or die('Could not select database');

// Display table data
$query = "SELECT id, hardware_serial, port, counter, payload_raw, time, frequency, modulation, data_rate, airtime, coding_rate, gateways FROM $table";
$result = mysql_query($query) or die('Query failed: ' . mysql_error());

while ($row = mysql_fetch_assoc($result)) {
    echo "<tr>";
    echo "<td>".$row['id']."</td>";
    echo "<td>".$row['hardware_serial']."</td>";
    echo "<td>".$row['port']."</td>";
    echo "<td>".$row['counter']."</td>";
    echo "<td>".decoder($row['payload_raw'])."</td>";
    echo "<td>".$row['time']."</td>";
    echo "<td>".$row['frequency']."</td>";
    echo "<td>".$row['modulation']."</td>";
    echo "<td>".$row['data_rate']."</td>";
    echo "<td>".$row['airtime']."</td>";
    echo "<td>".$row['coding_rate']."</td>";
    echo "<td>".$row['gateways']."</td>";
    echo "</tr>";
}

// Free resultset
mysql_free_result($result);

// Closing connection
mysql_close($link);
?>

</table>
<br>
</body>
</html>
