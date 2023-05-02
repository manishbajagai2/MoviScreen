import Navbar from "../components/Navbar"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import { Billboard } from "../components/Billboard"
import useSwr from "swr"
import fetcher from "../libs/fetcher"

import Row from "../components/Row"
import useModalState from "../hooks/useModalState"
import Modal from "../components/Modal"
import { movieRequests } from "../utils/constants"

function MoviePage() {
    const { showModal } = useModalState()

    const urls = Object.values(movieRequests)
    const { data: movieValues } = useSwr(
        urls,
        (urls) => Promise.all(urls.map((url) => fetcher(url))),
        fetcher
    )

    const [rowMovies, setRowMovies] = useState([])

    useEffect(() => {
        if (movieValues) {
            setRowMovies(movieValues)
        }
    }, [movieValues])

    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/login")
        })
    }, [navigate])

    return (
        <div
            className={`relative h-screen ${
                showModal && "!h-screen overflow-hidden"
            }`}
        >
            <Navbar />
            <Billboard type={"movie"} />
            <section className="md:space-y-24 mx-4 md:mx-10 mt-10 pb-24">
                {rowMovies.length > 0 && (
                    <>
                        {Object.keys(movieRequests).map((ele, index) => (
                            <Row
                                key={index}
                                title={ele}
                                movies={rowMovies[index]?.results}
                            />
                        ))}
                    </>
                )}
            </section>
            {showModal && <Modal />}
        </div>
    )
}

export default MoviePage
