import Navbar from "../components/Navbar"

import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate()

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login")
    })

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default Home
