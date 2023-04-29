import Navbar from "../components/Navbar"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { fetchMovies, getGenres } from "../store"
import useBillboard from "../hooks/useBillboard"
import { Billboard } from "../components/Billboard"


function Home() {
    const [randomMov, setrandomMov] = useState({})
    const { data } = useBillboard()

    useEffect(() => {
        if (data) {
            let obj =
                data.results[Math.floor(Math.random() * data.results.length)]
            // const url = `https://image.tmdb.org/t/p/original/${obj?.backdrop_path || obj?.poster_path}`
            setrandomMov(obj)
        }
    }, [data])


    const navigate = useNavigate()

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login")
    })

    // const movies = useSelector((state) => state.netflix.movies)
    // console.log(movies)

    return (
        <div className="relative h-screen w-screen">
            <Navbar />
            <Billboard movie={randomMov} />
            {/* <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                }}
                playing
                muted={true}
            /> */}
        </div>
    )
}

export default Home
