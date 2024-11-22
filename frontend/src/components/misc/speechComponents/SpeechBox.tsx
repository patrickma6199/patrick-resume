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
        <div className="p-4 flex flex-col gap-4 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-3xl shadow-lg w-[40%] h-60">
            {user ? (
                <>
                    <h4 className="w-full text-start">You</h4>
                    <div className="overflow-y-auto no-scrollbar h-full">
                        <p className="text-xs">{message}</p>
                    </div>
                </>
            ): (
                <>
                    <h4 className="w-full text-end">Atlas</h4>
                        <div className="overflow-y-auto no-scrollbar h-full">
                            <p className="text-xs ">{message}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default SpeechBox;
