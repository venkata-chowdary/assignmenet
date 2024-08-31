import { useContext, useEffect, useState } from "react"
import Navbar from "./Navbar"
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import HeroContainer from "./HeroContainer"
function Home() {
    const { userDetails } = useContext(UserContext)
    const [completeUserDetails, setCompleteUserDetails] = useState()

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
                    setCompleteUserDetails(response.data)
                    
                }
            })
    }, [userDetails])


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HeroContainer/>
        </div>

    )
}

export default Home
