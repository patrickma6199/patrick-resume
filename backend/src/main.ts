import {KEY_LOCATION, CRT_LOCATION, STORE_PORT} from './env';
import createApp from './app';
import https from 'https';
import fs from 'fs';
import authHelper from './utils/auth_helper';
import dbHelper from './utils/db_helper';

dbHelper.getDbConnection();

const app = createApp(authHelper, dbHelper);

const credentials = {
    key: fs.readFileSync(KEY_LOCATION as string, 'utf-8'),
    cert: fs.readFileSync(CRT_LOCATION as string, 'utf-8'),
};
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(STORE_PORT, () =>
    console.log(`Server is running on port ${STORE_PORT}`),
);
