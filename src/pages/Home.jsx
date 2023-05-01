import Navbar from "../components/Navbar"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import useBillboard from "../hooks/useBillboard"
import { Billboard } from "../components/Billboard"
// import useAllMovies from "../hooks/useAllMovies"
import { requests } from "../utils/constants"
import useSwr from "swr"
import fetcher from "../libs/fetcher"

import Row from "../components/Row"
import useModalState from "../hooks/useModalState"
import Modal from "../components/Modal"

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
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/login")
        })
    }, [data, navigate])

    return (
        <div
            className={`relative h-screen ${
                showModal && "!h-screen overflow-hidden"
            }`}
        >
            <Navbar />
            <Billboard movie={randomMov} />
            <section className="md:space-y-24 mx-4 md:mx-10 mt-10 pb-24">
                {rowMovies.length > 0 && (
                    <>
                        <Row
                            title="Trending Now"
                            movies={rowMovies[0]?.results}
                        />
                        <Row title="Top Rated" movies={rowMovies[1]?.results} />
                        <Row title="Animation" movies={rowMovies[2]?.results} />
                        <Row
                            title="Action Thrillers"
                            movies={rowMovies[3]?.results}
                        />
                        {/* My List */}
                        {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

                        <Row title="Comedies" movies={rowMovies[4]?.results} />
                        <Row
                            title="Scary Movies"
                            movies={rowMovies[5]?.results}
                        />
                        <Row
                            title="Romance Movies"
                            movies={rowMovies[6]?.results}
                        />
                        <Row
                            title="Documentaries"
                            movies={rowMovies[7]?.results}
                        />
                    </>
                )}
            </section>
            {showModal && <Modal />}
        </div>
    )
}

export default Home
