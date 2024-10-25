import React from 'react';

type IconProps = {
    src: string;
};

const Icon: React.FC<IconProps> = ({src}) => {
    return <img src={src} className="w-20 h-20" />;
};

export default Icon;
