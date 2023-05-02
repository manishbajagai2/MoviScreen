import useSwr from "swr"
import fetcher from "../libs/fetcher"
import { TMDB_API_KEY, TMDB_BASE_URL } from "../utils/constants"

const useBillboardMovie = (type) => {
    const { data, error, isLoading } = useSwr(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${TMDB_API_KEY}`,
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

export default useBillboardMovie
