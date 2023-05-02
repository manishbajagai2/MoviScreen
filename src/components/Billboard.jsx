/* eslint-disable react/prop-types */

import { FaPlay } from "react-icons/fa"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { TMDB_IMAGE_BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useMovieState from "../hooks/useMovieState"
import useModalState from "../hooks/useModalState"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import useBillboardMovie from "../hooks/useBillboardMovie"

export const Billboard = ({type}) => {
    const { data } = useBillboardMovie(type)

    const navigate = useNavigate()

    const [randMovie, setRandMovie] = useState({})


    useEffect(() => {
        if (data) {
            let obj =
                data.results[Math.floor(Math.random() * data.results.length)]
            setRandMovie(obj)
        }
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/login")
        })
    }, [data, navigate])

    const { updateMovie } = useMovieState()
    const { show } = useModalState()

    const [showBlock, setShowBlock] = useState(true)
    const [fade, setFade] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShowBlock(false)
            setFade(true)
        }, 10000)
    }, [])

    const handlePlayer = () => {
        let obj = {}
        obj["movieId"] = randMovie?.id
        obj["movieType"] = randMovie?.media_type
        let details = JSON.stringify(obj)
        navigate(`/player/${details}`)
    }

    return (
        <div className="flex flex-col space-y-2 pt-28 md:pt-32 md:space-y-4 lg:h-[65vh] lg:justify-end">
            <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen opacity-20 md:opacity-30 lg:opacity-70 ">
                <img
                    src={`${TMDB_IMAGE_BASE_URL}${
                        randMovie?.backdrop_path || randMovie?.poster_path
                    }`}
                    alt="Background Image"
                    className="object-cover w-screen h-auto bacImg"
                />
            </div>
            <h1
                className={`max-w-[90%] lg:max-w-xl text-2xl font-bold md:text-4xl lg:text-7xl px-4  md:px-8
                    ${
                        fade
                            ? "lg:pb-6 lg:text-[3em] transition duration-1000"
                            : ""
                    }`}
            >
                {randMovie?.title ||
                    randMovie?.name ||
                    randMovie?.original_name}
            </h1>
            <div
                className={`transition-all ${
                    fade ? "lg:opacity-0 " : "lg:opacity-100"
                } ${showBlock ? "lg:block" : "lg:hidden"}`}
            >
                <p className="max-w-xs text-xs text-shadow-md md:max-w-lg lg:max-w-2xl  md:text-lg lg:text-xl px-4 md:px-8 line-clamp-4">
                    {randMovie?.overview}
                </p>
            </div>
            <div className="flex space-x-3 px-4 md:px-8 lg:pt-2">
                <button
                    onClick={handlePlayer}
                    className="bannerButton bg-white text-black"
                >
                    <FaPlay className="h-4 w-4 text-black md:h-5 md:w-5" />
                    Play
                </button>

                <button
                    className="bannerButton bg-[gray]/70"
                    onClick={() => {
                        updateMovie(randMovie)
                        show(true)
                    }}
                >
                    <AiOutlineInfoCircle className="h-5 w-5 md:h-8 md:w-8" />{" "}
                    More Info
                </button>
            </div>
        </div>
    )
}
