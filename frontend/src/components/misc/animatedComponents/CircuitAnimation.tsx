import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import React, {useState} from 'react';
import {useScrollContext} from '../../../contexts/ScrollContext';
import {useIsMobile} from '../../../contexts/MobileContext';

const CircuitAnimation: React.FC = () => {
  const {scrollYProgress} = useScrollContext();

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 5]);

  const isMobile = useIsMobile();

  return (
    <motion.svg
      width={isMobile ? '250%' : '100%'}
      height={isMobile ? '200vh' : '200vh'}
      viewBox="0 0 1440 560"
      className="top-5 absolute z-1 pointer-events-none"
    >
      <g fill="none" transform="scale(1.2)">
        <motion.path
          d="M780 460L780 100L860 20L900 20L1180 300"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M770 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1170 300 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M940 180L1300 540L1380 540L1420 500L1420 220"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M930 180 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1410 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M420 60L740 380L740 420L620 540L340 540"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M410 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM330 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1380 20L1420 60L1420 180L1220 380L1180 380L860 60"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1370 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM850 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M420 20L740 340"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M410 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM730 340 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1140 500L1100 540L980 540L820 380L820 140L860 100"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1130 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM850 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M260 20L380 20"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M250 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM370 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M940 260L1100 420L1140 420L1260 540"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M930 260 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1250 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M220 60L20 260L20 540"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M210 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM10 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M180 220L180 540"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M170 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM170 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M300 460L460 460L620 300"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M290 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM610 300 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M460 180L460 140L380 60L260 60L60 260L60 540"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M450 180 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM50 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1260 180L1260 300L1220 340L1180 340"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1250 180 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1170 340 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1340 60L1300 20L1020 20L980 60"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1330 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM970 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1340 100L1300 60L1020 60"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1330 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1010 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M100 100L180 20L220 20"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M90 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM210 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1340 460L1260 460L1220 420"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1330 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1210 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M980 340L1100 460L1100 500"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M970 340 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1090 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M860 260L1060 460L1060 500"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M850 260 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1050 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M260 460L500 220L540 220L580 260L580 300L460 420L340 420"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M250 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM330 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M420 180L180 180"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M410 180 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM170 180 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M340 140L220 140"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M330 140 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM210 140 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M540 100L540 20"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M530 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM530 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M940 220L860 220"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M930 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM850 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1220 220L1220 100"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1210 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1210 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M460 380L460 300L500 260L540 260"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M450 380 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM530 260 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M220 420L220 220"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M210 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM210 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M660 140L780 20L820 20"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M650 140 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM810 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M140 540L140 220"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M130 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM130 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M380 300L260 420"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M370 300 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM250 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M580 460L580 380"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M570 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM570 380 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M780 540L900 540"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M770 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM890 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M380 260L260 380"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M370 260 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM250 380 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M940 420L940 460L980 500L1020 500"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M930 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1010 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M660 20L580 100L580 140L740 300"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M650 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM730 300 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M300 100L380 100L420 140"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M290 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM410 140 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M620 460L660 460L700 420L700 380"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M610 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM690 380 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1340 380L1260 380"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1330 380 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1250 380 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M220 460L300 540"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M210 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM290 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M660 60L700 60L740 20"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M650 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM730 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M420 220L260 220"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M410 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM250 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M100 500L100 420"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M90 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM90 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M540 460L500 460L460 500L300 500"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M530 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM290 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1380 100L1380 180L1340 220L1300 220"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1370 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1290 220 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M860 300L860 380L900 420"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M850 300 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM890 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M500 500L620 500"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M490 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM610 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M20 60L100 60L140 20"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M10 60 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM130 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1020 100L1100 100"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1010 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1090 100 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M1300 420L1380 420"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M1290 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM1370 420 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M700 180L740 220L740 260"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M690 180 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM730 260 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M740 540L740 460"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M730 540 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM730 460 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M860 500L780 500"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M850 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM770 500 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
        <motion.path
          d="M20 20L100 20"
          strokeWidth={6.67}
          stroke="url(#circuitGrad)"
          style={{
            pathLength: pathLength,
          }}
        ></motion.path>
        <motion.path
          d="M10 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0zM90 20 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0z"
          fill="url(#circuitGrad)"
        ></motion.path>
      </g>
      <defs>
        <linearGradient id="circuitGrad" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(96, 231, 213, 1)" />
          <stop offset="100%" stopColor="#0f71c2" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default CircuitAnimation;
