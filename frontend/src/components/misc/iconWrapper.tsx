import React from 'react';

type IconProps = {
  src: string;
};

const Icon: React.FC<IconProps> = ({src}) => {
  return <img src={src} className="w-10 h-10 md:w-20 md:h-20" />;
};

export default Icon;
