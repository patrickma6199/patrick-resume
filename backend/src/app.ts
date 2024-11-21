import express from 'express';
import AvatarRouter from './routes/AvatarRouter';
import SubmissionRouter from './routes/SubmissionRouter';
import {HOST_NAME} from './env';

/**
 * @namespace createApp
 * @description Creates the express app and maps the required
 * routes of this service to the app.
 * @param authHelper The authentication helper object to be used by all routers.
 * @param dbHelper The database helper object to be used by all routers.
 * @returns The express object with all routes mapped.
 */
export default function createApp(authHelper: any, dbHelper: any) {
    const app = express();

    const avatar = AvatarRouter.getRouter(authHelper, dbHelper);
    const submission = SubmissionRouter.getRouter(authHelper, dbHelper);

    // Error handling and logging middleware
    app.use((req, res, next) => {
        console.log(`API Request: ${req.method} ${req.originalUrl} ${req.url}`);

        // for development purposes ONLY
        if (!process.env.IS_PRODUCTION) {
            res.set('Access-Control-Allow-Origin', 'localhost:8443');
        }

        // To prevent cross-site scripting attacks
        const referrer = req.get('Referrer') || req.get('Referer');
        if (!referrer || !referrer.includes(HOST_NAME!)) {
            if (referrer) {
                console.error(
                    'Attempted unauthorized access to API from Referrer: ',
                    referrer,
                );
            } else {
                console.error(
                    'Attempted unauthorized access to API without Referrer header set',
                );
            }

            return res.sendStatus(403);
        }

        try {
            next();
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    });

    // Mapping routes defined in ./routes directory
    app.use('/avatar', avatar);
    app.use('/submission', submission);

    return app;
}
