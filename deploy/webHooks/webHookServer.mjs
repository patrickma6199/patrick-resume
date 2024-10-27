import express from 'express';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Webhooks } from '@octokit/webhooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { SSL_DIR, CERT, KEY, WEB_HOOK_SECRET } = process.env;

const webhooks = new Webhooks({
    secret: WEB_HOOK_SECRET,
});

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

app.post('/', async (req, res) => {
    console.log('Received a webhook event:', req.body);
    
    const signature = req.headers['X-Hub-Signature-256'];
    const body = await req.text();

    if (!(await webhooks.verify(body, signature))) {
        return res.status(401).send("Unauthorized");
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