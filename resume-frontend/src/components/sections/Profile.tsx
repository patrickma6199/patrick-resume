import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ContactIcon from '../ContactIcon';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion, useAnimation, useInView, useScroll, useMotionValueEvent } from "framer-motion"

const Profile: React.FC = () => {

    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, {
        margin: '90% 0px 0px 0px', //TODO: Fix to be true only when 90% of the element is in view
    });
    const mainControlsIcons = useAnimation();
    const { scrollYProgress } = useScroll({ //TODO: make this work for the image and maybe icons too
        target: containerRef,
        offset: ["start end", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log('Value:', latest);
    })

    // const profileImageXValue = useTransform(scrollYProgress, [0, 1], ["10rem", "0rem"]);
    // const profileImageOpacityValue = useTransform(scrollYProgress, [0, 1], ["0", "1"]);

    useEffect(() => {
        if (isInView) {
            mainControlsIcons.start('visible');
        }
    }, [isInView]);

    //TODO: REMOVE
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (value) => {
            console.log('Value:', value);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <div className="min-w-[100%] flex flex-row justify-between items-center p-4 relative" ref={containerRef}>
            <div className="flex flex-col gap-4">
                <TypeAnimation
                    cursor={true}
                    sequence={[
                        "Patrick (Tsz Ho) Ma",
                        1500,
                        "Aspiring Web Developer",
                        1500,
                        "Full-Stack Experienced",
                        1500,
                        "Aspiring Data Analyst",
                        1500,
                    ]}
                    wrapper="div"
                    repeat={Infinity}
                    className="text-2xl font-bold py-2 px-4 my-8 rounded-lg"
                    speed={30}
                />
                <p className="text-lg p-4 max-w-[40vw]">A passionate and knowledge-driven fourth-year Computer Science
                    student at the University of British Columbia Campus with experience in Object Oriented Programming,
                    Relational Databases, Web Development, Machine Learning, Data Structures, Data Analysis
                    and Visualization with Python, R and Tableau, University Teaching and in-person Customer Service.</p>
                <motion.div
                    className="flex flex-row justify-start gap-4 items-center"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.5 } }
                    }}
                    initial='hidden'
                    animate={mainControlsIcons}
                    transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
                >   
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        variants={{
                            hidden: { opacity: 0, y: -25 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <ContactIcon
                            rounded={true}
                            bgColor="bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                            onClick={() => window.open("https://github.com/patrickma6199")}
                        >
                            <GitHubIcon
                                sx={{
                                    fontSize: "3rem",
                                    color: "white",
                                }} />
                        </ContactIcon>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        variants={{
                            hidden: { opacity: 0, y: -25 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <ContactIcon
                            rounded={true}
                            bgColor="bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                            onClick={() => window.open("https://www.linkedin.com/in/tszhoma")}
                        >
                            <LinkedInIcon
                                sx={{
                                    fontSize: "3rem",
                                    color: "white",
                                }} />
                        </ContactIcon>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        variants={{
                            hidden: { opacity: 0, y: -25 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <ContactIcon
                            rounded={true}
                            bgColor="bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                            onClick={() => window.open("mailto:patrickma6199@gmail.com")}
                        >
                            <EmailIcon
                                sx={{
                                    fontSize: "3rem",
                                    color: "white",
                                }} />
                        </ContactIcon>
                    </motion.div>
                </motion.div>
            </div>
            <motion.img
                src="https://avatars.githubusercontent.com/u/77289918?s=820&v=4"
                alt="Patrick Ma"
                className="rounded-full h-150 w-150 m-4 shadow-lg p-2 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple"
                variants={{
                    hidden: { opacity: 0, x: 100 },
                    visible: { opacity: 1, x: 0 }
                }}
                initial='hidden'
                animate={mainControlsIcons}
            />
        </div>
    );
}

export default Profile;