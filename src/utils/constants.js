export const TMDB_API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY
export const TMDB_BASE_URL = "https://api.themoviedb.org/3"
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/"

export const requests = {
    "Trending Now": `${TMDB_BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}&with_networks=213`,
    "Top Rated": `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
    Animation: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=16`,
    "Action Thrillers": `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=28`,
    Comedies: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=35`,
    "Scary Movies": `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=27`,
    "Romance Movies": `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=10749`,
    Documentaries: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=99`,
}

export const movieRequests = {
    "Trending Now": `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&with_networks=213`,
    "Top Rated": `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
    "Popular on MoviScreen": `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&with_genres=16`,
    "Critically Acclaimed Movies": `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&with_genres=27`,
    Upcoming: `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&with_genres=35`,
}

export const tvRequests = {
    "Trending Now": `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&with_networks=213`,
    Animation: `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=en-US&with_genres=16`,
    "Top Rated": `${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
    "Popular on MoviScreen": `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&with_genres=16`,
    "Airing today": `${TMDB_BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=en-US&with_genres=35`,
}