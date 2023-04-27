/* eslint-disable react/prop-types */

import { onAuthStateChanged } from "firebase/auth"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { firebaseAuth } from "../utils/firebase-config"

const UserCard = ({ username, photoUrl }) => {
    return (
        <div className="group flex-row w-44 mx-auto">
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                    className="h-max object-contain"
                    src={photoUrl}
                    alt="Profile Images"
                />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white group-hover:underline cursor-pointer">
                {username}
            </div>
        </div>
    )
}

const Profiles = () => {
    const navigate = useNavigate()

    const selectProfile = useCallback(() => {
        navigate("/")
    }, [navigate])

    const [username, setUsername] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            setTimeout(() => {
                if (currentUser) {
                    setUsername(currentUser.displayName)
                    setPhotoUrl(currentUser.photoURL)
                }
            }, 1000)
        })
    }, [])

    return (
        <div className="grid h-screen place-items-center">
            <div className="flex flex-col ">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Who&#39;s watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => selectProfile()} className="flex gap-5">
                        <UserCard username={username} photoUrl={photoUrl} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profiles
