/*
Author: Robert Lie (mobilefish.com)
The retrieve.js file retrieves sensor data from The Things Network and displays it in the terminal.
See LoRa/LoRaWAN Tutorial 27
https://www.mobilefish.com/download/lora/lora_part27.pdf

Prerequisites:
Install the following applications:
- Node JS version: v10.6.0 (node -v)
- NPM version: 6.5.0 (npm -v)

Usage:
1) Update file config.js
2) Start the app: node retrieve.js

Additional information:
- TTN API, more information:
  https://github.com/TheThingsNetwork/node-app-sdk
- LoRa/LoRaWAN Tutorial 25
  https://youtu.be/lZXiaMFYwfw
  https://www.mobilefish.com/download/lora/lora_part25.pdf
- LoRa/LoRaWAN Tutorial 26
  https://youtu.be/EMoZ9taGZRs
  https://www.mobilefish.com/download/lora/lora_part26.pdf
*/

const ttn = require('ttn');
const moment = require('moment');
const config = require('./config.js');

const appID = config.TTNOptions.appID;
const accessKey = config.TTNOptions.accessKey;

function Decoder(bytes) {
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

ttn.data(appID, accessKey)
    .then(function (client) {
        client.on("uplink", async function (devID, payload) {
            console.log("Received uplink from ", devID);
            console.log(payload);

            const gateways = payload.metadata.gateways;
            for (i=0; i<gateways.length; i++){
                console.log(gateways[i]);
            }

            console.log("payload_raw decodded = ",Decoder(payload.payload_raw));

        })
    })
    .catch(function (error) {
        console.error("Error", error)
        process.exit(1);
    })
