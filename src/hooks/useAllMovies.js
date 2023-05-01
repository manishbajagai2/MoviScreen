import useSwr from "swr"
import fetcher from "../libs/fetcher"
import { requests } from "../utils/constants"


export default function useAllMovies() {
    const urls = Object.values(requests)
    const { data: movieValues } = useSwr(
        urls,
        (urls) => Promise.all(urls.map((url) => fetcher(url))),
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )
    return movieValues
}
