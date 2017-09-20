
const https = require('https');
const http = require('http');

const sslConfig = require('./api/helpers/ssl-config');
const config = require('./config');
let mongoConn = require('./api/helpers/mongo-db-helpers');  // eslint-disable-line

const express = require('./api/express');

let server;

/**
 * This method starts api service
 */
const bootServer = () => {
  if (config.secureCommunication) {
    const ops = {
      key: sslConfig.privateKey,
      cert: sslConfig.certificate,
      passphrase: sslConfig.secretPharse,
    };
    server = https.createServer(ops, express.app).listen(config.port, () => {
      console.log(`server started on port ${config.port} (${config.env})`); // eslint-disable-line
    });
  } else {
    // listen on port config.port
    server = http.createServer(express.app).listen(config.port, () => {
      console.log(`server started on port ${config.port} (${config.env})`); // eslint-disable-line
    });
  }
};

/**
 * This method stops api server
 */
const shutdown = () => {
  server.close();
};

const port = config.port;

//  node js application main module
if (!module.parent) {
  bootServer();
}

module.exports = {
  bootServer,
  shutdown,
  port,
};
