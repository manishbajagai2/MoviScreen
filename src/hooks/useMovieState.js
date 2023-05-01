import { create } from "zustand"

const useMovieState = create((set) => ({
    movie: "Hi Bro",
    updateMovie: (newMovie) => set(() => ({ movie: newMovie })),
}))

export default useMovieState
