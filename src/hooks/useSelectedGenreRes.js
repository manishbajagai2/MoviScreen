import useSwr from "swr"
import fetcher from "../libs/fetcher"
import { TMDB_API_KEY, TMDB_BASE_URL } from "../utils/constants"

const useSelectedGenreRes = (type,genre) => {
    const { data, error, isLoading } = useSwr(
        `${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genre}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )
    return {
        data,
        error,
        isLoading,
    }
}

export default useSelectedGenreRes
