import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import ProjectCard from '../ProjectCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Projects: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="min-w-[100%] flex flex-col justify-center items-between p-4 relative">
            {/* <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                direction={'horizontal'}
                loop={true}
                navigation={true}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="w-full"
            > */}

            <SwiperSlide className="min-w-min min-h-min">
                <ProjectCard
                    title="Food Ordering App Vertical Prototype"
                    dates="Sept 2023 - Dec 2023"
                    description={`● Developed a food preordering app for a local food truck business using Android Studio and Java
                            ● Integrated HCI(Human-Computer Interaction) principles in the front-end design of application pages to offer striking visual uniformity and instill confidence in potential users
                            ● Integrated real-time updates of various app elements using a Firebase Realtime Database to allow forseamless asynchronous updates for wait times of orders`}
                    technologies={['React', 'TypeScript', 'TailwindCSS']}
                    github="https://github.com"
                    link="https://github.com"
                />
            </SwiperSlide>
            <SwiperSlide className="min-w-min min-h-min">
                <ProjectCard
                    title="InstaQuiz Website"
                    dates="Jan 2023 - April 2023"
                    description={`● Developed CSS front-end without component libraries to gain a better understanding of core fundamentalconcepts of front-end design
                            ● Developed MySQL relational model to keep track of users, courses, and course quiz details to betterunderstand the components of relational queries and infrastructure
                            ● Used PHP and SQL to develop the back-end implementations relating to account management securitysuch as unique recovery tokens, and confidential information hashing
                            ● Deployed using Apache and MySQL Docker Containers to attain hands-on experience withcontainerization`}
                    technologies={['React', 'TypeScript', 'TailwindCSS']}
                    github="https://github.com"
                    link="https://github.com"
                />
            </SwiperSlide>
            <SwiperSlide className="min-w-min min-h-min">
                <ProjectCard
                    title="Project 3"
                    dates="Jan 1970 - April 1970"
                    description="This is a project description"
                    technologies={['React', 'TypeScript', 'TailwindCSS']}
                    github="https://github.com"
                    link="https://github.com"
                />
            </SwiperSlide>
            <SwiperSlide className="min-w-min min-h-min">
                <ProjectCard
                    title="Project 4"
                    dates="Jan 1970 - April 1970"
                    description="This is a project description"
                    technologies={['React', 'TypeScript', 'TailwindCSS']}
                    github="https://github.com"
                    link="https://github.com"
                />
            </SwiperSlide>
            <SwiperSlide className="min-w-min min-h-min">
                <ProjectCard
                    title="Project 5"
                    dates="Jan 1970 - April 1970"
                    description="This is a project description"
                    technologies={['React', 'TypeScript', 'TailwindCSS']}
                    github="https://github.com"
                    link="https://github.com"
                />
            </SwiperSlide>
            {/* </Swiper> */}
        </div>
    );
};

export default Projects;
