import {KEY_LOCATION, CRT_LOCATION} from './env';
import createApp from './app';
import https from 'https';
import fs from 'fs';

const app = createApp();

const credentials = {
  key: fs.readFileSync(KEY_LOCATION as string, 'utf-8'),
  cert: fs.readFileSync(CRT_LOCATION as string, 'utf-8'),
};
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443, () => console.log(`Server is running on port ${443}`));
