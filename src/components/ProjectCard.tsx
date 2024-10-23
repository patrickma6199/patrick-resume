import React from 'react';

type ProjectCardProps = {
    title: string;
    description: string;
    technologies: string[];
    github: string;
    link?: string;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    technologies,
    github,
    link,
}) => {
    return (
        <div className="min-w-[60%] box-border p-2 flex flex-row align-center items-center bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-lg shadow-md">
            <div className="flex flex-col rounded-lg py-2 px-3 box-border w-full h-full gap-4">
                <p className="text-2xl font-bold">{title}</p>
                <p className="text-md">{description}</p>
                <div>
                    {technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <button
                        className="bg-gradient-to-br from-darker-blue to-light-blue text-white rounded-lg p-2"
                        onClick={() => window.open(github)}
                    >
                        Github
                    </button>
                    <button
                        className="bg-gradient-to-br from-darker-blue to-light-blue text-white rounded-lg p-2"
                        onClick={() => window.open(link)}
                    >
                        Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
