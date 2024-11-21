import {describe, beforeEach, expect, test, jest} from '@jest/globals';
import createApp from '../app';
import {authHelperMock, dbHelperMock} from './utils/mockFunctions';
import request from 'supertest';
import * as fs from 'fs/promises';
import {fromBuffer} from 'file-type';
import AvatarRouter from '../routes/AvatarRouter';
import {Request, Response} from 'express-serve-static-core';
import {FileTypeResult} from 'file-type';
import validate from '../utils/data_validator';
import sharp from 'sharp';

jest.mock('fs/promises');
const mockedFs = fs as jest.Mocked<typeof fs>;

jest.mock('file-type');
const mockedFromBuffer = fromBuffer as jest.MockedFunction<typeof fromBuffer>;

jest.mock('sharp');
const mockedSharp = sharp as jest.Mocked<typeof sharp>;

const app = createApp(authHelperMock, dbHelperMock);
const agent = request.agent(app);

describe('Testing GET and POST /avatar', () => {
    beforeEach(() => {
        authHelperMock.getTokensFromCookies.mockReset();
        authHelperMock.getUserFromToken.mockReset();
        authHelperMock.getAdminFromToken.mockReset();
        mockedFromBuffer.mockReset();
        Object.keys(mockedFs).forEach(key => {
            const property = mockedFs[key as keyof typeof mockedFs];
            if (typeof property === 'function') {
                property.mockReset();
            }
        });
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReset();
    });

    test('Testing /get with No Search Parameters or Token', async () => {
        const response = await agent
            .get('/avatar/get/')
            .set({referer: 'localhost'})
            .send({});

        expect(authHelperMock.getUserFromToken).not.toBeCalled();
        expect(authHelperMock.getTokensFromCookies).not.toBeCalled();

        expect(response.status).toBe(404);
    });

    test('Testing /get with Search Parameters but no Token', async () => {
        authHelperMock.getTokensFromCookies.mockReturnValue(null);

        const response = await agent
            .get('/avatar/get/validhash')
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

        authHelperMock.getTokensFromCookies.mockReturnValue([
            'validToken',
            'validRefreshToken',
        ]);
        mockedFs.access.mockResolvedValue(undefined);

        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        const mockResponse = {
            sendFile: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const mockRequest = {
            get: (val: string) => {
                if (val == 'Referrer') {
                    return 'localhost';
                }
            },
            Referrer: 'localhost',
            params: {hash: 'validhash'},
            cookies: {},
        } as unknown as Request;

        await AvatarRouter.getAvatar(mockRequest, mockResponse);

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
            expect.stringContaining('validhash'),
        );
    });

    test('Testing /upload with no Params or Token', async () => {
        const response = await agent
            .post('/avatar/upload/')
            .set({referer: 'localhost'})
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /upload with Params but no Token', async () => {
        const response = await agent
            .post('/avatar/upload/')
            .set({referer: 'localhost'})
            .send({
                avatar: 'someBase64Encoding',
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

        mockedFromBuffer.mockResolvedValue({
            mime: 'image/jpeg',
            ext: 'jpg',
        } as FileTypeResult);

        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        authHelperMock.getTokensFromCookies.mockReturnValue([
            'validToken',
            'validRefreshToken',
        ]);

        mockedFs.writeFile.mockResolvedValue(undefined);

        const toFileMock = jest
            .fn()
            .mockReturnValue(Promise.resolve(undefined));
        const webpMock = jest.fn().mockReturnValue({toFile: toFileMock});
        const resizeMock = jest.fn().mockReturnValue({webp: webpMock});

        mockedSharp.mockReturnValue({resize: resizeMock} as any);

        const response = await agent
            .post('/avatar/upload/')
            .set({referer: 'localhost'})
            .set({referer: 'localhost'})
            .send({
                avatar: 'someBase64Encoding',
                token: 'validToken',
            });

        expect(authHelperMock.getUserFromToken).toBeCalledTimes(1);
        expect(mockedFromBuffer).toBeCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.dest).toMatch(
            /\/store\/avatar\/get\/[A-Za-z0-9]+\.webp/i,
        );
    });

    test('Testing /remove with no Token', async () => {
        const response = await agent
            .post('/avatar/remove/')
            .set({referer: 'localhost'})
            .send({});

        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(false);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Missing required parameters.');
    });

    test('Testing /remove with Token', async () => {
        authHelperMock.getUserFromToken.mockResolvedValue({
            status: 200,
            errorMsg: null,
            user: {
                userId: 1,
                role: 'instructor',
                avatarLocation: '/store/avatar/get/validhash',
            },
        });

        mockedFs.unlink.mockResolvedValue(undefined);
        jest.spyOn(validate, 'checkStringIsNotEmpty').mockReturnValue(true);

        const response = await agent
            .post('/avatar/remove/')
            .set({referer: 'localhost'})
            .send({
                token: 'validToken',
            });

        expect(authHelperMock.getUserFromToken).toBeCalledTimes(1);
        expect(mockedFs.unlink).toBeCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });
});
