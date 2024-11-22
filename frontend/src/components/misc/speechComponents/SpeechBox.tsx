import React from 'react';

interface SpeechBoxProps {
    user: boolean;
    message: string;
}

const SpeechBox: React.FC<SpeechBoxProps> = ({
    user,
    message,
}) => {
    return (
        <div className="p-4 flex flex-col gap-4 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-3xl shadow-lg w-[30%] h-60">
            {user ? (
                <>
                    <h4 className="w-full text-start">You</h4>
                    <p className="text-xs overflow-y-auto">{message}</p>
                </>
            ): (
                <>
                    <h4 className="w-full text-end">Atlas</h4>
                    <p className="text-xs overflow-y-auto">{message}</p>
                </>
            )}
        </div>
    );
};

export default SpeechBox;
