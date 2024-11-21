import express, {Router} from 'express';
import {Request, Response} from 'express-serve-static-core';
import {HOST_NAME, STORE_DIR, STORE_KEY} from '../env';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import {fromBuffer} from 'file-type';
import validate from '../utils/data_validator';

export default class SubmissionRouter {
    static router: Router | null = null;
    static authHelper: any | null = null;
    static dbHelper: any | null = null;

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
            this.router.get(
                '/get/:courseHash/:assignmentHash/:hash',
                (req: Request, res: Response) => this.getSubmission(req, res),
            );
            this.router.post('/upload', (req: Request, res: Response) =>
                this.uploadSubmission(req, res),
            );
            this.router.post('/remove', (req: Request, res: Response) =>
                this.removeSubmission(req, res),
            );
            this.router.post('/remove_course', (req: Request, res: Response) =>
                this.removeCourseSubmissions(req, res),
            );
            this.router.post(
                '/remove_assignment',
                (req: Request, res: Response) =>
                    this.removeAssignmentSubmissions(req, res),
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
     * @namespace getSubmission
     * @description Handler function for '/submission/get/:courseHash/:assignmentHash/:hash'. Retrieves the submission file from the server using
     * the provided hashes and sends it to the client upon authorization. This route should only be accessed from the frontend.
     * @param req The request object containing the course, assignment, and submission hashes.
     * @param res The response object to send the submission file to.
     * @returns An http response with a status code and the submission file on success or an error message upon failure.
     */
    static async getSubmission(req: Request, res: Response) {
        try {
            const tokens = this.authHelper.getTokensFromCookies(req);
            if (!tokens) {
                return res.status(403).send('Token is null or undefined');
            }

            const userResult = await this.authHelper.getUserFromToken(
                ...tokens,
            );
            if (userResult.status == 301) {
                return res.redirect(303, `https://${HOST_NAME}/auth/logout`);
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
                    ? res.status(userResult.status).send(userResult.errorMsg)
                    : res.sendStatus(userResult.status);
            }

            const {courseHash, assignmentHash, hash} = req.params;

            if (
                !validate.checkStringIsNotEmpty(courseHash) ||
                !validate.checkStringIsNotEmpty(assignmentHash) ||
                !validate.checkStringIsNotEmpty(hash)
            ) {
                return res.status(400).send('Missing required parameters.');
            }

            const courseId = this.decryptId(courseHash, `${STORE_KEY}`);
            const assignmentId = this.decryptId(assignmentHash, `${STORE_KEY}`);

            if (
                !(await this.dbHelper.isInCourse(
                    userResult.user.userId,
                    courseId,
                ))
            ) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Insufficient Permissions',
                });
            }

            const filePath = path.join(
                `${STORE_DIR}`,
                'courses',
                courseId,
                'assignments',
                assignmentId,
                hash,
            );

            const fileExists = await fs
                .access(filePath)
                .then(() => true)
                .catch(() => false);

