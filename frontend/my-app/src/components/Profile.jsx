import React, { useContext, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function ProfileCard() {
    const [profileData, setProfileData] = useState({});
    const { userDetails } = useContext(UserContext);

    const config = {
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + userDetails.token,
        }
    };

    useEffect(() => {
        axios.get('http://localhost:4000/api/user/getdetails', config)
            .then((response) => {
                if (response.status === 200) {
                    setProfileData(response.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userDetails]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="max-w-sm bg-gray-800 shadow-lg rounded-lg overflow-hidden py-6 px-4 relative">
                <Link to="/" className="absolute top-6 left-6 text-gray-200">
                    <IoMdArrowRoundBack size={24} />
                </Link>
                <div className="flex justify-center mb-4">
                    <img
                        className="w-24 h-24 object-cover rounded-full border-4 border-gray-700 shadow-lg"
                        src="https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg"
                        alt="User avatar"
                    />
                </div>

                <h2 className="text-xl font-bold text-gray-100 text-center">{profileData.name || "Chowdary Immanni"}</h2>
                <p className="text-sm text-gray-300 text-center mb-4">{profileData.email || "chowdaryimmanni@gmail.com"}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-200">Address</h4>
                        <p className="text-gray-400">{profileData.address || "Not provided"}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-200">Phone</h4>
                        <p className="text-gray-400">{profileData.phone || "Not provided"}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-200">DOB</h4>
                        <p className="text-gray-400">{profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : "Not provided"}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-200">Gender</h4>
                        <p className="text-gray-400">{profileData.gender || "Not provided"}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-200">Skills</h4>
                        <p className="text-gray-400">{profileData.skills.join(', ') || "Not provided"}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg">
                        <h4 className="text-md font-semibold text-gray-200">Resume</h4>
                        <a href={profileData.resume} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">View Resume</a>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mt-4">
                    <a href={profileData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                        <FaLinkedin size={24} />
                    </a>
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-gray-400">
                        <FaGithub size={24} />
                    </a>
                </div>

                <div className="flex justify-center mt-6">
                    <button className="bg-red-500 text-white px-6 py-2 rounded-full">Logout</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
