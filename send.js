/*
Author: Robert Lie (mobilefish.com)
The send.js file creates a downlink and sends binary data from your computer to your LoRa end node.
If the binary value is 0x00 Yellow Led=Off, Green Led=Off
If the binary value is 0x01 Yellow Led=On,  Green Led=Off
If the binary value is 0x02 Yellow Led=Off, Green Led=On
If the binary value is 0x03 Yellow Led=On,  Green Led=On

See LoRa/LoRaWAN Tutorial 27
https://www.mobilefish.com/download/lora/lora_part27.pdf

Prerequisites:
Install the following applications:
- Node JS version: v10.6.0 (node -v)
- NPM version: 6.5.0 (npm -v)

Usage:
1) Update file config.js
2) Change the hex value 0x00
3) Start the app: node send.js

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
const config = require('./config.js');

const appID = config.TTNOptions.appID;
const accessKey = config.TTNOptions.accessKey;

ttn.data(appID, accessKey)
    .then(function (client) {
        client.send("youtube_demo_device", Buffer.alloc(1, 0x00, 'binary'));
    })
    .catch(function (error) {
        console.error("Error", error);
        process.exit(1);
    })
