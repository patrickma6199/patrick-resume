import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';


const Profile: React.FC = () => {

    const animatedItems = useRef<HTMLElement[]>([]);

    useGSAP(() => {
        gsap.to(".animated-item", { x: 120, rotation: 360 });
        gsap.to(".animated-item", { x: -120, rotation: -360 });
        gsap.to(".animated-item", { y: -166 });
        }, [animatedItems]);

    return (
        <div className="min-w-[100%] flex flex-row align-center items-center p-4">
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold cursor-pointer rounded py-2 px-4">
                    <span className="animated-item m-1">
                        Hi, 
                    </span>
                    <span className="animated-item m-1">
                        I'm 
                    </span>
                    <span className="animated-item m-1">
                        Patrick 
                    </span>
                    <span className="animated-item m-1">
                        Ma. 
                    </span>
                </div>
                <p className="text-lg p-4 shadow-md rounded-lg bg-light-blue shadow-md rounded-lg">A passionate and knowledge-driven third-year Computer Science
                    student at the University of British Columbia Campus with experience in Object Oriented Programming,
                    Relational Databases, Web Development, Machine Learning, Data Structures, Data Analysis
                    and Visualization with Python, R and Tableau, University Teaching and in-person Customer Service.</p>
            </div>
            <img
                src="https://avatars.githubusercontent.com/u/77289918?s=820&v=4"
                alt="Patrick Ma"
                className="rounded-full h-150 w-150 m-4 shadow-lg"
            />
        </div>
    );
}

export default Profile;