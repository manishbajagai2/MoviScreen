import background from "../assets/login.jpeg"
import Header from "../components/Header"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { firebaseAuth } from "../utils/firebase-config"

import { device } from "../utils/device"

import styled from "styled-components"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const goBack = () => {
        navigate("/signup")
    }
    const handleLogin = async () => {
        if(email === '' || password === '') return
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password)
        } catch (error) {
            console.log(error.code)
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/")
    })

    return (
        <Container>
            <img src={background} alt="background image" />
            <div className="content">
                <Header />
                <div className="form-container flex column a-center j-center">
                    <div className="form">
                        <div className="title">
                            <h1>Sign In</h1>
                        </div>
                        <div className="container flex column">
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <button onClick={handleLogin}>Sign In</button>
                            <p style={{ color: "rgba(255,255,255,0.5)" }}>
                                New to MoviScreen ?{" "}
                                <span onClick={goBack} className="signuptext">
                                    {" "}
                                    Sign up now
                                </span>{" "}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.6);

        .form-container {
            height: 70vh;
            .form {
                padding: 2.5rem 2rem;
                width: 90%;
                @media ${device.tablet} {
                    width: 60%;
                    padding: 3.5rem;
                }
                @media ${device.laptop} {
                    width: 40%;
                }
                @media ${device.laptopL} {
                    width: 32%;
                }
                background-color: #000000b0;
                gap: 2rem;
                color: white;
                .title {
                    padding-bottom: 2rem;
                }
                .container {
                    gap: 2rem;
                    input {
                        color: white;
                        border-radius: 5px;
                        background: #333333;
                        padding: 0.8rem 1rem;
                        font-size: 1rem;
                        border: none;
                        &:focus {
                            outline: none;
                            border: 2px solid white;
                        }
                    }
                    input::placeholder {
                        font-size: 1rem;
                        color: rgba(255, 255, 255, 0.7);
                    }
                    @media ${device.tablet} {
                        input {
                            padding: 1.25rem;
                        }
                    }
                    button {
                        padding: 1rem;
                        background-color: #e50914;
                        border: none;
                        cursor: pointer;
                        color: white;
                        border-radius: 0.2rem;
                        font-weight: bolder;
                        font-size: 1.05rem;
                    }
                    .signuptext {
                        color: white;
                        &:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
`

export default Login
