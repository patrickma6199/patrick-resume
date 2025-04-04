import {PRIVATE_LMSTUDIO_ADDRESS, OPEN_API} from '../env'

export type Model = {
  name: string
  provider: Provider
  authToken?: string
}

export type EnabledSettings = {
  temperature?: number
  max_tokens?: number
  stream?: boolean
}

export type Provider = {
  baseURL: string
  settings: EnabledSettings
}

export const PROVIDER_URL = {
  OpenAI: 'https://api.openai.com',
  LocalLMStudio: 'http://localhost:1234/',
  PrivateLMStudio: PRIVATE_LMSTUDIO_ADDRESS || 'http://localhost:1234/',
}

export const ValidModelNames = ['gpt-4o-mini', 'gemma-3-4b-it']

export const initialPrompt = {
  role: 'system',
  content:
    `You are named 'Atlas', and you are my personal home assistant, optimized for interaction through speech recognition and text-to-speech. Thus, you must speak conversationally and respond with wit from time to time. My requests will stem from tasks related to coding, photography, software support, music, and other miscellaneous activities. You must always refer to me as 'sir' and keep your responses as concise as you deem conversationally natural so that I don't have to listen to paragraphs of response text.`,
}

export const MODELS: Model[] = [
  {
    name: 'gpt-4o-mini',
    provider: {
      baseURL: PROVIDER_URL.OpenAI,
      settings: {
        temperature: 0.7,
      }
    },
    authToken: OPEN_API
  },
  {
    name: 'gemma-3-4b-it',
    provider: {
      baseURL: PROVIDER_URL.PrivateLMStudio,
      settings: {
        temperature: 0.7,
        max_tokens: -1,
        stream: false,
      }
    },
  }
]