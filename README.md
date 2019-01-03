# Retrieve sensor data from The Things Network and store it in a database

This repository contains examples how to retrieve sensor data from The Things Network and how to store the sensor data in a database. 
A PHP script is included to retrieve sensor data from the database and display the data in a browser.

## Requirements

The scripts in this repository uses the sensor data from LoRa/LoRaWAN tutorial 26: 
[https://www.mobilefish.com/developer/lorawan/lorawan\_quickguide\_tutorial.html][1]
or watch this YouTube video:<br>
[https://youtu.be/EMoZ9taGZRs][2]

[1]: https://www.mobilefish.com/developer/lorawan/lorawan_quickguide_tutorial.html "Mobilefish.com"
[2]: https://youtu.be/EMoZ9taGZRs "YouTube video"

![alt text](https://www.mobilefish.com/images/developer/lorawan_rfm95_arduino_leds_sensors_overview.png "Sending sensor data to The Things Network")

To make all the scripts work in this repository the following applications need to be installed:<br>
- MySQL   
- NodeJS   
- NPM  
- PHP  
 
## Features

The project consists of the following files:<br>
- **config.js**:  Contains the MySQL user credentials and The Things Network (TTN) appID and accessKey.  
- **retrieve.js**: Retrieves sensor data from The Things Network and displays it in the terminal.  
- **send.js**: Creates a downlink and sends binary data from your computer to your LoRa end node.  
If the binary value is 0x00 Yellow Led=Off, Green Led=Off<br>
If the binary value is 0x01 Yellow Led=On,  Green Led=Off<br>
If the binary value is 0x02 Yellow Led=Off, Green Led=On<br>
If the binary value is 0x03 Yellow Led=On,  Green Led=On<br>
- **create\_db.js**: Creates the database ttn\_demo\_db.  
- **create\_table.js**: Creates the table sensor\_data.  
- **drop\_db.js**: Deletes the database ttn\_demo\_db. <br>
BE CAREFUL WITH THIS SCRIPT ONCE DELETED ALL DATA IS LOST.  
- **read\_table.js**: Retrieves data from table sensor\_data and displays it in the terminal.  
- **read\_table.php**: Retrieves data from table sensor\_data and displays it in the browser. 


## Installation

```
npm install
```

## Usage

Watch this YouTube video:
TBD


