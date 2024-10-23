import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';
import 'swiper/css';
import ProjectCard from '../ProjectCard';

const Projects: React.FC = () => {
    return (
        <div className="min-w-[100%] flex flex-col justify-center items-between p-4 relative">
            <p className="text-2xl font-bold">Projects</p>
            <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={50}
                direction={'horizontal'}
                loop={true}
                centeredSlides={true}
                slidesPerView={3}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                className="w-full"
            >
                <SwiperSlide className="min-w-min min-h-min">
                    <ProjectCard
                        title="Project 1"
                        description="This is a project description"
                        technologies={['React', 'TypeScript', 'TailwindCSS']}
                        github="https://github.com"
                        link="https://github.com"
                    />
                </SwiperSlide>
                <SwiperSlide className="min-w-min min-h-min">
                    <ProjectCard
                        title="Project 2"
                        description="This is a project description"
                        technologies={['React', 'TypeScript', 'TailwindCSS']}
                        github="https://github.com"
                        link="https://github.com"
                    />
                </SwiperSlide>
                <SwiperSlide className="min-w-min min-h-min">
                    <ProjectCard
                        title="Project 3"
                        description="This is a project description"
                        technologies={['React', 'TypeScript', 'TailwindCSS']}
                        github="https://github.com"
                        link="https://github.com"
                    />
                </SwiperSlide>
                <SwiperSlide className="min-w-min min-h-min">
                    <ProjectCard
                        title="Project 4"
                        description="This is a project description"
                        technologies={['React', 'TypeScript', 'TailwindCSS']}
                        github="https://github.com"
                        link="https://github.com"
                    />
                </SwiperSlide>
                <SwiperSlide className="min-w-min min-h-min">
                    <ProjectCard
                        title="Project 5"
                        description="This is a project description"
                        technologies={['React', 'TypeScript', 'TailwindCSS']}
                        github="https://github.com"
                        link="https://github.com"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Projects;
