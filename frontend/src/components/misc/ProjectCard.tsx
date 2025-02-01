import React, {useEffect} from 'react';
import Button from './Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import {Options, Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';
import {useIsMobile} from '../../contexts/MobileContext';
import SmoothScrollWrapper from '../../contexts/SmoothScrollWrapper';

type ProjectCardProps = {
    title: string;
    dates: string;
    description: string[];
    technologies: React.JSX.Element[];
    warning?: string;
    github?: string;
    link?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    dates,
    description,
    technologies,
    warning,
    github,
    link,
}) => {
    const isMobile = useIsMobile();

    const splideOptions: Options = {
        type: 'loop',
        arrows: false,
        pagination: false,
        direction: isMobile ? 'ltr' : 'ttb',
        autoplay: true,
        interval: isMobile ? 3000 : 1000,
        speed: isMobile ? 3000 : 1000,
        pauseOnHover: false,
        pauseOnFocus: false,
        height: isMobile ? undefined : '100%',
        gap: isMobile ? '-1rem' : '3rem',
        easing: 'linear',
        width: isMobile ? '100%' : '20rem',
        drag: false,
        preloadPages: 1,
        perPage: isMobile ? 3 : 1,
        start: 0,
    };

    return (
        <div className="relative min-w-[60%] my-4 md:my-0 h-144 box-border p-3 md:p-5 justify-start flex flex-row gap-4 items-start bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-4xl shadow-lg">
            <div className="flex flex-col rounded-lg py-2 px-3 box-border w-full h-full gap-4 flex-grow-3 md:pr-28">
                <p className="text-lg md:text-2xl font-bold">{title}</p>
                <p className="text-sm md:text-lg">{dates}</p>
                <SmoothScrollWrapper>
                    <ul
                        className="description text-xs md:text-sm list-disc pl-2 md:pl-5 h-72 overflow-y-auto md:overflow-y-hidden"
                        onWheel={e => e.stopPropagation()}
                    >
                        {description.map((desc, index) => (
                            <li key={index} className="md:py-2">
                                {desc}
                            </li>
                        ))}
                    </ul>
                </SmoothScrollWrapper>
                <div className="flex flex-row gap-4 items-center absolute bottom-6 left-6 z-1000">
                    {github && (
                        <Button
                            onClick={() => window.open(github)}
                            text="GitHub"
                            icon={<GitHubIcon />}
                        />
                    )}
                    {link && (
                        <Button
                            onClick={() => window.open(link)}
                            text="Link"
                            icon={<OpenInBrowserIcon />}
                        />
                    )}
                    {warning && (
                        <p className="font-bold text-xs md:text-sm">
                            {warning}
                        </p>
                    )}
                </div>
            </div>
            <div className="md:h-full absolute z-0 bottom-20 md:bottom-auto md:top-0 left-0 md:left-auto md:right-6">
                <Splide id={`tech-carousel-${title}`} options={splideOptions}>
                    {technologies.map((tech, index) => (
                        <SplideSlide key={index}>{tech}</SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default ProjectCard;
