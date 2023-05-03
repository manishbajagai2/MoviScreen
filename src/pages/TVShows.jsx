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
import { tvRequests } from "../utils/constants"
import useGenres from "../hooks/useGenres"
import styled from "styled-components"
import { device } from "../utils/device"
import useSelectedGenreRes from "../hooks/useSelectedGenreRes"
import Thumbnail from "../components/Thumbnail"

function TVShows() {
    const { showModal } = useModalState()


    const urls = Object.values(tvRequests)
    const { data: tvValues } = useSwr(
        urls,
        (urls) => Promise.all(urls.map((url) => fetcher(url))),
        fetcher
    )
    const [rowMovies, setRowMovies] = useState([])
    useEffect(() => {
        if (tvValues) {
            setRowMovies(tvValues)
        }
    }, [tvValues])



    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (!currentUser) navigate("/login")
        })
    }, [navigate])



    const [initialtv, setInitialTv] = useState(true)
    const [tvGenre, setTvGenre] = useState([])
    const [selectedGenre, setSelectedGenre] = useState({})
    const [selectedGenreTv, setSelectedGenreTv] = useState(null)

    const { data: genresData } = useGenres("tv")
    useEffect(() => {
        if (!genresData) return
        if (genresData.genres) {
            setTvGenre([{ id: "", name: "Genre" }, ...genresData.genres])
        }
    }, [genresData])


    const { data: genreDataRes } = useSelectedGenreRes(
        "tv",
        selectedGenre.id
    )
    useEffect(() => {
        setSelectedGenreTv(genreDataRes)
    }, [genreDataRes])


    return (
        <div
            className={`relative h-screen ${
                showModal && "!h-screen overflow-hidden"
            }`}
        >
            <Navbar />
            <Select
                className="flex font-medium"
                onChange={(e) => {
                    setInitialTv(
                        e.target.options[e.target.selectedIndex].text ===
                            "Genre"
                            ? true
                            : false
                    )
                    setSelectedGenre({
                        id: e.target.value,
                        name: e.target.options[e.target.selectedIndex].text,
                    })
                }}
            >
                {tvGenre.map((genre) => {
                    return (
                        <option
                            value={genre.id}
                            name={genre.name}
                            key={genre.id}
                        >
                            {genre.name}
                        </option>
                    )
                })}
            </Select>
            {!initialtv && (
                <section className="px-4 pt-16 md:px-8 md:pt-20 lg:pt-28 font-bold text-gray-400">
                    <h1 className="mb-4 md:mb-6 lg:mb-10 text-xl md:text-2xl lg:text-3xl lg:font-semibold">
                        {selectedGenre.name} Movies
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:flex xl:flex-wrap gap-2">
                        {selectedGenreTv && (
                            <>
                                {selectedGenreTv.results.map((ele) => (
                                    <Thumbnail key={ele.id} movie={ele} />
                                ))}
                            </>
                        )}
                    </div>
                </section>
            )}
            {initialtv && (
                <>
                    <Billboard type={"tv"} />
                    <section className="md:space-y-24 mx-4 md:mx-10 mt-10 pb-24">
                        {rowMovies.length > 0 && (
                            <>
                                {Object.keys(tvRequests).map((ele, index) => (
                                    <Row
                                        key={index}
                                        title={ele}
                                        movies={rowMovies[index]?.results}
                                    />
                                ))}
                            </>
                        )}
                    </section>
                </>
            )}
            {showModal && <Modal />}
        </div>
    )
}

const Select = styled.select`
    margin: 4rem 1rem;
    position: absolute;
    right: 0;
    padding: 0.125rem;
    border: 1px solid gray;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    outline: none;
    @media ${device.tablet} {
        margin: 5rem 3rem;
        font-size: 1.25rem;
    }
    @media ${device.laptop} {
        margin: 7rem 3rem;
        font-size: 1.5rem;
        padding: 0.25rem;
    }
`

export default TVShows
