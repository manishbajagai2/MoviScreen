import { useEffect, useState } from "react"
import ReactPlayer from "react-player/youtube"
import { FaPlay } from "react-icons/fa"
import { HiOutlineThumbUp } from "react-icons/hi"
import { RxCross2 } from "react-icons/rx"
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs"
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai"
import MuiModal from "@mui/material/Modal"
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
} from "firebase/firestore"
import toast, { Toaster } from "react-hot-toast"
import useModalState from "../hooks/useModalState"
import useMovieState from "../hooks/useMovieState"
import { TMDB_API_KEY } from "../utils/constants"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { db, firebaseAuth } from "../utils/firebase-config"

function Modal() {
    const [trailer, setTrailer] = useState("")
    const [muted, setMuted] = useState(true)
    const [genres, setGenres] = useState([])

    const navigate = useNavigate()
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setUser(currentUser)
            else navigate("/login")
        })
    }, [navigate])

    const [addedToList, setAddedToList] = useState(false)
    const [movies, setMovies] = useState([])
    const { showModal, hide } = useModalState()
    const { movie, updateMovie } = useMovieState()

    const toastStyle = {
        background: "white",
        color: "black",
        fontWeight: "bold",
        fontSize: "16px",
        padding: "15px",
        borderRadius: "9999px",
        maxWidth: "1000px",
    }

    useEffect(() => {
        if (!movie) return

        async function fetchMovie() {
            const data = await fetch(
                `https://api.themoviedb.org/3/${
                    movie?.media_type === "tv" ? "tv" : "movie"
                }/${
                    movie?.id
                }?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=videos`
            ).then((response) => response.json())
            if (data?.videos) {
                const index = data.videos.results.findIndex(
                    (element) => element.type === "Trailer"
                )
                setTrailer(data.videos?.results[index]?.key)
            }
            if (data?.genres) {
                setGenres(data.genres)
            }
        }

        fetchMovie()
    }, [movie])

    const handleClose = () => {
        hide()
        updateMovie(null)
        toast.dismiss()
    }

    // Find all the movies in the user's list
    useEffect(() => {
        if (user) {
            return onSnapshot(
                collection(db, "customers", user.uid, "myList"),
                (snapshot) => setMovies(snapshot.docs)
            )
        }
    }, [movie?.id, user])

    // Check if the movie is already in the user's list
    useEffect(
        () =>
            setAddedToList(
                movies.findIndex((result) => result.data().id === movie?.id) !==
                    -1
            ),
        [movies, movie?.id]
    )

    const handleList = async () => {
        if (addedToList) {
            await deleteDoc(
                doc(db, "customers", user?.uid, "myList", movie?.id.toString())
            )

            toast(
                `${
                    movie?.title || movie?.original_name
                } has been removed from My List`,
                {
                    duration: 8000,
                    style: toastStyle,
                }
            )
        } else {
            await setDoc(
                doc(db, "customers", user?.uid, "myList", movie?.id.toString()),
                {
                    ...movie,
                }
            )

            toast(
                `${
                    movie?.title || movie?.original_name
                } has been added to My List.`,
                {
                    duration: 8000,
                    style: toastStyle,
                }
            )
        }
    }

    const handlePlayer = () => {
        if (trailer) {
            let obj = {}
            obj["movieId"] = trailer
            let details = JSON.stringify(obj)
            navigate(`/player/${details}`)
        }
    }

    return (
        <MuiModal
            open={showModal}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-4xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
            <>
                <Toaster position="bottom-center" />
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <RxCross2 className="h-6 w-6" />
                </button>

                <div className="relative pt-[56.25%] bg-black">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: "0", left: "0" }}
                        playing
                        loop
                        muted={muted}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0 },
                            },
                        }}
                    />
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-4">
                            <button
                                className="bannerButton flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                                onClick={handlePlayer}
                            >
                                <FaPlay className="h-4 w-4 text-black md:h-5 md:w-5" />
                                Play
                            </button>
                            <button
                                className="modalButton"
                                onClick={handleList}
                            >
                                {addedToList ? (
                                    <AiOutlineCheck className="h-7 w-7" />
                                ) : (
                                    <AiOutlinePlus className="h-7 w-7" />
                                )}
                            </button>
                            <button className="modalButton">
                                <HiOutlineThumbUp className="h-6 w-6" />
                            </button>
                        </div>
                        <button
                            className="modalButton"
                            onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                                <BsVolumeMute className="h-6 w-6" />
                            ) : (
                                <BsVolumeUp className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-400">
                                {Math.round(movie.vote_average * 10)}% Match
                            </p>
                            <p className="font-light">
                                {movie?.release_date || movie?.first_air_date}
                            </p>
                            <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                                HD
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6">{movie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                                <div>
                                    <span className="text-[gray]">Genres:</span>{" "}
                                    {genres
                                        .map((genre) => genre.name)
                                        .join(", ")}
                                </div>

                                <div>
                                    <span className="text-[gray]">
                                        Original language:
                                    </span>{" "}
                                    {movie?.original_language}
                                </div>

                                <div>
                                    <span className="text-[gray]">
                                        Total votes:
                                    </span>{" "}
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal
