import React from 'react';
import {TypeAnimation} from 'react-type-animation';
import ContactIcon from '../misc/ContactIcon';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import {motion, useTransform} from 'framer-motion';
import {useScrollContext} from '../../contexts/ScrollContext';
import {useIsMobile} from '../../contexts/MobileContext';

const Profile: React.FC = () => {
  const {scrollYProgress} = useScrollContext();
  const isMobile = useIsMobile();

  const yTranslation = useTransform(scrollYProgress, [0, 0.4], [1000, 0]);

  return isMobile ? (
    <div className="w-screen min-h-min flex flex-col justify-center items-center p-4 overflow-x-hidden overflow-y-hidden relative z-10">
      <motion.img
        src="https://avatars.githubusercontent.com/u/77289918?s=820&v=4"
        alt="Patrick Ma"
        className="rounded-full w-full h-[90vw] mb-5 md:h-150 md:w-150 m-4 shadow-lg p-2 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple z-20 relative"
        viewport={{amount: 0.5}}
        whileInView="visible"
        variants={{
          hidden: {opacity: 0, x: 100},
          visible: {opacity: 1, x: 0},
        }}
        initial="hidden"
        loading="lazy"
      />
      <motion.div
        className="w-full flex flex-col gap-4 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-3xl shadow-lg"
        style={{y: yTranslation}}
      >
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
          className="text-xl font-bold py-2 px-4 my-8 -mb-3"
          speed={30}
        />
        <p className="text-md md:text-lg px-4 py-2 max-w-[100vw] md:max-w-[40vw]">
          Web Development, Machine Learning and Development Operations
        </p>
        <p className="text-xs md:text-sm px-4 py-2 max-w-[100vw] md:max-w-[40vw]">
          Recent Graduate (B.Sc.) of The University of British Columbia
          <br /> Majored in Computer Science and Minored in Data Science at{' '}
          <br />{' '}
          <b className="text-md">
            THE UNIVERSITY OF BRITISH COLUMBIA - 4.33/4.33 GPA
          </b>
        </p>
        <motion.div
          className="flex flex-row justify-center gap-1 items-center w-full md:gap-4"
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
              onClick={() => window.open('https://github.com/patrickma6199')}
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
              onClick={() => window.open('https://www.linkedin.com/in/tszhoma')}
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
              onClick={() => window.open('mailto:patrickma6199@gmail.com')}
            >
              <EmailIcon
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
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/files/Patrick_Ma_Resume.pdf';
                link.download = 'Patrick_Ma_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <ArticleRoundedIcon
                sx={{
                  fontSize: '3rem',
                  color: 'white',
                }}
              />
            </ContactIcon>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  ) : (
    <div className="min-w-[100%] flex flex-row justify-between items-center p-4 relative z-10">
      <motion.div
        className="p-2 flex flex-col gap-3 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple rounded-3xl shadow-lg"
        style={{y: yTranslation}}
      >
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
          className="text-2xl font-bold pt-2 px-4 my-6"
          speed={30}
        />
        <p className="text-lg px-4 pb-2 max-w-[40vw]">
          Web Development, Machine Learning and Development Operations
        </p>
        <p className="text-sm px-4 py-2 max-w-[40vw]">
          Recent Graduate (B.Sc.) of The University of British Columbia
          <br /> Majored in Computer Science and Minored in Data Science at{' '}
          <br />{' '}
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
              onClick={() => window.open('https://github.com/patrickma6199')}
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
              onClick={() => window.open('https://www.linkedin.com/in/tszhoma')}
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
              onClick={() => window.open('mailto:patrickma6199@gmail.com')}
            >
              <EmailIcon
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
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/files/Patrick_Ma_Resume.pdf';
                link.download = 'Patrick_Ma_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <ArticleRoundedIcon
                sx={{
                  fontSize: '3rem',
                  color: 'white',
                }}
              />
            </ContactIcon>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.img
        src="https://avatars.githubusercontent.com/u/77289918?s=820&v=4"
        alt="Patrick Ma"
        className="rounded-full h-150 w-150 m-4 shadow-lg p-2 bg-gradient-to-tr from-darker-blue via-light-blue to-light-purple z-20"
        viewport={{amount: 0.8}}
        whileInView="visible"
        variants={{
          hidden: {opacity: 0, x: 100},
          visible: {opacity: 1, x: 0},
        }}
        initial="hidden"
        loading="lazy"
      />
    </div>
  );
};

export default Profile;
