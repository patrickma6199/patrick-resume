import express, {Router} from 'express';
import {Request, Response} from 'express-serve-static-core';
import {HOST_NAME, STORE_DIR} from '../env';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';
import path from 'path';
import {fromBuffer} from 'file-type';
import validate from '../utils/data_validator';
import sharp from 'sharp';

export default class AvatarRouter {
    static router: Router | null = null;
    static authHelper: any | null = null;
    static dbHelper: any | null = null; //Not used right now but kept for future proofing

    /**
     * @namespace getRouter
     * @description Pseudo Router object constructor for '/auth_token'. Using
     * this function allows for setting the dbHelper object for the router.
     * @param authHelper The authentication helper object to be used by the router.
     * @param dbHelper The database helper object to be used by the router.
     * @returns Router object for '/auth_token'.
     */
    static getRouter(authHelper: any, dbHelper: any): Router {
        if (!this.router) {
            this.router = express.Router();
            this.router.use(express.urlencoded({extended: true}));
            this.router.use(express.json({limit: '100mb'}));
            this.router.use(cookieParser());
            this.router.get('/get/:hash', (req: Request, res: Response) =>
                this.getAvatar(req, res),
            );
            this.router.post('/upload', (req: Request, res: Response) =>
                this.uploadAvatar(req, res),
            );
            this.router.post('/remove', (req: Request, res: Response) =>
                this.removeAvatar(req, res),
            );
        }
        if (!this.authHelper) {
            this.authHelper = authHelper;
        }
        if (!this.dbHelper) {
            this.dbHelper = dbHelper;
        }
        return this.router;
    }

    /**
     * @namespace getAvatar
     * @description Handler function for '/avatar/get/:hash'. Retrieves the avatar image from the server using the provided hash
     * and sends it to the client upon authorization. This route should only be accessed from the frontend.
     * @param req The request object containing the hash of the avatar image.
     * @param res The response object to send the avatar image to.
     * @returns An http response with a status code and the avatar image on success or an error message upon failure.
     */
    static async getAvatar(req: Request, res: Response) {
        try {
            const tokens = this.authHelper.getTokensFromCookies(req);
            if (!tokens) {
                return res.status(403).send('Token is null or undefined');
            }

            const referrer = req.get('Referrer');

            if (!referrer) {
                return res.status(400).send('Missing referrer header.');
            }

            if (referrer.indexOf('admin') != -1) {
                const adminResult = await this.authHelper.getAdminFromToken(
                    ...tokens,
                );
                if (adminResult.status == 303) {
                    if (adminResult.newToken == null) {
                        return res.redirect(
                            303,
                            `https://${HOST_NAME}/auth/admin/logout`,
                        );
                    } else {
                        res.cookie('token', adminResult.newToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'strict',
                        });
                    }
                } else if (adminResult.status != 200) {
                    return adminResult.errorMsg != null
                        ? res
                              .status(adminResult.status)
                              .send(adminResult.errorMsg)
                        : res.sendStatus(adminResult.status);
                }
            } else {
                const userResult = await this.authHelper.getUserFromToken(
                    ...tokens,
                );
                if (userResult.status == 301) {
                    return res.redirect(
                        303,
                        `https://${HOST_NAME}/auth/logout`,
                    );
                } else if (userResult.status == 303) {
                    if (userResult.newToken == null) {
                        return res.redirect(
                            303,
                            `https://${HOST_NAME}/auth/logout`,
                        );
                    } else {
                        res.cookie('token', userResult.newToken, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'strict',
                        });
                    }
                } else if (userResult.status != 200) {
                    return userResult.errorMsg != null
                        ? res
                              .status(userResult.status)
                              .send(userResult.errorMsg)
                        : res.sendStatus(userResult.status);
                }
            }

            const {hash} = req.params;

            if (!validate.checkStringIsNotEmpty(hash)) {
                return res.status(400).send('Missing required parameters.');
            }

            const filePath = path.join(`${STORE_DIR}`, 'avatars', hash);

            const fileExists = await fs
                .access(filePath)
                .then(() => true)
                .catch(() => false);

