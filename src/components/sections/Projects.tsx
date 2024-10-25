import React from 'react';
import ProjectCard from '../misc/ProjectCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/css/Projects.css';
import Slider, {Settings} from 'react-slick';

import AndroidStudioIcon from '../../assets/techStackLogos/android-studio.svg';
import CSSIcon from '../../assets/techStackLogos/css.svg';
import DockerIcon from '../../assets/techStackLogos/docker.svg';
import FirebaseIcon from '../../assets/techStackLogos/firebase.svg';
import JavaIcon from '../../assets/techStackLogos/java.svg';
import JavaScriptIcon from '../../assets/techStackLogos/js.svg';
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
import Icon from '../misc/iconWrapper';

const Projects: React.FC = () => {
    const projectCardSettings: Settings = {
        dots: true,
        infinite: true,
        autoplaySpeed: 5000,
        adaptiveHeight: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        pauseOnHover: true,
    };
    return (
        <div className="min-w-[90%] flex flex-col justify-center items-between p-4 relative">
            <Slider {...projectCardSettings}>
                <div className="min-w-min min-h-min">
                    <ProjectCard
                        title="Pondr"
                        dates="Jan 2024 - Apr 2024"
                        description={[
                            `Developed a discussion forum website with time tracking metrics to assess engagement and hot item tracking`,
                            `Implemented confidential informating hashing with salts for account security and input sanitization toprevent SQL injection attacks`,
                            `Used JQuery to handling asynchronous POST requests to RESTFUL APIs written with PHP`,
                            `Deployed with PHP and MySQL on university owned Linux RedHat Server`,
                            `Followed Agile Workflow principles such as Daily Standups, Scrum meetings, Sprints, and the use of a Kanban Board for coordination of project tasks`,
                        ]}
                        technologies={[
                            <Icon src={PHPIcon} />,
                            <Icon src={CSSIcon} />,
                            <Icon src={MySQLIcon} />,
                            <Icon src={JQueryIcon} />,
                            <Icon src={MySQLIcon} />,
                            <Icon src={LinuxIcon} />,
                            <Icon src={ApacheIcon} />,
                            <Icon src={BootstrapIcon} />,
                        ]}
                        github="https://github.com"
                        link="https://github.com"
                    />
                </div>
                <div className="min-w-min min-h-min">
                    <ProjectCard
                        title="Food Ordering App Vertical Prototype"
                        dates="Sept 2023 - Dec 2023"
                        description={[
                            `Developed a food preordering app for a local food truck business using Android Studio and Java`,
                            `Integrated HCI(Human-Computer Interaction) principles in the front-end design of application pages to offer striking visual uniformity and instill confidence in potential users`,
                            `Integrated real-time updates of various app elements using a Firebase Realtime Database to allow forseamless asynchronous updates for wait times of orders`,
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
                <div className="min-w-min min-h-min">
                    <ProjectCard
                        title="InstaQuiz Website"
                        dates="Jan 2023 - April 2023"
                        description={[
                            `Developed CSS front-end without component libraries to gain a better understanding of core fundamental concepts of front-end design`,
                            `Developed MySQL relational model to keep track of users, courses, and course quiz details to betterunderstand the components of relational queries and infrastructure`,
                            `Used PHP and SQL to develop the back-end implementations relating to account management securitysuch as unique recovery tokens, and confidential information hashing`,
                            `Deployed using Apache and MySQL Docker Containers to attain hands-on experience withcontainerization`,
                        ]}
                        technologies={[
                            <Icon src={CSSIcon} />,
                            <Icon src={DockerIcon} />,
                            <Icon src={PHPIcon} />,
                            <Icon src={MySQLIcon} />,
                            <Icon src={ApacheIcon} />,
                        ]}
                        github="https://github.com"
                        link="https://github.com"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default Projects;
