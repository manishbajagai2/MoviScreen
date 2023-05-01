/* eslint-disable react/prop-types */

// import { DocumentData } from "firebase/firestore"
import useModalState from "../hooks/useModalState"
import useMovieState from "../hooks/useMovieState"

function Thumbnail({ movie }) {
    const { updateMovie } = useMovieState()
    const { show } = useModalState()

    return (
        <div
            className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
            onClick={() => {
                updateMovie(movie)
                show(true)
            }}
        >
            <img
                src={`https://image.tmdb.org/t/p/w500${
                    movie.backdrop_path || movie.poster_path
                }`}
                className="rounded-sm object-cover md:rounded"
                width={"100%"}
                height={"100%"}
            />
        </div>
    )
}

export default Thumbnail
