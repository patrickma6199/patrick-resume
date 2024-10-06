import React, { useEffect, useState } from 'react';


const Awards: React.FC = () => {

    useEffect(() => {
        scroll();
    }, []);

    return (
        <div className="min-w-[100%] flex flex-row align-center items-center">
            <p className="text-2xl font-bold">Awards</p>
        </div>
    );
}

export default Awards;