            if (fileExists) {
                return res.status(200).sendFile(path.resolve(filePath));
            } else {
                return res.status(404).send('File not found');
            }
        } catch (error: any) {
            console.error(error.stack);
            return res
                .status(400)
                .send('Unknown server error while retrieving avatar.');
        }
    }

    /**
     * @namespace uploadAvatar
     * @description Handler function for '/avatar/upload'. This function is used to upload an avatar
     * image to be validated and stored. This route should only be accessed through the backend.
     * @param req The request object containing the avatar image, token and userId.
     * @param res The response object to send the get URI to the client.
     * @returns An http response with a status code and a json object containing a status and a message upon
     * failure or the get URI to retrieve the image in the future.
     */
    static async uploadAvatar(req: Request, res: Response) {
        try {
            const {avatar, token, userId, fileType, mime} = req.body;

            if (
                !avatar ||
                !validate.checkStringIsNotEmpty(token) ||
                !validate.checkStringIsNotEmpty(fileType) ||
                !validate.checkStringIsNotEmpty(mime)
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required parameters.',
                });
            }

            let userResult = undefined;

            if (
                userId == undefined ||
                !validate.checkStringIsNotEmpty(userId)
            ) {
                // If user is changing their own avatar
                // Check that user is logged in and retrieve their old avatarLocation (if exists)
                userResult = await this.authHelper.getUserFromToken(token);

                if (userResult.status == 301) {
                    return res.redirect(
                        303,
                        `https://${HOST_NAME}/auth/logout`,
                    );
                } else if (userResult.status != 200) {
                    return userResult.errorMsg
                        ? res.status(userResult.status).json({
                              status: 'error',
                              message: userResult.errorMsg,
                          })
                        : res.sendStatus(userResult.status);
                }
            } else {
                // If admin is changing a user's avatar
                // authenticate the admin
                const adminResult =
                    await this.authHelper.getAdminFromToken(token);
                if (adminResult.status != 200) {
                    return adminResult.errorMsg
                        ? res.status(adminResult.status).json({
                              status: 'error',
                              message: adminResult.errorMsg,
                          })
                        : res.sendStatus(adminResult.status);
                }
                userResult = await this.authHelper.getUserFromId(userId);
                if (userResult.status != 200) {
                    return res
                        .status(userResult.status)
                        .json({status: 'error', message: userResult.errorMsg});
                }
            }

            const buffer = Buffer.from(avatar, 'base64');

            const type = await fromBuffer(buffer);

            let fileExtension;
            let fileMime;

            if (!type) {
                fileExtension = fileType;
                fileMime = mime;
            } else {
                fileExtension = `.${type.ext}`;
                fileMime = type.mime;
            }

            // Checks
            if (
                !fileMime.startsWith('image/') ||
                !validate.isValidImageMIME(fileMime)
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'File is not a supported image type.',
                });
            }

            // Create subdirectories if not existent
            try {
                await fs.mkdir(path.join(`${STORE_DIR}`, 'avatars'), {
                    recursive: true,
                });
            } catch (error: any) {
                console.error(error.stack);
                return res.status(500).json({
                    status: 'error',
                    message:
                        'Unknown server error occurred while creating directory.',
                });
            }

            if (userResult.user.avatarLocation) {
                try {
                    const oldFileName = userResult.user.avatarLocation
                        .split('/')
                        .pop();
                    const oldFilePath = path.join(
                        `${STORE_DIR}`,
                        'avatars',
                        oldFileName,
                    );
                    await fs.unlink(oldFilePath);
                } catch (error: any) {
                    console.error(error.stack);
                    return res.status(500).json({
                        status: 'error',
                        message:
                            'Unknown server error occurred while deleting old avatar.',
                    });
                }
            }

            // Convert and resize image to 256x256 webp image
            const filename = `${Date.now()}.webp`;
            const filePath = path.join(`${STORE_DIR}`, 'avatars', filename);
            try {
                await sharp(buffer).resize(256).webp().toFile(filePath);
                return res.status(200).json({
                    status: 'success',
                    dest: `/store/avatar/get/${filename}`,
                });
            } catch (error: any) {
                console.error(error.stack);
                return res.status(500).json({
                    status: 'error',
                    message: `Error writing file: ${error}`,
                });
            }
        } catch (error: any) {
            console.error(error.stack);
            return res.status(400).json({
                status: 'error',
                message: 'Unknown server error occurred while uploading',
            });
        }
    }

    /**
     * @namespace removeAvatar
     * @description Handler function for '/avatar/remove'. This function is used to remove an avatar from
     * the data store. This route should only be accessed through the backend.
     * @param req The request object containing the token.
     * @param res The response object to send the status json object to.
     * @returns An http response with a status code and a json object with a status and message.
     */
    static async removeAvatar(req: Request, res: Response) {
        try {
            const {token} = req.body;

            if (!validate.checkStringIsNotEmpty(token)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required parameters.',
                });
            }

            // Check that user is logged in and retrieve their old avatarLocation (if exists)
            const userResult = await this.authHelper.getUserFromToken(token);
            if (userResult.status == 301) {
                return res.redirect(303, `https://${HOST_NAME}/auth/logout`);
            } else if (userResult.status != 200) {
                return userResult.errorMsg
                    ? res
                          .status(userResult.status)
                          .json({status: 'error', message: userResult.errorMsg})
                    : res.sendStatus(userResult.status);
            }

            if (userResult.user.avatarLocation) {
                try {
                    const oldFileName = userResult.user.avatarLocation
                        .split('/')
                        .pop();
                    const oldFilePath = path.join(
                        `${STORE_DIR}`,
                        'avatars',
                        oldFileName,
                    );
                    await fs.unlink(oldFilePath);
                } catch (error: any) {
                    console.error(error.stack);
                    return res.status(500).json({
                        status: 'error',
                        message:
                            'Unknown server error occurred while deleting old avatar.',
                    });
                }
            }

            return res.status(200).json({
                status: 'success',
                message: 'Avatar removed successfully.',
            });
        } catch (error: any) {
            console.error(error.stack);
            return res.status(400).json({
                status: 'error',
                message: 'Unknown server error occurred while removing avatar.',
            });
        }
    }
}
