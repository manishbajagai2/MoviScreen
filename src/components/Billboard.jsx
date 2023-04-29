/* eslint-disable react/prop-types */

import { FaPlay } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { TMDB_IMAGE_BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Billboard = ({ movie }) => {

    const navigate = useNavigate()

    const [show, setShow] = useState(true)
    const [fade, setFade] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
            setFade(true)
        }, 10000)
    }, [])

    const handlePlayer = () => {
        let obj = {}
        obj["movieId"]= movie?.id
        obj["movieType"] = movie?.media_type
        let details = JSON.stringify(obj)
        navigate(`/player/${details}`)
    }

    return (
        <div className="flex flex-col space-y-2 pt-28 md:pt-32 md:space-y-4 lg:h-[65vh] lg:justify-end">
            <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen opacity-20 md:opacity-30 lg:opacity-70 ">
                <img
                    src={`${TMDB_IMAGE_BASE_URL}${
                        movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt="Background Image"
                    className="object-cover w-screen h-auto bacImg"
                />
            </div>
            <h1
                className={`max-w-[90%] lg:max-w-xl text-2xl font-bold md:text-4xl lg:text-7xl pl-12  md:pl-16
                    ${
                        fade
                            ? "lg:pb-6 lg:text-[3em] transition duration-1000"
                            : ""
                    }`}
            >
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div
                className={`transition-all ${
                    fade ? "lg:opacity-0 " : "lg:opacity-100"
                } ${show ? "lg:block" : "lg:hidden"}`}
            >
                <p className="max-w-xs pb-3 text-xs text-shadow-md md:max-w-lg lg:max-w-2xl  md:text-lg lg:text-xl pl-12 md:pl-16">
                    {movie?.overview}
                </p>
            </div>
            <div className="flex space-x-3 pl-12 md:pl-16 lg:pt-2">
                <button
                    onClick={handlePlayer}
                    className="bannerButton bg-white text-black"
                >
                    <FaPlay className="h-4 w-4 text-black md:h-5 md:w-5" />
                    Play
                </button>

                <button
                    className="bannerButton bg-[gray]/70"
                    onClick={() => {}}
                >
                    <AiOutlineInfoCircle className="h-5 w-5 md:h-8 md:w-8" />{" "}
                    More Info
                </button>
            </div>
        </div>
    )
}
