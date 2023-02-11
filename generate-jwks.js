const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const utils = require('util')

const preparePath = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

const generateCerts = async () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync(
        'rsa',
        {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
        }
    );

    const dir = path.join('certs');

    preparePath(dir);

    const writeFile = utils.promisify(fs.writeFile);

    await Promise.all([
        writeFile(path.join(dir, 'private.pem'), privateKey),
        writeFile(path.join(dir, 'public.pem'), publicKey),
    ]);

    return { privateKey, publicKey };
}

const createJWKs = async () => {
    const { publicKey } = await generateCerts();

    const jwk = crypto.createPublicKey(publicKey).export({ format: 'jwk' });

    const jwks = {
        keys: [
            jwk
        ]
    };

    const dir = path.join('public', '.well-known');

    preparePath(dir);

    fs.writeFileSync(path.join(dir, 'jwks.json'), JSON.stringify(jwks));
}

(createJWKs)().then(() => console.log('\nJWKs generated successfully ^_^\n'));