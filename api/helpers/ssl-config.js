const fs = require('fs');

const privateKey = fs.readFileSync('./sslcertificate/privatekey.pem').toString(); // private key
const certificate = fs.readFileSync('./sslcertificate/certificate.pem').toString(); // certificate
const secretPharse = 'demo@123'; // secret phrase for encryption

module.exports = {
  privateKey,
  certificate,
  secretPharse,
};
