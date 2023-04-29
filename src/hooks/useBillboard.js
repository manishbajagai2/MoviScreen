import useSwr from "swr"
import fetcher from "../libs/fetcher"
import { TMDB_API_KEY } from "../utils/constants"

const useBillboard = () => {
    const { data, error, isLoading } = useSwr(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_API_KEY}`,
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

export default useBillboard
