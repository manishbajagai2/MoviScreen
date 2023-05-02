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
import { requests } from "../utils/constants"

function Home() {
    const { showModal } = useModalState()



    const urls = Object.values(requests)
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
            <Billboard type={"all"} />
            <section className="md:space-y-24 mx-4 md:mx-10 mt-10 pb-24">
                {rowMovies.length > 0 && (
                    <>
                        {Object.keys(requests)
                            .slice(0, 4)
                            .map((ele, index) => (
                                <Row
                                    key={index + 10 * 2}
                                    title={ele}
                                    movies={rowMovies[index]?.results}
                                />
                            ))}
                        {/* My List */}
                        {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

                        {Object.keys(requests)
                            .slice(5)
                            .map((ele, index) => (
                                <Row
                                    key={index + 10 * 2}
                                    title={ele}
                                    movies={rowMovies[index + 5]?.results}
                                />
                            ))}
                    </>
                )}
            </section>
            {showModal && <Modal />}
        </div>
    )
}

export default Home
