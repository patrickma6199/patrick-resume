import React, {useState} from 'react';
import ProjectCard from '../misc/ProjectCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/css/Projects.css';
import Slider, {Settings} from 'react-slick';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import AndroidStudioIcon from '../../assets/techStackLogos/android-studio.svg';
import CSSIcon from '../../assets/techStackLogos/css.svg';
import DockerIcon from '../../assets/techStackLogos/docker.svg';
import FirebaseIcon from '../../assets/techStackLogos/firebase.svg';
import JavaIcon from '../../assets/techStackLogos/java.svg';
import JQueryIcon from '../../assets/techStackLogos/jquery.svg';
import MySQLIcon from '../../assets/techStackLogos/mysql.svg';
import PHPIcon from '../../assets/techStackLogos/php.svg';
import ReactIcon from '../../assets/techStackLogos/react.svg';
import TailwindCSSIcon from '../../assets/techStackLogos/tailwindcss.svg';
import TypeScriptIcon from '../../assets/techStackLogos/typescript.svg';
import ApacheIcon from '../../assets/techStackLogos/apache.svg';
import GradleIcon from '../../assets/techStackLogos/gradle.svg';
import LinuxIcon from '../../assets/techStackLogos/linux.svg';
import BootstrapIcon from '../../assets/techStackLogos/bootstrap.svg';
import MikroORMIcon from '../../assets/techStackLogos/mikro-orm.svg';
import NodeIcon from '../../assets/techStackLogos/node.svg';
import YarnIcon from '../../assets/techStackLogos/yarn.svg';
import NPMIcon from '../../assets/techStackLogos/npm.svg';
import NestJSIcon from '../../assets/techStackLogos/nestjs.svg';
import NextJSIcon from '../../assets/techStackLogos/nextjs.svg';
import PostgresIcon from '../../assets/techStackLogos/postgresql.svg';
import SentryIcon from '../../assets/techStackLogos/sentry.svg';
import RedisIcon from '../../assets/techStackLogos/redis.svg';
import ThreeJSIcon from '../../assets/techStackLogos/threejs.svg';
import FramerMotionIcon from '../../assets/techStackLogos/framer-motion.svg';
import Icon from '../misc/iconWrapper';
import {useIsMobile} from '../../contexts/MobileContext';
import Button from '../misc/Button';

