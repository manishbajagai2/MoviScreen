import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Toaster } from "react-hot-toast"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"

import "./index.css"
import Profiles from "./pages/Profiles"

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/profiles" element={<Profiles />} />
                    <Route exact path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
