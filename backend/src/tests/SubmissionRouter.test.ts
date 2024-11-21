import {describe, beforeEach, expect, test, jest} from '@jest/globals';
import createApp from '../app';
import {authHelperMock, dbHelperMock} from './utils/mockFunctions';
import request from 'supertest';
import * as fs from 'fs/promises';
import SubmissionRouter from '../routes/SubmissionRouter';
import {Request, Response} from 'express-serve-static-core';
import {FileTypeResult} from 'file-type';
import {fromBuffer} from 'file-type';
import validate from '../utils/data_validator';

jest.mock('fs/promises');
const mockedFs = fs as jest.Mocked<typeof fs>;

jest.mock('file-type');
const mockedFromBuffer = fromBuffer as jest.MockedFunction<typeof fromBuffer>;

const mockedCrypto = {
    randomBytes: jest.fn().mockReturnValue({
        toString: jest.fn().mockReturnValue('string'),
    }),
    createCipheriv: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue('string'),
        final: jest.fn().mockReturnValue('string'),
    }),
    createDecipheriv: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue('string'),
        final: jest.fn().mockReturnValue('string'),
    }),
    createHash: jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
            digest: jest.fn().mockReturnValue('string'),
        }),
        final: jest.fn().mockReturnValue('string'),
    }),
};

jest.mock('crypto', () => ({
    randomBytes: () => mockedCrypto.randomBytes(),
    createCipheriv: (encoding: string, buffer: Buffer, iv: Buffer) =>
        mockedCrypto.createCipheriv(),
    createDecipheriv: (encoding: string, buffer: Buffer, iv: Buffer) =>
        mockedCrypto.createDecipheriv(),
    createHash: () => mockedCrypto.createHash(),
}));

const app = createApp(authHelperMock, dbHelperMock);
const agent = request.agent(app);

