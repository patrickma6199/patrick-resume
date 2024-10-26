import React from 'react';

type ButtonProps = {
    text: string;
    onClick: () => void;
    icon?: React.JSX.Element;
};

const Awards: React.FC<ButtonProps> = ({text, onClick, icon}) => {
    return (
        <button
            className="text-xs md:text-md font-semibold bg-gradient-to-tr from-darker-blue to-light-blue text-white rounded-xl p-2 shadow-lg flex flex-row items-center gap-2 justify-center"
            onClick={onClick}
        >
            {icon}
            {text}
        </button>
    );
};

export default Awards;
