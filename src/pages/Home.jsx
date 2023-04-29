import Navbar from "../components/Navbar"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import useBillboard from "../hooks/useBillboard"
import { Billboard } from "../components/Billboard"


function Home() {
    const [randomMov, setrandomMov] = useState({})
    const { data } = useBillboard()

    const navigate = useNavigate()
    useEffect(() => {
        if (data) {
            let obj =
                data.results[Math.floor(Math.random() * data.results.length)]
            // const url = `https://image.tmdb.org/t/p/original/${obj?.backdrop_path || obj?.poster_path}`
            setrandomMov(obj)
        }
    }, [data])

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login")
    })


    return (
        <div className="relative h-screen w-screen">
            <Navbar />
            <Billboard movie={randomMov} />
        </div>
    )
}

export default Home
