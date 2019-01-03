/*
Author: Robert Lie (mobilefish.com)
The config.js file contains the MySQL user credentials and The Things Network (TTN) appID and accessKey.
See LoRa/LoRaWAN Tutorial 27
https://www.mobilefish.com/download/lora/lora_part27.pdf

The config.js file is used by:
- drop_db.js
- create_db.js
- create_table.js
- insert_db.js
- read_table.js
- retrieve.js
- send.js
*/
const databaseOptions = {
    host: 'localhost',
    user: 'ENTER_MYSQL_ACCOUNT_NAME_HERE',
    password: 'ENTER_MYSQL_PASSWORD_HERE'
};

const TTNOptions = {
    appID: 'ENTER_TTN_APP_ID_HERE',
    accessKey: 'ENTER_TTN_ACCESSKEY_HERE'
};

module.exports = {databaseOptions: databaseOptions, TTNOptions: TTNOptions};
