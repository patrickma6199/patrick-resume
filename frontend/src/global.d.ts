interface SpeechRecognition extends EventTarget {
    start(): void;
    stop(): void;
    abort(): void;
    lang: string;
    continuous: boolean;
    interimResults: boolean;

    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
}

interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    length: number; // Keep as it is; should not have a modifier issue
    [index: number]: SpeechRecognitionResult; // Index signature
}

interface SpeechRecognitionResult {
    isFinal: boolean; // Ensure this is consistently declared without modifiers
    [index: number]: SpeechRecognitionAlternative; // Index signature
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

// Extend the Window interface to include SpeechRecognition
interface Window {
    SpeechRecognition: typeof SpeechRecognition; // Correctly reference as a type
    webkitSpeechRecognition: typeof SpeechRecognition; // Safari compatibility
}

// This declaration allows TypeScript to recognize SpeechRecognition as a constructor function
declare var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
};
