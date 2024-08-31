import { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

function Navbar() {
    const { userDetails, logout } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogout = () => {
        logout();
    }

    return (
        <div className="navbar bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl text-gray-200 font-semibold">YourHR</h1>
                <div className="hidden md:flex gap-5 items-center">
                    {userDetails ? (
                        <div className="flex gap-5 items-center">
                            <Link to="/profile">
                                <FaUserCircle className="text-3xl text-gray-200 cursor-pointer" />
                            </Link>
                            <button className="text-gray-200 font-medium hover:text-blue-400 transition duration-300" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
                <button className="md:hidden text-gray-200" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 border-t border-gray-700">
                    <div className="max-w-7xl mx-auto px-8 py-4">
                        {userDetails ? (
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col items-end gap-4 w-full">
                                    <Link to="/profile" className="">
                                        <FaUserCircle className="text-3xl text-gray-200 cursor-pointer" />
                                    </Link>
                                    <button className="text-gray-200 font-medium hover:text-blue-400 transition duration-300" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
