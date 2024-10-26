import {motion} from 'framer-motion';
import React, {useCallback, useRef} from 'react';

const GRID_WIDTH = 50;
const GRID_HEIGHT = 25;

const WaveAnimation: React.FC = () => {
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleClick = useCallback((index: number) => {
        const clickedX = index % GRID_WIDTH;
        const clickedY = Math.floor(index / GRID_WIDTH);

        circleRefs.current.forEach((circle, i) => {
            if (circle) {
                const x = i % GRID_WIDTH;
                const y = Math.floor(i / GRID_WIDTH);

                const distance = Math.sqrt(
                    Math.pow(clickedX - x, 2) + Math.pow(clickedY - y, 2),
                );
                const delay = distance * (0.01 + Math.random() * 0.01);
                const upAmount = 10;

                circle.animate(
                    [
                        {transform: 'translateY(0)', opacity: 0},
                        {transform: `translateY(-${upAmount}rem)`, opacity: 1},
                        {transform: 'translateY(0)', opacity: 0},
                    ],
                    {
                        duration: 3000,
                        delay: delay * 5000,
                        easing: 'ease-out',
                    },
                );
            }
        });
    }, []);

    // Create grid of circles with refs and click handler
    const circles = [];
    for (let i = 0; i < GRID_WIDTH * GRID_HEIGHT; i++) {
        circles.push(
            <motion.div
                key={i}
                className="flex justify-center items-center opacity-0 p-3 cursor-pointer transition-colors rounded-full"
                ref={el => (circleRefs.current[i] = el)}
                onClick={() => handleClick(i)}
            >
                <motion.div className="circle h-3 w-3 rounded-full bg-gradient-to-b from-sky-blue to-darker-blue z-0"></motion.div>
            </motion.div>,
        );
    }

    return (
        <motion.div
            className="grid w-full h-[150vh] absolute z-0"
            style={{
                gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
            }}
        >
            {circles}
        </motion.div>
    );
};

export default WaveAnimation;
