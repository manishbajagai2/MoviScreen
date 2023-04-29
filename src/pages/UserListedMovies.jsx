/* eslint-disable react/prop-types */

import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { firebaseAuth } from "../utils/firebase-config"
import Navbar from "../components/Navbar"
export default function UserListedMovies() {

    const navigate = useNavigate()
    const [user, setUser] = useState(undefined)
    console.log(user)

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setUser(currentUser.uid)
        else navigate("/login")
    })

    return (<Navbar />)
}