import React, {useEffect} from 'react';
import {TypeAnimation} from 'react-type-animation';
import ContactIcon from '../misc/ContactIcon';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {motion, useAnimation, useInView, useScroll} from 'framer-motion';

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
    return (
        <div className="min-w-[100%] flex flex-row justify-between items-center p-4 relative">
            <div className="flex flex-col gap-4">
                <TypeAnimation
                    cursor={true}
                    sequence={[
                        'Patrick (Tsz Ho) Ma',
                        1500,
                        'Aspiring Web Developer',
                        1500,
                        'Full-Stack Experienced',
                        1500,
                        'Aspiring Data Analyst',
                        1500,
                    ]}
                    wrapper="div"
                    repeat={Infinity}
                    className="text-2xl font-bold py-2 px-4 my-8"
                    speed={30}
                />
                <p className="text-lg px-4 py-2 max-w-[40vw]">
                    On the search for Internship and Junior Roles in
                    Full-Stack/Backend Web Development, Machine Learning and
                    Database Management. Open to any technical opportunities
                    with a love of learning how systems operate!
                </p>
                <p className="text-sm px-4 py-2 max-w-[40vw]">
                    4rd Year Undergraduate Student (BSc.) and Teaching Assistant{' '}
                    <br /> Majoring in Computer Science and Minoring in Data
                    Science at <br />{' '}
                    <b className="text-md">
                        THE UNIVERSITY OF BRITISH COLUMBIA - 4.33/4.33 GPA
                    </b>
                </p>
                <motion.div
                    className="flex flex-row justify-start gap-4 items-center"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {
                            opacity: 1,
                            transition: {staggerChildren: 0.5},
                        },
                    }}
                    initial="hidden"
                    viewport={{amount: 0.8}}
                    whileInView="visible"
                    transition={{duration: 1, ease: 'easeOut', delay: 1}}
                >
                    <motion.div
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        variants={{
                            hidden: {opacity: 0, y: -25},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <ContactIcon
                            rounded={true}
                            bgColor="bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                            onClick={() =>
                                window.open('https://github.com/patrickma6199')
                            }
                        >
                            <GitHubIcon
                                sx={{
                                    fontSize: '3rem',
                                    color: 'white',
                                }}
                            />
                        </ContactIcon>
                    </motion.div>
                    <motion.div
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.9}}
                        variants={{
                            hidden: {opacity: 0, y: -25},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <ContactIcon
                            rounded={true}
                            bgColor="bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                            onClick={() =>
                                window.open(
                                    'https://www.linkedin.com/in/tszhoma',
                                )
                            }
                        >
                            <LinkedInIcon
                                sx={{
                                    fontSize: '3rem',
                                    color: 'white',
                                }}
                            />
                        </ContactIcon>
                    </motion.div>
                    <motion.div
                        whileHover={{scale: 1.1, rotateY: 10}}
                        whileTap={{scale: 0.9}}
                        variants={{
                            hidden: {opacity: 0, y: -25},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <ContactIcon
                            rounded={true}
                            bgColor="bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                            onClick={() =>
                                window.open('mailto:patrickma6199@gmail.com')
                            }
                        >
                            <EmailIcon
                                sx={{
                                    fontSize: '3rem',
                                    color: 'white',
                                }}
                            />
                        </ContactIcon>
                    </motion.div>
                </motion.div>
            </div>
            <motion.img
                src="https://avatars.githubusercontent.com/u/77289918?s=820&v=4"
                alt="Patrick Ma"
                className="rounded-full h-150 w-150 m-4 shadow-lg p-2 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                viewport={{amount: 0.8}}
                whileInView="visible"
                variants={{
                    hidden: {opacity: 0, x: 100},
                    visible: {opacity: 1, x: 0},
                }}
                initial="hidden"
            />
        </div>
    );
};

export default Profile;