describe('Testing GET and POST /submission', () => {
    beforeEach(() => {
        authHelperMock.getTokensFromCookies.mockReset();
        authHelperMock.getUserFromToken.mockReset();
        Object.keys(mockedFs).forEach(key => {
            const property = mockedFs[key as keyof typeof mockedFs];
            if (typeof property === 'function') {
                property.mockReset();
            }
        });
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReset();
        dbHelperMock.isInCourse.mockReset();
        dbHelperMock.getPreviousSubmission.mockReset();
        dbHelperMock.isCourseInstructor.mockReset();
    });

    test('Testing /get with no Search Parameters or Token', async () => {
        const response = await agent
            .get('/submission/get/courseHash/assignmentHash/')
            .set({referer: 'localhost'})
            .send({});

        expect(authHelperMock.getUserFromToken).not.toBeCalled();
        expect(authHelperMock.getTokensFromCookies).not.toBeCalled();

        expect(response.status).toBe(404);
    });

    test('Testing /get with Search Parameters but no Token', async () => {
        authHelperMock.getTokensFromCookies.mockReturnValue(null);

        const response = await agent
            .get('/submission/get/courseHash/assignmentHash/valid_hash')
            .set({referer: 'localhost'})
            .send({});

        expect(authHelperMock.getUserFromToken).not.toBeCalled();
        expect(authHelperMock.getTokensFromCookies).toBeCalledTimes(1);
        expect(
            typeof authHelperMock.getTokensFromCookies.mock.calls[0][0],
        ).toBe('object');

        expect(response.status).toBe(403);
        expect(response.text).toBe('Token is null or undefined');
    });

    test('Testing /get with Correct Token and Parameters', async () => {
        authHelperMock.getUserFromToken.mockResolvedValue({
            status: 200,
            errorMsg: null,
            user: {
                userId: 1,
                role: 'instructor',
                avatarLocation: null,
            },
        });

        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        authHelperMock.getTokensFromCookies.mockReturnValue([
            'validToken',
            'validRefreshToken',
        ]);

        dbHelperMock.isInCourse.mockResolvedValue(true);
        mockedFs.access.mockResolvedValue(undefined);

        const mockResponse = {
            sendFile: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const mockRequest = {
            params: {
                courseHash: 'courseHash',
                assignmentHash: 'assignmentHash',
                hash: 'valid_hash',
            },
            cookies: {},
        } as unknown as Request;

        await SubmissionRouter.getSubmission(mockRequest, mockResponse);

        expect(authHelperMock.getUserFromToken).toBeCalledTimes(1);
        expect(authHelperMock.getUserFromToken.mock.calls[0][0]).toBe(
            'validToken',
        );
        expect(authHelperMock.getUserFromToken.mock.calls[0][1]).toBe(
            'validRefreshToken',
        );
        expect(authHelperMock.getTokensFromCookies).toBeCalledTimes(1);
        expect(
            typeof authHelperMock.getTokensFromCookies.mock.calls[0][0],
        ).toBe('object');

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.sendFile).toHaveBeenCalledWith(
            expect.stringContaining('valid_hash'),
        );
    });

    test('Testing /upload with no Params or Token', async () => {
        const response = await agent
            .post('/submission/upload/')
            .set({referer: 'localhost'})
            .send({});

        jest.spyOn(validate, 'checkNumber').mockReturnValue(false);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(false);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /upload with Params but no Token', async () => {
        authHelperMock.getUserFromToken.mockResolvedValue({
            status: 403,
            errorMsg: 'Token is null or undefined',
            user: null,
        });

        const response = await agent
            .post('/submission/upload/')
            .set({referer: 'localhost'})
            .send({
                submission: 'someBase64Encoding',
                courseId: 'courseId',
                assignmentId: 'assignmentId',
            });

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /upload with Params and Token', async () => {
        authHelperMock.getUserFromToken.mockResolvedValue({
            status: 200,
            errorMsg: null,
            user: {
                userId: 1,
                role: 'instructor',
            },
        });

        authHelperMock.getTokensFromCookies.mockReturnValue([
            'validToken',
            'validRefreshToken',
        ]);

        dbHelperMock.isInCourse.mockResolvedValue(true);
        dbHelperMock.getPreviousSubmission.mockResolvedValue(null);

        mockedFs.mkdir.mockResolvedValue(undefined);

        jest.spyOn(validate, 'checkSubmissionValid').mockResolvedValue(true);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);
        jest.spyOn(validate, 'checkNumber').mockReturnValue(true);

        mockedFromBuffer.mockResolvedValue({
            mime: 'application/pdf',
            ext: 'pdf',
        } as FileTypeResult);

        jest.mock('file-type', () => ({
            fromBuffer: jest
                .fn<(...args: any[]) => Promise<any>>()
                .mockResolvedValue({
                    ext: 'pdf',
                    mime: 'application/pdf',
                } as FileTypeResult),
        }));

        const response = await agent
            .post('/submission/upload/')
            .set({referer: 'localhost'})
            .send({
                submission: 'someBase64Encoding',
                token: 'validToken',
                courseId: 1,
                assignmentId: 1,
                submissionId: 1,
                fileType: '.pdf',
                mime: 'application/pdf',
            });

        expect(authHelperMock.getUserFromToken).toBeCalledTimes(1);
        expect(mockedFs.mkdir).toBeCalledTimes(1);
        expect(mockedFs.writeFile).toBeCalledTimes(1);
        expect(response.status).toBe(200);

        expect(response.body.status).toBe('success');
        expect(response.body.dest).toMatch(
            /\/store\/submission\/get\/string_stringstring\/string_stringstring\/[0-9]+\.pdf/i,
        );
    });

    test('Testing /remove with no Token or submissionLocation', async () => {
        const response = await agent
            .post('/submission/remove/')
            .set({referer: 'localhost'})
            .send({});

        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(false);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /remove with Token but no submissionLocation', async () => {
        const response = await agent
            .post('/submission/remove/')
            .set({referer: 'localhost'})
            .send({
                token: 'validToken',
            });

        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(false);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /remove with Token and submissionLocation', async () => {
        authHelperMock.getUserFromToken.mockResolvedValue({
            status: 200,
            errorMsg: null,
            user: {
                userId: 1,
                role: 'instructor',
            },
        });

        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        dbHelperMock.getPreviousSubmission.mockResolvedValue(
            'submissionLocation',
        );
        dbHelperMock.isInCourse.mockResolvedValue(true);

        mockedFs.unlink.mockResolvedValue(undefined);
        mockedFs.access.mockResolvedValue(undefined);

        const response = await agent
            .post('/submission/remove/')
            .set({referer: 'localhost'})
            .send({
                token: 'validToken',
                submissionLocation:
                    '/store/submission/get/string_stringstring/string_stringstring/string.pdf',
            });

        expect(authHelperMock.getUserFromToken).toBeCalledTimes(1);
        expect(mockedFs.unlink).toBeCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });

    test('Testing /remove_course with No Token or CourseId', async () => {
        const response = await agent
            .post('/submission/remove_course/')
            .set({referer: 'localhost'})
            .send({});

        jest.spyOn(validate, 'checkNumber').mockReturnValue(false);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(false);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /remove_course with Token but no CourseId', async () => {
        const response = await agent
            .post('/submission/remove_course/')
            .set({referer: 'localhost'})
            .send({
                token: 'validToken',
            });

        jest.spyOn(validate, 'checkNumber').mockReturnValue(false);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /remove_course with Token and CourseId', async () => {
        authHelperMock.getUserFromToken.mockResolvedValue({
            status: 200,
            errorMsg: null,
            user: {
                userId: 1,
                role: 'instructor',
            },
        });

        jest.spyOn(validate, 'checkNumber').mockReturnValue(true);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        dbHelperMock.isCourseInstructor.mockResolvedValue(true);
        dbHelperMock.getPreviousSubmission.mockResolvedValue(
            'submissionLocation',
        );

        mockedFs.unlink.mockResolvedValue(undefined);
        mockedFs.access.mockResolvedValue(undefined);
        mockedFs.rm.mockResolvedValue(undefined);

        const response = await agent
            .post('/submission/remove_course/')
            .set({referer: 'localhost'})
            .send({
                token: 'validToken',
                courseId: 1,
            });

        expect(authHelperMock.getUserFromToken).toBeCalledTimes(1);
        expect(mockedFs.rm).toBeCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Files deleted successfully.');
    });

    test('Testing /remove_assignment with No Token or AssignmentId', async () => {
        const response = await agent
            .post('/submission/remove_assignment/')
            .set({referer: 'localhost'})
            .send({});

        jest.spyOn(validate, 'checkNumber').mockReturnValue(false);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(false);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /remove_assignment with Token but no AssignmentId', async () => {
        const response = await agent
            .post('/submission/remove_assignment/')
            .set({referer: 'localhost'})
            .send({
                token: 'validToken',
            });

        jest.spyOn(validate, 'checkNumber').mockReturnValue(false);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /remove_assignment with Token and AssignmentId', async () => {
        authHelperMock.getUserFromToken.mockResolvedValue({
            status: 200,
            errorMsg: null,
            user: {
                userId: 1,
                role: 'instructor',
            },
        });

        jest.spyOn(validate, 'checkNumber').mockReturnValue(true);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        dbHelperMock.isCourseInstructor.mockResolvedValue(true);
        dbHelperMock.getPreviousSubmission.mockResolvedValue(
            'submissionLocation',
        );

        mockedFs.unlink.mockResolvedValue(undefined);
        mockedFs.access.mockResolvedValue(undefined);
        mockedFs.rm.mockResolvedValue(undefined);

        const response = await agent
            .post('/submission/remove_assignment/')
            .set({referer: 'localhost'})
            .send({
                token: 'validToken',
                assignmentId: 1,
            });

        expect(authHelperMock.getUserFromToken).toBeCalledTimes(1);
        expect(mockedFs.rm).toBeCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Files deleted successfully.');
    });
});
