/* eslint-disable react/prop-types */
import logo from "../assets/logo.png"

import { useCallback, useEffect, useRef, useState } from "react"

import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs"

import AccountMenu from "./AccountMenu"
import MobileMenu from "./MobileMenu"
import { navitems } from "../utils/navitems"
import { NavLink, useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"

const TOP_OFFSET = 66

const Navbar = () => {
    const [isOpenAccountMenu, setIsOpenAccountMenu] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    const [showSearch, setShowSearch] = useState(false)
    const [inputHover, setInputHover] = useState(false)

    const inputRef = useRef(null)
    const navigate = useNavigate()

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpenAccountMenu(false)
                    setShowMobileMenu(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside)
            return () => {
                document.removeEventListener("mousedown", handleClickOutside)
            }
        }, [ref])
    }

    const wrapperRef = useRef(null)
    useOutsideAlerter(wrapperRef)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const [username, setUsername] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            setTimeout(() => {
                if (currentUser) {
                    setUsername(currentUser.displayName)
                    setPhotoUrl(currentUser.photoURL)
                }
            }, 1000)
        })
    }, [])

    const toggleAccountMenu = useCallback(() => {
        setIsOpenAccountMenu((current) => !current)
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    return (
        <nav className="w-full fixed z-40" ref={wrapperRef}>
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
                    showBackground ? "bg-zinc-900 bg-opacity-90" : ""
                }`}
            >
                <img
                    className="w-44 h-auto hidden md:block cursor-pointer"
                    src={logo}
                    alt="Logo Image"
                    onClick={() => navigate("/")}
                />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    {navitems.map(({ name, link }) => {
                        return (
                            <div key={name}>
                                <NavLink
                                    to={link}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold cursor-default"
                                            : "text-gray-200 hover:text-gray-400 cursor-pointer transition"
                                    }
                                >
                                    {name}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                >
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown
                        size={20}
                        className={`w-4 md:w-7 text-white fill-white transition ${
                            showMobileMenu ? "rotate-180" : "rotate-0"
                        }`}
                    />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-2 items-center">
                    <div
                        className={`flex items-center justify-center pl-2 py-0.5 ${
                            showSearch
                                ? "border bg-[rgba(0,0,0,0.6)] border-solid border-white"
                                : ""
                        }`}
                        onClick={() => {
                            inputRef.current.focus()
                        }}
                    >
                        <button
                            className="bg-transparent border-0 focus:outline-none"
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => {
                                if (!inputHover) {
                                    setShowSearch(false)
                                }
                            }}
                        >
                            <BsSearch className="text-white text-xl hidden md:block" />
                        </button>
                        <input
                            className={`flex gap-2 items-center justify-center pl-2 p-1 ${
                                showSearch
                                    ? "w-full opacity-100 visible p-1 focus:outline-none bg-transparent text-white"
                                    : "w-0 opacity-0 invisible bg-transparent text-white border-0 transition-all duration-150 ease-in-out"
                            }`}
                            type="text"
                            placeholder="Titles,people,genres"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false)
                                setInputHover(false)
                            }}
                            ref={inputRef}
                        />
                    </div>

                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition mr-5">
                        <BsBell size={20} className="w-4 md:w-8" />
                    </div>
                    <div
                        onClick={toggleAccountMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer relative"
                    >
                        <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img
                                className="h-max object-contain"
                                src={photoUrl}
                                alt="Profile Image"
                            />
                        </div>
                        <BsChevronDown
                            size={20}
                            className={`w-4 md:w-7 text-white fill-white transition ${
                                isOpenAccountMenu ? "rotate-180" : "rotate-0"
                            }`}
                        />
                        <AccountMenu
                            visible={isOpenAccountMenu}
                            username={username}
                            photoUrl={photoUrl}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
