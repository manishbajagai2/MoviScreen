export const TMDB_API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY
export const TMDB_BASE_URL = "https://api.themoviedb.org/3"
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/"

export const requests = {
    trendingNow: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_networks=213`,
    topRated: `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`,
    animation: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=16`,
    actionMovies: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=28`,
    comedyMovies: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=35`,
    horrorMovies: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=27`,
    romanceMovies: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=10749`,
    documentaries: `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=99`,
}