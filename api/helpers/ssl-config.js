import fs from 'fs';

exports.privateKey = fs.readFileSync('./sslcertificate/privatekey.pem').toString(); // private key
exports.certificate = fs.readFileSync('./sslcertificate/certificate.pem').toString(); // certificate
exports.secretPharse = 'demo@123'; // secret phrase for encryption
