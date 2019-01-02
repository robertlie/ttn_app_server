/*
Author: Robert Lie (mobilefish.com)
The create_db.js file creates the database ttn_demo_db.
See LoRa/LoRaWAN Tutorial 27
https://www.mobilefish.com/download/lora/lora_part27.pdf

Prerequisites:
Install the following applications:
- MySQL version: 5.7.17 (mysql -V)
- Node JS version: v10.6.0 (node -v)
- NPM version: 6.5.0 (npm -v)

Usage:
1) Update file config.js
2) Execute the script: node create_db.js
3) Check if the database ttn_demo_db is created using the webbased tool phpMyAdmin:
   http://localhost/~username/phpmyadmin/index.php
*/

const mysql = require('mysql');
const config = require('./config.js');

const con = mysql.createConnection(config.databaseOptions);

con.connect(function(err) {
    if (err) throw err;

    con.query("CREATE DATABASE ttn_demo_db", function (err, result) {
        if (err) throw err;
        console.log("Database ttn_demo_db created");
        process.exit(1);
    });
});
