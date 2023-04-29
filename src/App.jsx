import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Toaster } from "react-hot-toast"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"

import "./index.css"
import Profiles from "./pages/Profiles"
import Player from "./pages/Player"
import TVShows from "./pages/TVShows"
import { MoviePage } from "./pages/MoviePage"

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/player" element={<Player />} />
                    <Route exact path="/tv" element={<TVShows />} />
                    <Route exact path="/movies" element={<MoviePage />} />
                    <Route exact path="/new" element={<Player />} />
                    <Route exact path="/profiles" element={<Profiles />} />
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
