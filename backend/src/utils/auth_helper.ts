/**
 * TODO: Potentially add new checks for if a student is able to retrieve particular submissions
 * Currently, this is just used to check that a valid token is sent with the request (user is logged in)
 */

import axios, {AxiosResponse} from 'axios';
import https from 'https';
import dbHelper from './db_helper';
import {Request} from 'express-serve-static-core';
import {HOST_NAME} from '../env';

export default class authHelper {
    /**
     * @namespace getEmailAndCheckExpired
     * @description Sends a request to the auth suite service to check if the token is expired
     * and fetch the user's email if it isn't.
     * @param token The token to be checked.
     * @returns An object containing the status of the request and the user's email if successful.
     */
    static async getEmailAndCheckExpired(token: string) {
        if (!token) {
            return {status: 'error', message: 'Token is null or undefined'};
        }
        try {
            const response: AxiosResponse = await axios.post(
                'https://app_auth-suite/auth_token',
                {token: token},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Referrer: `https://${HOST_NAME}/`,
                    },
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false,
                    }),
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            console.error(error.stack);
            return {
                status: 'error',
                message: 'Unknown server error occurred.',
            };
        }
    }

    /**
     * @namespace getUsernameAndCheckExpired
     * @description Sends a request to the auth suite service to check if the token is expired
     * and fetch the admin's username if it isn't.
     * @param token The token to be checked.
     * @returns An object containing the status of the request and the admin's username if successful.
     */
    static async getUsernameAndCheckExpired(token: string) {
        if (!token) {
            return {status: 'error', message: 'Token is null or undefined'};
        }
        try {
            const response: AxiosResponse = await axios.post(
                'https://app_auth-suite/admin/auth_token',
                {token: token},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Referrer: `https://${HOST_NAME}/`,
                    },
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false,
                    }),
                    validateStatus: function (status) {
                        return status >= 200 && status <= 500;
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            console.error(error.stack);
            return {
                status: 'error',
                message: 'Unknown server error occurred.',
            };
        }
    }

    /**
     * @namespace refreshToken
     * @description Sends a request to the auth suite service to refresh the user's token without the
     * frontend sending the refresh request itself. This is used to mitigate the issue of expired tokens
     * when attempting to view another user's avatar or downloading a submission.
     * @param refreshToken The refresh token to be used to generate a new token.
     * @returns An object containing the status of the request and the new token if successful.
     */
    static async refreshToken(refreshToken: string) {
        const response: AxiosResponse = await axios.post(
            'https://app_auth-suite/refresh_token/store',
            {refreshToken: refreshToken},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Referrer: `https://${HOST_NAME}/`,
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false,
                }),
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                },
            },
        );
        switch (response.status) {
            case 403:
                return {status: 303, newToken: null}; // log user out as refresh token is invalid or expired
            case 200:
                return {status: 303, newToken: response.data.token};
            default:
                return {
                    status: response.status,
                    errorMsg: 'Unknown server error occurred.',
                };
        }
    }

    /**
     * @namespace refreshAdminToken
     * @description Sends a request to the auth suite service to refresh the admin's token without the
     * frontend sending the refresh request itself. This is used to mitigate the issue of expired tokens
     * when attempting to view a user's avatar.
     * @param refreshToken The refresh token to be used to generate a new token.
     * @returns An object containing the status of the request and the new token if successful.
     */
    static async refreshAdminToken(refreshToken: string) {
        const response: AxiosResponse = await axios.post(
            'https://app_auth-suite/admin/refresh_token/store',
            {refreshToken: refreshToken},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Referrer: `https://${HOST_NAME}/`,
                },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false,
                }),
                validateStatus: function (status) {
                    return status >= 200 && status <= 500;
                },
            },
        );
        switch (response.status) {
            case 403:
                return {status: 303, newToken: null}; // log administrator out as refresh token is invalid or expired
            case 200:
                return {status: 303, newToken: response.data.token};
            default:
                return {
                    status: response.status,
                    errorMsg: 'Unknown server error occurred.',
                };
        }
    }

    /**
     * @namespace getTokensFromCookies
     * @description Helper function that retrieves the token and refresh token from the cookies in the request object.
     * @param req The request object containing the cookies.
     * @returns An array containing the token and refresh token if they exist, otherwise null.
     */
    static getTokensFromCookies(req: Request) {
        if (!req.cookies.token || !req.cookies.refreshToken) {
            return null;
        }
        return [req.cookies.token, req.cookies.refreshToken];
    }

    /**
     * @namespace getUserFromToken
     * @description Retrieves the user object from the token and refresh token provided. If the token is expired,
     * the refresh token is used to generate a new token.
     * @param token The token to be used to retrieve the user.
     * @param refreshToken The refresh token to be used to generate a new token if needed.
     * @returns An object containing the status of the request, an error message if applicable, and the user object if successful.
     */
    static async getUserFromToken(token: string, refreshToken?: string) {
        const response = await this.getEmailAndCheckExpired(token);
        if (response.status == 'expired') {
            if (refreshToken) {
                return this.refreshToken(refreshToken);
            } else {
                return {status: 401, errorMsg: null, user: null}; // Unauthorized so refresh token
            }
        } else if (response.status == 'error' || !response.email) {
            return {status: 403, errorMsg: response.message, user: null};
        } else if (response.status == 'locked') {
            return {status: 301, errorMsg: null, user: null};
        }

        const user = await dbHelper.findUserByEmail(response.email.user);

        if (!user) {
            return {status: 401, errorMsg: 'User Not Found.', user: null};
        }

        return {status: 200, errorMsg: null, user: user};
    }

    /**
     * @namespace getUserFromId
     * @description Retrieves the user information from the user ID provided.
     * @param userId The ID of the user to be retrieved.
     * @returns A status code, an error message if applicable, and the user object if successful.
     */
    static async getUserFromId(userId: number) {
        const user = await dbHelper.findUserById(userId);
        if (!user) {
            return {status: 404, errorMsg: 'User Not Found.', user: null};
        }
        return {status: 200, errorMsg: null, user: user};
    }

    /**
     * @namespace getAdminFromToken
     * @description Retrieves the admin object from the token and refresh token provided. If the token is expired,
     * the refresh token is used to generate a new token.
     * @param token The token to be used to retrieve the admin.
     * @param refreshToken The refresh token to be used to generate a new token if needed.
     * @returns An object containing the status of the request, an error message if applicable, and the admin object if successful.
     */
    static async getAdminFromToken(token: string, refreshToken?: string) {
        const response = await this.getUsernameAndCheckExpired(token);
        if (response.status == 'expired') {
            if (refreshToken) {
                return this.refreshAdminToken(refreshToken);
            } else {
                return {status: 401, errorMsg: null, user: null}; // Unauthorized so refresh token
            }
        } else if (response.status == 'error' || !response.userName) {
            return {status: 403, errorMsg: response.message, user: null};
        }

        const admin = await dbHelper.findAdminByUsername(
            response.userName.Administrator,
        );

        if (!admin) {
            return {status: 401, errorMsg: 'Admin Not Found.', user: null};
        }

        return {status: 200, errorMsg: null, admin: admin};
    }
}
