import React from 'react';
import Button from './Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import {Options, Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';
import {useIsMobile} from '../../contexts/MobileContext';

type ProjectCardProps = {
    title: string;
    dates: string;
    description: string[];
    technologies: React.JSX.Element[];
    github?: string;
    link?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    dates,
    description,
    technologies,
    github,
    link,
}) => {
    const isMobile = useIsMobile();

    const splideOptions: Options = {
        type: 'loop',
        rewind: true,
        arrows: false,
        pagination: false,
        direction: isMobile ? 'ltr' : 'ttb',
        autoplay: true,
        interval: 1000,
        speed: 1000,
        pauseOnHover: false,
        pauseOnFocus: false,
        height: isMobile ? undefined : '100%',
        gap: isMobile ? '-1rem' : '5rem',
        easing: 'linear',
        width: isMobile ? '100%' : '25rem',
        drag: false,
        focus: 'center',
        preloadPages: 1,
        perPage: 3,
        start: 1,
    };

    return (
        <div className="relative min-w-[60%] my-4 md:my-0 h-144 box-border p-3 md:p-5 justify-start flex flex-row gap-4 items-start bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-4xl shadow-lg">
            <div className="flex flex-col rounded-lg py-2 px-3 box-border w-full h-full gap-4 flex-grow-3 md:pr-28">
                <p className="text-lg md:text-2xl font-bold">{title}</p>
                <p className="text-sm md:text-md">{dates}</p>
                <ul className="text-xs md:text-md list-disc pl-2 md:pl-5">
                    {description.map((desc, index) => (
                        <li key={index} className="md:py-2">
                            {desc}
                        </li>
                    ))}
                </ul>
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
