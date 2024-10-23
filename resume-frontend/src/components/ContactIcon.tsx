import React, {ReactNode} from 'react';

type ContactIconProps = {
    bgColor: string; // ex. 'bg-dark-blue'
    rounded: boolean;
    onClick?: () => void;
    children?: JSX.Element | ReactNode;
};

const ContactIcon: React.FC<ContactIconProps> = ({
    children,
    bgColor,
    rounded,
    onClick,
}) => {
    return (
        <div
            className={`${bgColor ?? ''} m-4 p-[5px] flex justify-center items-center ${rounded ? 'rounded-full' : ''} shadow-lg ${onClick ? 'cursor-pointer hover:shadow-xl' : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default ContactIcon;
