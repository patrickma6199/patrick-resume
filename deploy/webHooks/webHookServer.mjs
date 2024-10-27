import express from 'express';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { SSL_DIR, CERT, KEY, WEB_HOOK_SECRET } = process.env;

const app = express();

const locations = {
    key: path.join(`${SSL_DIR}`, `${KEY}`),
    cert: path.join(`${SSL_DIR}`, `${CERT}`)
}

const options = {
    key: fs.readFileSync(locations.key),
    cert: fs.readFileSync(locations.cert)
};

app.use(express.json());

app.post('/git-webhook', (req, res) => {
    console.log('Received a webhook event:', req.body);
    
    const clientSecret = req.headers['x-secret'];

    if (clientSecret !== WEB_HOOK_SECRET) {
        console.error('Invalid secret');
        return res.status(401).send('Invalid secret');
    }

    exec('./git-pull.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error.message}`);
            return res.status(500).send(`Error executing script: ${error.message}`);
        }

        if (stderr) {
            console.warn(`Script stderr: ${stderr}`);
        }

        console.log(`Script output: ${stdout}`);
        res.status(200).send('Script executed successfully');
    });

    res.status(200).send('Webhook received');
});

const PORT = 3000;

https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Webhook listener running on port ${PORT} with\n
        SSL Certificate: ${locations.cert}\n
        SSL Key: ${locations.key}`);
});