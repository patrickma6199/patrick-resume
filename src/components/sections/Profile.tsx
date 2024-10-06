import React, { useEffect, useState } from 'react';


const Profile: React.FC = () => {

    useEffect(() => {
        scroll();
    }, []);

    return (
        <div className="min-w-[100%] flex flex-row align-center items-center p-4">
            
            <p className="text-lg p-4 shadow-md rounded-lg bg-light-blue shadow-md rounded-lg">A passionate and knowledge-driven third-year Computer Science
                student at the University of British Columbia Campus with experience in Object Oriented Programming,
                Relational Databases, Web Development, Machine Learning, Data Structures, Data Analysis
                and Visualization with Python, R and Tableau, University Teaching and in-person Customer Service.</p>
            <img
                src="https://avatars.githubusercontent.com/u/77289918?s=820&v=4"
                alt="Patrick Ma"
                className="rounded-full h-150 w-150 m-4 shadow-md"
            />
        </div>
    );
}

export default Profile;