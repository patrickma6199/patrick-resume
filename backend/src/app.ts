import express from 'express';
import AssistantRouter from './routes/AtlasAssistantRouter';
import {HOST_NAME} from './env';
import cors from 'cors';

export default function createApp() {
  const app = express();

  const assistant = AssistantRouter.getRouter();

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

  app.use(cors());

  // Mapping routes defined in ./routes directory
  app.use('/atlas_assistant', assistant);

  return app;
}