const Projects: React.FC = () => {
    const isMobile = useIsMobile();

    const [autoplay, setAutoplay] = useState<boolean>(true);

    const toggleAutoplay = () => {
        setAutoplay(prevAutoplay => !prevAutoplay);
    };

    const projectCardSettings: Settings = {
        dots: !isMobile,
        infinite: true,
        autoplaySpeed: 5000,
        adaptiveHeight: false,
        slidesToShow: 1,
        touchMove: isMobile,
        slidesToScroll: 1,
        autoplay: autoplay,
        centerMode: !isMobile,
        pauseOnHover: isMobile,
        swipe: isMobile,
        arrows: !isMobile,
    };
    return (
        <div className="min-w-[90%] flex flex-col justify-center items-between p-4 relative">
            <Slider
                {...projectCardSettings}
                key={`${isMobile} - ${autoplay}`} // To force re-render of this component when settings change
            >
                <div className="box-border min-h-min min-w-[100%] flex justify-center items-center">
                    <ProjectCard
                        title="Atlas Portfolio"
                        dates="Oct 2024 - Present"
                        description={[
                            `A frontend - focused project to act as an alternative platform to highlight my academic and occupational achievements`,
                            `Utilized React with Tailwind, Framer Motion, and MaterialUI to create a unique user experience right from the landing page and to learn more about solving UI/UX-focused tasks`,
                            `Constructed a custom 3D model of the solar system proportional in spin and size using Three.js as an introductory project to 3D rendering`,
                            `Deployed using DigitalOcean Droplets running on Ubuntu Server distro with Github Webhooks for CI/CD`,
                            `Plan to construct a Three.JS model to showcase my photography in a manner that is interactive and exploratory`,
                        ]}
                        technologies={[
                            <Icon src={ReactIcon} />,
                            <Icon src={TailwindCSSIcon} />,
                            <Icon src={TypeScriptIcon} />,
                            <Icon src={DockerIcon} />,
                            <Icon src={NodeIcon} />,
                            <Icon src={YarnIcon} />,
                            <Icon src={LinuxIcon} />,
                            <Icon src={ThreeJSIcon} />,
                            <Icon src={FramerMotionIcon} />,
                        ]}
                        github="https://github.com/patrickma6199/patrick-resume/"
                        link="https://atlas.patrickweb.net"
                    />
                </div>
                <div className="box-border min-h-min min-w-[100%] flex justify-center items-center">
                    <ProjectCard
                        title="HelpMe System - Ongoing"
                        dates="Sept 2024 - Present"
                        description={[
                            `Student built office hour management system with LLM integration for course aid currently deployed at Okanagan College and UBCO for COSC 304, 404, and all first year MATH courses`,
                            `Utilized Next.js for server-side rendering to improve SEO and reduce time to first paint`,
                            `Implemented a NestJS API to handle user authentication, course management, office hour queue management, and LLM integration`,
                            `Developed lightweight, ephemeral chat functionality with Redis Pub/Sub to allow for real-time communication between students and TAs.`,
                            `Used Redis to cache frequently requested data and leveraged Pub/Sub with Server-Sent Events (SSE) for real-time updates of queue status's.`,
                        ]}
                        technologies={[
                            <Icon src={NextJSIcon} />,
                            <Icon src={NestJSIcon} />,
                            <Icon src={TypeScriptIcon} />,
                            <Icon src={TailwindCSSIcon} />,
                            <Icon src={DockerIcon} />,
                            <Icon src={PostgresIcon} />,
                            <Icon src={RedisIcon} />,
                            <Icon src={MikroORMIcon} />,
                            <Icon src={SentryIcon} />,
                            <Icon src={NodeIcon} />,
                            <Icon src={YarnIcon} />,
                        ]}
                        link="https://coursehelp.ubc.ca"
                    />
                </div>
                <div className="box-border min-h-min min-w-[100%] flex justify-center items-center">
                    <ProjectCard
                        title="Edu-Val (Capstone Project) - Ongoing"
                        dates="May 2024 - Present | Learnification Technologies"
                        description={[
                            `Capstone project that was adopted by a client to be used as a peer review and evaluation platform for his students at SFU and Northeastern University`,
                            `Implemented 8 microservices using Node.js and Express.js to handle user authentication, submission persistance, third-party API integration, and more to ensure a scalable and intuitively maintainable codebase`,
                            `Utilized a MySQL database with MikroORM in Node.js to handle data persistence and retrieval`,
                            `Integrated a reverse-proxy server with Nginx to handle load balancing, logging, and routing of incoming requests to the appropriate microservice`,
                            `Wrote extensive documentation for our Capstone client to ensure maintainability.`,
                            `Hired by the client to continue development of the project post-handoff, and to provide support and maintenance upon deployment`,
                        ]}
                        technologies={[
                            <Icon src={ReactIcon} />,
                            <Icon src={TypeScriptIcon} />,
                            <Icon src={CSSIcon} />,
                            <Icon src={DockerIcon} />,
                            <Icon src={MySQLIcon} />,
                            <Icon src={MikroORMIcon} />,
                            <Icon src={NodeIcon} />,
                            <Icon src={NPMIcon} />,
                        ]}
                        warning="For legal reasons, I cannot share the GitHub link for this project"
                    />
                </div>
                <div className="box-border min-h-min min-w-[100%] flex justify-center items-center">
                    <ProjectCard
                        title="Pondr"
                        dates="Jan 2024 - Apr 2024"
                        description={[
                            `Developed a discussion forum website with time tracking metrics to assess engagement and hot item tracking`,
                            `Implemented confidential information hashing with salts for account security and input sanitization to prevent SQL injection attacks`,
                            `Used JQuery to handling asynchronous POST requests to RESTFUL APIs written with PHP`,
                            `Deployed with PHP and MySQL on university-owned Linux RedHat Server`,
                            `Followed Agile Workflow principles such as Daily Standups, Scrum meetings, Sprints, and the use of a Kanban Board for coordination of project tasks`,
                        ]}
                        technologies={[
                            <Icon src={PHPIcon} />,
                            <Icon src={CSSIcon} />,
                            <Icon src={MySQLIcon} />,
                            <Icon src={JQueryIcon} />,
                            <Icon src={LinuxIcon} />,
                            <Icon src={ApacheIcon} />,
                            <Icon src={BootstrapIcon} />,
                        ]}
                        github="https://github.com/patrickma6199/Pondr"
                    />
                </div>
                <div className="box-border min-h-min min-w-[100%] flex justify-center items-center">
                    <ProjectCard
                        title="Food Ordering App Vertical Prototype"
                        dates="Sept 2023 - Dec 2023"
                        description={[
                            `Developed a food preordering app for a local food truck business using Android Studio and Java to allow student's with tight scheduled to order in advance`,
                            `Followed HCI(Human-Computer Interaction) principles in the front-end design of application pages to offer striking visual uniformity and instill confidence in potential users`,
                            `Integrated real-time updates of various app elements such as menu items and queue placements using a Firebase Realtime Database and pub/sub to allow for seamless asynchronous updates for wait times of orders`,
                        ]}
                        technologies={[
                            <Icon src={AndroidStudioIcon} />,
                            <Icon src={FirebaseIcon} />,
                            <Icon src={JavaIcon} />,
                            <Icon src={GradleIcon} />,
                        ]}
                        github="https://github.com/patrickma6199/oh_nat_foods_order"
                    />
                </div>
                <div className="box-border min-h-min min-w-[100%] flex justify-center items-center">
                    <ProjectCard
                        title="InstaQuiz Website"
                        dates="Jan 2023 - April 2023"
                        description={[
                            `Developed CSS front-end without component libraries to gain a better understanding of core fundamental concepts of front-end design`,
                            `Developed MySQL relational model to keep track of users, courses, and course quiz details`,
                            `Used PHP and SQL to develop the back-end implementations relating to account management security such as unique recovery tokens, and password hashing`,
                            `Deployed using Apache and MySQL Docker Containers to gain initial hands-on experience with containerization technology`,
                        ]}
                        technologies={[
                            <Icon src={CSSIcon} />,
                            <Icon src={DockerIcon} />,
                            <Icon src={PHPIcon} />,
                            <Icon src={MySQLIcon} />,
                            <Icon src={ApacheIcon} />,
                        ]}
                        github="https://github.com/UBCO-COSC-310-Winter-2022-T2/the-project-the-best-group"
                    />
                </div>
            </Slider>
            <div className="w-full h-20 rounded-full flex justify-around items-center md:mt-20">
                <Button
                    onClick={toggleAutoplay}
                    bgColor="bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                    icon={
                        autoplay ? (
                            <PauseIcon className="text-lg" />
                        ) : (
                            <PlayArrowIcon className="text-lg" />
                        )
                    }
                />
            </div>
        </div>
    );
};

export default Projects;
