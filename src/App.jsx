import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"

import "./index.css"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
