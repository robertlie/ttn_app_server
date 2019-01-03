/*
Author: Robert Lie (mobilefish.com)
The drop_db.js file deletes the database ttn_demo_db.
BE CAREFUL ONCE DELETED ALL DATA IS LOST.
See LoRa/LoRaWAN Tutorial 27
https://www.mobilefish.com/download/lora/lora_part27.pdf

Prerequisites:
Install the following applications:
- MySQL version: 5.7.17 (mysql -V)
- Node JS version: v10.6.0 (node -v)
- NPM version: 6.5.0 (npm -v)

Usage:
1) Update file config.js
2) Execute the script: node drop_db.js
3) Check if the database ttn_demo_db is deleted using the webbased tool phpMyAdmin:
   http://localhost/~username/phpmyadmin/index.php
*/

const mysql = require('mysql');
const config = require('./config.js');

const con = mysql.createConnection(config.databaseOptions);

con.connect(function(err) {
    if (err) throw err;

    con.query("DROP DATABASE ttn_demo_db", function (err, result) {
        if (err) throw err;
        console.log("Database ttn_demo_db deleted.");
        process.exit(1);
    });
});
