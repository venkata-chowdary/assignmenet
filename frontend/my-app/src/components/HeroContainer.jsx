import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

function HeroContainer() {
    const { userDetails } = useContext(UserContext);
    const [resume, setResume] = useState('');

    const config = {
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + userDetails.token,
        },
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/user/getdetails', config)
            .then((response) => {
                if (response.status === 200) {
                    setResume(response.data.resume);
                }
            });
    }, [userDetails]);

    return (
        <div className="min-h-screen bg-gray-900 ">
            <div className="w-full flex flex-col items-start justify-center p-6">
                <h1 className="text-2xl md:text-6xl font-bold text-gray-300">
                    Hello, 
                    <br></br>{userDetails.name.charAt(0).toUpperCase() + userDetails.name.slice(1)}
                </h1>
                <p className="mt-4 text-xl text-gray-400">
                    Welcome to yourHR.
                </p>
            </div>
        </div>
    );
}

export default HeroContainer;