            if (fileExists) {
                try {
                    res.status(200).sendFile(path.resolve(filePath));
                } catch (error: any) {
                    console.error(error.stack);
                    return res.status(404).send('File Not Found');
                }
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
     * @namespace uploadSubmission
     * @description Handler function for '/submission/upload'. Receives a submission file from the client and stores it on the server.
     * The file is then associated with the user and the assignment. This route should only be accessed from the backend.
     * @param req The request object containing the submission file, token, course id, assignment id, submission id, file type, and mime type.
     * @param res The response object to send the submission file path to.
     * @returns An http response with a status code and a json object with a status and the submission file path on success or an error message upon failure.
     */
    static async uploadSubmission(req: Request, res: Response) {
        try {
            const {
                submission,
                token,
                courseId,
                assignmentId,
                submissionId,
                fileType,
                mime,
            } = req.body;

            if (
                !submission ||
                !validate.checkStringIsNotEmpty(token) ||
                !validate.checkNumber(courseId) ||
                !validate.checkNumber(assignmentId) ||
                !validate.checkNumber(submissionId) ||
                !validate.checkStringIsNotEmpty(fileType) ||
                !validate.checkStringIsNotEmpty(mime)
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required parameters.',
                });
            }

            // Check that user is logged in and in the course
            const userResult = await this.authHelper.getUserFromToken(token);
            if (userResult.status == 301) {
                return res.redirect(303, `https://${HOST_NAME}/auth/logout`);
            } else if (userResult.status !== 200) {
                return userResult.errorMsg
                    ? res
                          .status(userResult.status)
                          .json({status: 'error', message: userResult.errorMsg})
                    : res.sendStatus(userResult.status);
            }

            if (
                !(await this.dbHelper.isInCourse(
                    userResult.user.userId,
                    courseId,
                ))
            ) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Insufficient Permissions',
                });
            }

            if (
                !(await this.dbHelper.canSubmit(
                    userResult.user.userId,
                    assignmentId,
                    submissionId,
                ))
            ) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Insufficient Permissions',
                });
            }

            // Check if there is a previous submission and delete if there is one
            const previousSubmission =
                await this.dbHelper.getPreviousSubmission(submissionId);

            if (previousSubmission) {
                const parts = previousSubmission.split('/');
                const hash = parts.pop();
                const filePath = path.join(
                    `${STORE_DIR}`,
                    'courses',
                    `${courseId}`,
                    'assignments',
                    `${assignmentId}`,
                    hash,
                );

                const fileExists = await fs
                    .access(filePath)
                    .then(() => true)
                    .catch(() => false);

                if (fileExists) {
                    try {
                        await fs.unlink(filePath);
                    } catch (error: any) {
                        console.error(error.stack);
                        return res.status(500).json({
                            status: 'error',
                            message:
                                'Unknown server error occurred while deleting previous submission.',
                        });
                    }
                }
            }

            const buffer = Buffer.from(submission, 'base64');
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

            // Check if the file type is allowed for the assignment
            const validSubmission = await validate.checkSubmissionValid(
                fileExtension,
                fileMime,
                assignmentId,
            );

            if (!validSubmission) {
                return res.status(400).json({
                    status: 'error',
                    message:
                        'Could not submit assignment. File was of the incorrect type.',
                });
            }

            // Create subdirectories if not existent
            try {
                await fs.mkdir(
                    path.join(
                        `${STORE_DIR}`,
                        'courses',
                        `${courseId}`,
                        'assignments',
                        `${assignmentId}`,
                    ),
                    {recursive: true},
                );
            } catch (error: any) {
                console.error(error.stack);
                return res.status(500).json({
                    status: 'error',
                    message:
                        'Unknown server error occurred while creating directory.',
                });
            }

            const filename = `${Date.now()}` + fileExtension;
            const filePath = path.join(
                `${STORE_DIR}`,
                'courses',
                `${courseId}`,
                'assignments',
                `${assignmentId}`,
                filename,
            );

            try {
                await fs.writeFile(filePath, buffer);
            } catch (error: any) {
                console.error(error.stack);
                return res.status(500).json({
                    status: 'error',
                    message:
                        'Unknown server error occurred while writing file.',
                });
            }

            const hashedPath = `/store/submission/get/${this.encryptId(courseId, `${STORE_KEY}`)}/${this.encryptId(assignmentId, `${STORE_KEY}`)}/${filename}`;

            return res.status(200).json({status: 'success', dest: hashedPath});
        } catch (error: any) {
            console.error(error.stack);
            return res.status(400).json({
                status: 'error',
                message: 'Unknown server error occurred while uploading',
            });
        }
    }

    /**
     * @namespace removeCourseSubmissions
     * @description Handler function for '/submission/remove_course'. Removes all submissions for a course from the server.
     * This route should only be accessed from the backend.
     * @param req The request object containing the token and course id.
     * @param res The response object to send the status json object to.
     * @returns An http response with a status code and a json object with a status and a message on success and failure.
     */
    static async removeCourseSubmissions(req: Request, res: Response) {
        try {
            const {token, courseId} = req.body;

            if (
                !validate.checkStringIsNotEmpty(token) ||
                !validate.checkNumber(courseId)
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required parameters.',
                });
            }

            // Check that user is logged in
            const userResult = await this.authHelper.getUserFromToken(token);
            if (userResult.status == 301) {
                return res.redirect(303, `https://${HOST_NAME}/auth/logout`);
            } else if (userResult.status !== 200) {
                return userResult.errorMsg
                    ? res
                          .status(userResult.status)
                          .json({status: 'error', message: userResult.errorMsg})
                    : res.sendStatus(userResult.status);
            }

            if (
                !(await this.dbHelper.isCourseInstructor(
                    userResult.user.userId,
                    courseId,
                )) /* or is an admin*/
            ) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Insufficient Permissions',
                });
            }

            const coursePath = path.join(
                `${STORE_DIR}`,
                'courses',
                `${courseId}`,
            );

            const coursePathExists = await fs
                .access(coursePath)
                .then(() => true)
                .catch(() => false);

            if (coursePathExists) {
                try {
                    await fs.rm(coursePath, {recursive: true});
                    return res.status(200).json({
                        status: 'success',
                        message: 'Files deleted successfully.',
                    });
                } catch (error: any) {
                    console.error(error.stack);
                    return res.status(500).json({
                        status: 'error',
                        message:
                            'Unknown server error occurred while deleting files.',
                    });
                }
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'No submissions found.',
                });
            }
        } catch (error: any) {
            console.error(error.stack);
            return res.status(400).json({
                status: 'error',
                message: 'Unknown server error occurred while deleting files.',
            });
        }
    }

    /**
     * @namespace removeSubmission
     * @description Handler function for '/submission/remove'. Removes a submission from the server using the provided hashes.
     * This route should only be accessed from the backend.
     * @param req The request object containing the token and submission location.
     * @param res The response object to send the status json object to.
     * @returns An http response with a status code and a json object with a status and a message on success and failure.
     */
    static async removeSubmission(req: Request, res: Response) {
        try {
            const {token, submissionLocation} = req.body;

            if (
                !validate.checkStringIsNotEmpty(token) ||
                !validate.checkStringIsNotEmpty(submissionLocation)
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required parameters.',
                });
            }

            // Check that user is logged in
            const userResult = await this.authHelper.getUserFromToken(token);
            if (userResult.status == 301) {
                return res.redirect(303, `https://${HOST_NAME}/auth/logout`);
            } else if (userResult.status !== 200) {
                return userResult.errorMsg
                    ? res
                          .status(userResult.status)
                          .json({status: 'error', message: userResult.errorMsg})
                    : res.sendStatus(userResult.status);
            }

            const parts = submissionLocation.split('/');
            const hash = parts.pop();
            const assignmentId = this.decryptId(parts.pop(), `${STORE_KEY}`);
            const courseId = this.decryptId(parts.pop(), `${STORE_KEY}`);

            if (
                !(await this.dbHelper.isInCourse(
                    userResult.user.userId,
                    courseId,
                ))
            ) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Insufficient Permissions',
                });
            }

            const filePath = path.join(
                `${STORE_DIR}`,
                'courses',
                `${courseId}`,
                'assignments',
                `${assignmentId}`,
                hash,
            );

            const fileExists = await fs
                .access(filePath)
                .then(() => true)
                .catch(() => false);

            if (fileExists) {
                try {
                    await fs.unlink(filePath);
                    return res.status(200).json({status: 'success'});
                } catch (error: any) {
                    console.error(error.stack);
                    return res.status(500).json({
                        status: 'error',
                        message:
                            'Unknown server error occurred while deleting file.',
                    });
                }
            } else {
                return res
                    .status(404)
                    .json({status: 'error', message: 'File not found.'});
            }
        } catch (error: any) {
            console.error(error.stack);
            return res.status(400).json({
                status: 'error',
                message: 'Unknown server error occurred while deleting file.',
            });
        }
    }

    /**
     * @namespace removeAssignmentSubmissions
     * @description Handler function for '/submission/remove_assignment'. Removes all submissions for an assignment from the server.
     * This route should only be accessed from the backend.
     * @param req The request object containing the token, course id, and assignment id.
     * @param res The response object to send the status json object to.
     * @returns An http response with a status code and a json object with a status and a message on success and failure.
     */
    static async removeAssignmentSubmissions(req: Request, res: Response) {
        try {
            const {token, courseId, assignmentId} = req.body;

            if (
                !validate.checkStringIsNotEmpty(token) ||
                !validate.checkNumber(courseId) ||
                !validate.checkNumber(assignmentId)
            ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required parameters.',
                });
            }

            // Check that user is logged in
            const userResult = await this.authHelper.getUserFromToken(token);
            if (userResult.status == 301) {
                return res.redirect(303, `https://${HOST_NAME}/auth/logout`);
            } else if (userResult.status !== 200) {
                return userResult.errorMsg
                    ? res
                          .status(userResult.status)
                          .json({status: 'error', message: userResult.errorMsg})
                    : res.sendStatus(userResult.status);
            }

            if (
                !(await this.dbHelper.isCourseInstructor(
                    userResult.user.userId,
                    courseId,
                )) /* or is an admin*/
            ) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Insufficient Permissions',
                });
            }

            const assignmentPath = path.join(
                `${STORE_DIR}`,
                'courses',
                `${courseId}`,
                'assignments',
                `${assignmentId}`,
            );

            const assignmentPathExists = await fs
                .access(assignmentPath)
                .then(() => true)
                .catch(() => false);

            if (assignmentPathExists) {
                try {
                    await fs.rm(assignmentPath, {recursive: true});
                    return res.status(200).json({
                        status: 'success',
                        message: 'Files deleted successfully.',
                    });
                } catch (error: any) {
                    console.error(error.stack);
                    return res.status(500).json({
                        status: 'error',
                        message:
                            'Unknown server error occurred while deleting files.',
                    });
                }
            } else {
                return res.status(404).json({
                    status: 'success',
                    message: 'No submissions found.',
                });
            }
        } catch (error: any) {
            console.error(error.stack);
            return res.status(400).json({
                status: 'error',
                message: 'Unknown server error occurred while deleting files.',
            });
        }
    }

    /**
     * @namespace encryptId
     * @description Helper function that encrypts an id using the provided encryption key.
     * @param id The course/assignment id to be encrypted.
     * @param encryptionKey The key used to encrypt the id.
     * @returns The encrypted representation with embedded initialization vector.
     */
    static encryptId(id: string, encryptionKey: string): string {
        const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)
        const cipher = crypto.createCipheriv(
            'aes-256-cbc',
            Buffer.from(encryptionKey, 'hex'),
            iv,
        );

        let encrypted = cipher.update(id, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const encryptedData = iv.toString('hex') + '_' + encrypted;
        return encryptedData;
    }

    /**
     * @namespace decryptId
     * @description Helper function that decrypts an id using the provided encryption key.
     * @param encryptedId The encrypted course/assignment id to be decrypted.
     * @param encryptionKey The key used to encrypt the id.
     * @returns The decrypted original id as a string.
     */
    static decryptId(encryptedId: string, encryptionKey: string): string {
        const parts = encryptedId.split('_');
        const iv = Buffer.from(parts[0], 'hex');
        const encryptedText = parts[1];

        const decipher = crypto.createDecipheriv(
            'aes-256-cbc',
            Buffer.from(encryptionKey, 'hex'),
            iv,
        );

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
