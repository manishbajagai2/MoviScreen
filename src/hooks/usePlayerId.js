import useSwr from "swr"
import fetcher from "../libs/fetcher"
import { TMDB_API_KEY, TMDB_BASE_URL } from "../utils/constants"

function usePlayerId(id) {
    const { movieId, movieType } = JSON.parse(id)
    const { data, error, isLoading } = useSwr(
        `${TMDB_BASE_URL}/${movieType}/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`,
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
export default usePlayerId
