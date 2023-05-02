import Navbar from "../components/Navbar"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"
import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"
import useModalState from "../hooks/useModalState"
import Modal from "../components/Modal"
import useList from "../hooks/useList"
import Thumbnail from "../components/Thumbnail"

function UserListedMovies() {
    const { showModal } = useModalState()

    const [user, setUser] = useState(undefined)

    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) setUser(currentUser)
            else navigate("/login")
        })
    }, [navigate])

    const list = useList(user?.uid)

    const [listMovies, setListMovies] = useState([])

    useEffect(() => {
        if (list) {
            setListMovies(list)
        }
    }, [list])

    return (
        <div
            className={`relative h-screen ${
                showModal && "!h-screen overflow-hidden"
            }`}
        >
            <Navbar />
            <section className="pl-8 pt-16 md:pl-10 md:pt-20 lg:pt-28 font-bold text-gray-400">
                <h1 className="mb-4 md:mb-6 lg:mb-10 text-xl md:text-2xl lg:text-3xl lg:font-semibold">
                    My List
                </h1>
                <div className="flex flex-wrap gap-2">
                    {listMovies.length > 0 && (
                        <>
                            {listMovies.map((ele) => (
                                <Thumbnail key={ele.id} movie={ele} />
                            ))}
                        </>
                    )}
                </div>
            </section>
            {showModal && <Modal />}
        </div>
    )
}

export default UserListedMovies
