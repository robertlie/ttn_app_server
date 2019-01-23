/*
Author: Robert Lie (mobilefish.com)
The read_table.js file retrieves data from table sensor_data and displays it in the terminal.
See LoRa/LoRaWAN Tutorial 27
https://www.mobilefish.com/download/lora/lora_part27.pdf

Prerequisites:
Install the following applications:
- MySQL version: 5.7.17 (mysql -V)
- Node JS version: v10.6.0 (node -v)
- NPM version: 6.5.0 (npm -v)

Usage:
1) Update file config.js
2) Start the app: node read_table.js

Additional information:
- LoRa/LoRaWAN Tutorial 25
  https://youtu.be/lZXiaMFYwfw
  https://www.mobilefish.com/download/lora/lora_part25.pdf
- LoRa/LoRaWAN Tutorial 26
  https://youtu.be/EMoZ9taGZRs
  https://www.mobilefish.com/download/lora/lora_part26.pdf
*/

const mysql = require('mysql');
const moment = require('moment');
const config = require('./config.js');

config.databaseOptions.database = "ttn_demo_db";
const con = mysql.createConnection(config.databaseOptions);

function decoder(bytes, port) {
    if(bytes.length == 1) {
        if(bytes[0] == 1) {
            return {
                'button': 'activated'
            }
        } else {
            return {
                'error': 'button action unknown'
            }
        }
    } else if(bytes.length == 4) {
        var humidity = (bytes[0]<<8) | bytes[1];
        var temperature = (bytes[2]<<8) | bytes[3];
        return {
            'humidity': humidity/ 100,
            'temperature': temperature/100
        }
    } else {
        return {
            'error': 'payload unknown'
        }
    }
}

/*
// Decoder function for The Things Node:
// https://www.thethingsnetwork.org/docs/devices/node/
// This function was used in Tutorial 28 for the range tests.

function decoder(bytes, port) {
	var decoded = {};
	var events = {
	  1: 'setup',
	  2: 'interval',
	  3: 'motion',
	  4: 'button'
	};
	decoded.event = events[port];
	decoded.battery = (bytes[0] << 8) + bytes[1];
	decoded.light = (bytes[2] << 8) + bytes[3];
	if (bytes[4] & 0x80)
	  decoded.temperature = ((0xffff << 16) + (bytes[4] << 8) + bytes[5]) / 100;
	else
	  decoded.temperature = ((bytes[4] << 8) + bytes[5]) / 100;
	return decoded;
}
*/

con.connect(function(err) {
    if (err) throw err;
    const sql = "SELECT * FROM sensor_data";

    con.query(sql, function (err, rows) {
        if (err) throw err;

        console.log("Data retrieved from table sensor_data");

        rows.forEach( (row) => {
            console.log("counter=",row.counter);
            console.log("hardware_serial=",row.hardware_serial);
            console.log("port=",row.port);
            console.log("payload_raw=",row.payload_raw);

            // Convert the payload_raw value using the decoder function
			const payload_fields = decoder(row.payload_raw, row.port);
            console.log("payload_fields=",payload_fields);

            console.log("time (UTC)=",row.time);
            console.log("frequency=",row.frequency);
            console.log("modulation=",row.modulation);
            console.log("data_rate=",row.data_rate);
            console.log("airtime=",row.airtime);
            console.log("coding_rate=",row.coding_rate);

            // Convert to JavaScript object
            const gateways = JSON.parse(row.gateways);
            for (let i=0; i<gateways.length; i++){
                // Enumerate thru JavaScript Object
                const gateway = gateways[i];
                console.log("******* Gateway ******* ");
                for (let key in gateway) {
                    if (gateway.hasOwnProperty(key)) {
                        console.log(key+"=",gateway[key]);
                    }
                }
            }
            console.log("------------------------------------------");
        });

        process.exit(1);
    });
});
