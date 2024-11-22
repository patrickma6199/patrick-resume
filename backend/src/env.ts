import dotenv from 'dotenv';
import path from 'path';

/**
 * This will check if the IS_TESTING environment variable is set. If it is,
 * then this is running from within Drone CI and the environment variables
 * should be read from the Drone secrets. If it is not, then there are checks
 * to see if the environment is production (deployed on docker) or development.
 */
if (!process.env.IS_TESTING) {
    dotenv.config();
    const environment = process.env.IS_PRODUCTION
        ? 'production'
        : 'development';
    if (environment !== 'production') {
        const result = dotenv.config({
            path: path.resolve(__dirname, '../../.env'),
        });
        if (result.error) {
            throw result.error;
        }
    }
}

/**
 * @summary An exported set of this service's necessary environment variables.
 */
const requiredEnvVariables = [
    'HOST_NAME',
    'CRT_LOCATION',
    'KEY_LOCATION',
    'TIMEZONE',
    'OPEN_API',
    'OPEN_ASSIST_ID',
];

for (const variable of requiredEnvVariables) {
    if (!process.env[variable]) {
        console.error(`Environment variable ${variable} is undefined.`);
    }
}

export const {
    HOST_NAME,
    CRT_LOCATION,
    KEY_LOCATION,
    TIMEZONE,
    OPEN_API,
    OPEN_ASSIST_ID,
} = process.env;
