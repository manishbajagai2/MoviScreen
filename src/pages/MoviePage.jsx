import { useState } from "react"
import Navbar from "../components/Navbar"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

const MoviePage = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState(undefined)
    console.log(user)

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid)
        else navigate("/login")
    })

    return (<Navbar />)
}

export default MoviePage
