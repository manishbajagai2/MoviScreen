import { create } from "zustand"

const useMovieState = create((set) => ({
    movie: null,
    updateMovie: (newMovie) => set(() => ({ movie: newMovie })),
}))

export default useMovieState
