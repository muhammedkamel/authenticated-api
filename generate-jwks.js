const crypto = require('crypto');
const fs = require('fs');
const utils = require('util')

const { privateKey, publicKey } = crypto.generateKeyPairSync(
    'rsa',
    {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
    }
);

const writeFile = utils.promisify(fs.writeFile);

Promise.all([
    writeFile('./certs/private.pem', privateKey),
    writeFile('./certs/public.pem', publicKey),
]);

const jwk = crypto.createPublicKey(publicKey).export({ format: 'jwk'});

console.log(JSON.stringify(jwk));
