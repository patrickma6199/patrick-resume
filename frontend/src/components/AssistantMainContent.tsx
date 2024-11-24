import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import AtlasAvatar from '../assets/atlas.webp';
import { API } from '../API';
import SpeechBox from './misc/speechComponents/SpeechBox';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AssistantMainContent: React.FC = () => {
    const [assistantLastMessage, setAssistantLastMessage] = useState<string>('');
    const [enteredPasskey, setEnteredPasskey] = useState<string>('');

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition();

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-UK';
        utterance.rate = 1.4;
        utterance.voice = window.speechSynthesis.getVoices().filter((voice) => voice.name === 'Google UK English')?.[0];
        window.speechSynthesis.speak(utterance);
    };

    const pauseSpeaking = () => {
        window.speechSynthesis.pause();
    }

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
    }

    const handleInputStart = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
    }

    const handleInputEnd = (callback: ((text: string) => void)) => {
        SpeechRecognition.stopListening();
        callback(transcript);
    }

    const handleCompleteMessage = () => {
        handleInputEnd(async (spokenText) => {
            if (spokenText.length === 0) {
                return;
            }

            const response = await API.sendTextToAtlas(enteredPasskey, spokenText);
            if (!response.success) {
                alert(response.response.message || 'Unexpected Error Occurred: Failed to send message to Atlas Assistant');
                return;
            }
            setAssistantLastMessage(response.response.message.content);
            speak(response.response.message.content);
        });
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === ' ') { // Space key is represented as ' '
            event.preventDefault(); // Prevent default scrolling
            handleInputStart();
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === ' ') { // Space key is represented as ' '
            event.preventDefault(); // Prevent default scrolling
            handleCompleteMessage();
        }
    };

    useEffect(() => {
        // Add event listener for keydown
        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('keyup', handleKeyUp);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="relative flex flex-col w-full h-[] items-center px-0 gap-8 box-border lg:px-40 overflow-x-hidden">
            <div
                className="w-full h-full flex flex-col justify-center items-center box-border z-1 gap-10"
            >   
                {(!browserSupportsSpeechRecognition || !isMicrophoneAvailable) ? (
                    <h1 className="w-[50%]">Sorry, speech recognition is not supported in your browser or your microphone is not enabled.</h1>
                ) : (
                    <>
                        <motion.img
                            src={AtlasAvatar}
                            alt="Patrick Ma"
                            className="rounded-full h-60 w-60 m-4 shadow-lg p-2 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple z-20"
                            loading="lazy"
                        />
                        <input
                            type="password"
                            value={enteredPasskey}
                            onChange={(e) => setEnteredPasskey(e.target.value)}
                            placeholder="Enter the Passkey"
                            className="p-4 bg-gradient-to-bl from-darker-blue via-light-blue to-light-purple rounded-xl shadow-lg z-20"
                        />
                        <p>Listening: {listening ? 'Yes' : 'No'}</p>
                        <div className="flex w-full gap-8 justify-center items-center">
                            <SpeechBox user={true} message={transcript} />
                            <SpeechBox user={false} message={assistantLastMessage} />
                        </div>
                            <div className="w-full flex gap-4 justify-center items-center">
                            <button
                                onMouseDown={handleInputStart}
                                onMouseUp={handleCompleteMessage}
                                className="p-4 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-xl shadow-lg z-20">
                                    Speak
                            </button>
                            <button
                                onClick={pauseSpeaking}
                                className="p-4 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-xl shadow-lg z-20">
                                    Pause
                            </button>
                            <button
                                onClick={stopSpeaking}
                                className="p-4 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-xl shadow-lg z-20">
                                    Stop
                            </button>
                        </div>    
                    </>
                )}
            </div>
        </div>
    );
};

export default AssistantMainContent;
