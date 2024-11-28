import express, {Router} from 'express';
import {Request, Response} from 'express-serve-static-core';
import {OPEN_API, PASSKEY} from '../env';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import {JSONHelper} from '../utils/JSONHelper';

// So that tsc includes this file in the build
import chatHistory from '../persist/atlas_persist.json';

export default class AtlasAssistantRouter {
    static router: Router | null = null;

    static getRouter(): Router {
        if (!this.router) {
            this.router = express.Router();
            this.router.use(express.urlencoded({extended: true}));
            this.router.use(express.json({limit: '100mb'}));
            this.router.use(cookieParser());
            this.router.post('/send', (req: Request, res: Response) =>
                this.sendTextToAtlas(req, res),
            );
        }
        return this.router;
    }

    static async sendTextToAtlas(req: Request, res: Response) {
        try {
            const {message, passkey} = req.body;

            if (!message || message.length === 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid data provided',
                });
            }

            if (passkey != PASSKEY) {
                return res.status(403).json({
                    status: 'error',
                    message: 'Invalid passkey provided',
                });
            }

            // grab chat history
            if (!JSONHelper.jsonFileExists(`../persist/atlas_persist.json`)) {
                JSONHelper.writeJson(`../persist/atlas_persist.json`, {
                    model: 'gpt-4o-mini',
                    temperature: 0.7,
                    messages: [
                        {
                            role: 'system',
                            content:
                                "You are named 'Atlas', and you are my personal home assistant, optimized for interaction through speech recognition and text-to-speech. Thus, you must speak conversationally and respond with wit from time to time. My requests will stem from tasks related to coding, photography, software support, music, and other miscellaneous activities. You must always refer to me as 'sir' and keep your responses as concise as you deem conversationally natural so that I don't have to listen to paragraphs of response text.",
                        },
                    ],
                });
            }
            const chatHistory = JSONHelper.readJson(
                `../persist/atlas_persist.json`,
            );

            chatHistory.messages.push({role: 'user', content: message});

            const response = await axios.post(
                `https://api.openai.com/v1/chat/completions`,
                chatHistory,
                {
                    headers: {
                        Authorization: `Bearer ${OPEN_API}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (response.status !== 200) {
                return res.status(response.status).json({
                    status: 'error',
                    message: 'Failed to send message to OpenAI',
                });
            }

            const atlasResponse = response.data.choices[0].message || {
                role: 'system',
                content:
                    'Ignore this message. There was an issue with this one.',
            };

            chatHistory.messages.push(atlasResponse);

            JSONHelper.writeJson(`../persist/atlas_persist.json`, chatHistory);

            res.status(200).json({
                status: 'success',
                message: atlasResponse,
            });
        } catch (e: any) {
            console.error(e);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }

    static async getLatestMessages(req: Request, res: Response) {
        try {
            if (!JSONHelper.jsonFileExists(`../persist/atlas_persist.json`)) {
                return res.status(404).json({
                    status: 'error',
                    message: 'No chat history found',
                });
            }

            const chatHistory = JSONHelper.readJson(
                `../persist/atlas_persist.json`,
            );

            res.status(200).json({
                status: 'success',
                message: chatHistory.messages,
            });
        } catch (e: any) {
            console.error(e);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }
    }
}
