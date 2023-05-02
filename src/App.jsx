import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"

import "./index.css"
import Profiles from "./pages/Profiles"
import Player from "./pages/Player"
import TVShows from "./pages/TVShows"
import MoviePage from "./pages/MoviePage"
import UserListedMovies from "./pages/UserListedMovies"
import TestComp from "./components/TestComp"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/test" element={<TestComp />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/player/:id" element={<Player />} />
                    <Route exact path="/tv" element={<TVShows />} />
                    <Route exact path="/movies" element={<MoviePage />} />
                    <Route
                        exact
                        path="/mylist"
                        element={<UserListedMovies />}
                    />
                    <Route exact path="/profiles" element={<Profiles />} />
                    <Route exact path="/" element={<Home />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
