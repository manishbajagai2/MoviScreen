/* eslint-disable react/prop-types */

import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import img1 from "../assets/images/default-blue.png"
import img2 from "../assets/images/default-red.png"
import img3 from "../assets/images/default-green.png"
import img4 from "../assets/images/default-slate.png"

const images = [img1, img2, img3, img4]

const UserCard = ({ name }) => {
    const imgSrc = images[Math.floor(Math.random() * 4)]

    return (
        <div className="group flex-row w-44 mx-auto">
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img
                    className="h-max object-contain"
                    src={imgSrc}
                    alt="Profile Images"
                />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {name}
            </div>
        </div>
    )
}

const Profiles = () => {
    const navigate = useNavigate()

    const selectProfile = useCallback(() => {
        navigate("/")
    }, [navigate])

    return (
        <div className="grid h-screen place-items-center">
            <div className="flex flex-col ">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Who&#39;s watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => selectProfile()} className="flex gap-5">
                        <UserCard name="Manish" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profiles
