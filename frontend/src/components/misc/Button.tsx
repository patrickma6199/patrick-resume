import React from 'react';

type ButtonProps = {
    onClick: () => void;
    bgColor?: string;
    text?: string;
    icon?: React.JSX.Element;
};

const Awards: React.FC<ButtonProps> = ({
    text,
    onClick,
    icon,
    bgColor = 'bg-gradient-to-tr from-darker-blue to-light-blue',
}) => {
    return (
        <button
            className={`text-xs md:text-md font-semibold ${bgColor} text-white rounded-xl p-2 shadow-lg flex flex-row items-center gap-2 justify-center hover:scale-110 transition-all duration-500`}
            onClick={onClick}
        >
            {icon ?? icon}
            {text ?? text}
        </button>
    );
};

export default Awards;
