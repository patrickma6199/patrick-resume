import express, {Router} from 'express';
import {Request, Response} from 'express-serve-static-core';
import {OPEN_API} from '../env';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import {JSONHelper} from '../utils/JSONHelper';

// So that tsc includes this file in the build
import chatHistory from '../persist/atlas_persist.json';
import { initialPrompt, Model, MODELS, ValidModelNames } from '../utils/types';

export default class AtlasAssistantRouter {
    static router: Router | null = null;

    static getRouter(): Router {
        if (!this.router) {
            this.router = express.Router();
            this.router.use(express.urlencoded({extended: true}));
            this.router.use(express.json({limit: '100mb'}));
            this.router.use(cookieParser());

            this.router.post('/send/:model', (req: Request, res: Response) =>
                this.sendTextToAtlas(req, res),
            );
            this.router.get('/models', (req: Request, res: Response) => this.getAtlasModels(req, res));
            this.router.get('/latest_messages', (req: Request, res: Response) => this.getLatestMessages(req, res))
        }
        return this.router;
    }

    static async sendTextToAtlas(req: Request, res: Response) {
        try {
            const { message } = req.body;
            let { model } = req.params;

            if (!message || message.length === 0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid data provided',
                });
            }

            if (!model || model.length === 0 || !ValidModelNames.includes(model)) {
                model = 'gpt-4o-mini';
            }

            const selectedModel: Model = MODELS.find((value) => value.name === model)!

            // grab chat history
            if (!JSONHelper.jsonFileExists(`../persist/atlas_persist.json`)) {
                JSONHelper.writeJson(`../persist/atlas_persist.json`, {
                    model: selectedModel.name,
                    ...selectedModel.provider.settings,
                    messages: [
                        initialPrompt,
                    ],
                });
            }
            const chatHistory = JSONHelper.readJson(
                `../persist/atlas_persist.json`,
            );

            if (chatHistory.model !== selectedModel.name) {
                JSONHelper.writeJson(`../persist/atlas_persist.json`, {
                    model: selectedModel.name,
                    ...selectedModel.provider.settings,
                    messages: [
                        initialPrompt,
                    ],
                });
            }

            chatHistory.messages.push({role: 'user', content: message});

            const response = await axios.post(
                `${selectedModel.provider.baseURL}/v1/chat/completions`,
                chatHistory,
                {
                    headers: {
                        Authorization: selectedModel.authToken ? `Bearer ${selectedModel.authToken}` : undefined,
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

    static async getAtlasModels(req: Request, res: Response) {
        try {
            const modelNames = MODELS.map((model) => model.name);

            return res.status(200).json({
                status: 'success',
                message: modelNames,
            })

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
