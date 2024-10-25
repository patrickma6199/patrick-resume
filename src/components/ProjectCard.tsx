import React from 'react';
import Button from './misc/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import {Options, Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';

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
    const splideOptions: Options = {
        type: 'loop',
        rewind: true,
        arrows: false,
        pagination: false,
        direction: 'ttb',
        autoplay: true,
        interval: 1000,
        speed: 1000,
        pauseOnHover: false,
        pauseOnFocus: false,
        height: '100%',
        gap: '5rem',
        easing: 'linear',
        width: '20rem',
    };

    return (
        <div className="relative min-w-[60%] h-144 box-border p-5 justify-start flex flex-row gap-4 items-start bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-4xl shadow-lg">
            <div className="flex flex-col rounded-lg py-2 px-3 box-border w-full h-full gap-4 flex-grow-3 pr-28">
                <p className="text-2xl font-bold">{title}</p>
                <p className="text-md">{dates}</p>
                <ul className="text-md list-disc pl-5">
                    {description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                    ))}
                </ul>
                <div className="flex flex-row gap-4 items-center absolute bottom-6 left-6">
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
            <div className="h-full absolute top-0 right-6">
                <Splide options={splideOptions}>
                    {technologies.map((tech, index) => (
                        <SplideSlide key={index}>{tech}</SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default ProjectCard;
