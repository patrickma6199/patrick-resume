import ReactLenis from '@studio-freight/react-lenis';
import React from 'react';

type SmoothScrollWrapperProps = {
  children: React.ReactNode;
};

const SmoothScrollWrapper: React.FC<SmoothScrollWrapperProps> = ({
  children,
}) => {
  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false,
    smooth: true,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScrollWrapper;
