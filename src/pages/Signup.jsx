import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import BackgroundImage from "../components/BackgroundImage"
import Header from "../components/Header"
import { firebaseAuth } from "../utils/firebase-config"
import { device } from "../utils/device"

import { FiChevronRight } from "react-icons/fi"

function Signup() {
    const [showPassword, setShowPassword] = useState(false)
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    const handleSignIn = async () => {
        const { email, password } = formValues
        if (email === "" || password === "") return
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        } catch (error) {
            console.log(error)
        }
        setFormValues({
            email: "",
            password: "",
        })
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/")
    })

    return (
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">
                <Header login={true} />
                <div className="body">
                    <div className="text">
                        <h1>Unlimited movies, TV shows and more.</h1>
                        <h4>Watch anywhere or anytime.</h4>
                        <h6>Ready to watch? Enter your email to sign up.</h6>
                    </div>
                    <div className="form">
                        <input
                            type="email"
                            placeholder="Email address"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="email"
                            value={formValues.email}
                        />
                        {showPassword && (
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                name="password"
                                value={formValues.password}
                            />
                        )}
                        {!showPassword && (
                            <button onClick={() => setShowPassword(true)}>
                                Get Started
                                <FiChevronRight size={28} />
                            </button>
                        )}
                        {showPassword && (
                            <button onClick={handleSignIn}>Sign Up</button>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        height: 100vh;
        width: 100vw;

        .body {
            padding: 2rem;
            .text {
                h1 {
                    font-size: 2.5rem;
                    padding: 1rem 0.25rem;
                    font-weight: 800;
                }
                h4 {
                    font-size: 1.15rem;
                    padding: 0.25rem;
                }
                h6 {
                    font-size: 1.15rem;
                    padding: 1rem 0.25rem;
                    line-height: 1.5;
                }
            }

            .form {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;

                padding: 0.25rem;

                flex-grow: ${({ showPassword }) => (showPassword ? 1 : 2)};
                input {
                    color: white;
                    border-radius: 5px;
                    background: transparent;
                    padding: 0.8rem 1rem;
                    font-size: 1.2rem;
                    border: 1px solid gray;
                    &:focus {
                        outline: none;
                        border: 2px solid white;
                    }
                }
                input::placeholder {
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.7);
                }
            }

            @media ${device.tablet} {
                padding: 1rem 6rem;
                .logo {
                    img {
                        height: 3.5rem;
                    }
                }
                .text {
                    h1 {
                        width: 80%;
                        margin-top: 1.25rem;
                    }
                }
                .form {
                    margin-top: 2.75rem;
                }
            }

            @media ${device.laptop} {
                padding: 2rem 8rem;
                .text {
                    h1 {
                        width: 70%;
                        font-size: 3.15rem;
                        font-weight: 900;
                        margin-top: 1.25rem;
                    }

                    h4 {
                        font-size: 1.25rem;
                        padding: 1rem 0.5rem;
                    }
                    h6 {
                        font-size: 1.5rem;
                        padding: 1rem 0.5rem;
                        line-height: 1.5;
                    }
                }
                .form {
                    margin-top: 2.75rem;
                    input[type="email"] {
                        width: 50%;
                    }
                }
            }

            @media ${device.laptopL} {
                .text {
                    h1 {
                        width: 80%;
                        font-size: 3.75rem;
                        font-weight: 900;
                        margin-top: 2.75rem;
                    }

                    h4 {
                        font-size: 1.35rem;
                        padding: 2rem 0.5rem;
                    }
                    h6 {
                        font-size: 1.5rem;
                        padding: 0 0.5rem;
                        line-height: 1.5;
                    }
                }
                .form {
                    margin-top: 2.5rem;
                    input[type="email"] {
                        width: 40%;
                    }
                    input[type="password"] {
                        width: 30%;
                    }
                }
            }

            button {
                padding: 0.9rem 3rem 0.9rem 2rem;
                background-color: #e50914;
                border: none;
                border-radius: 0.2rem;
                cursor: pointer;
                color: white;
                font-weight: bolder;
                font-size: 1.5rem;
                svg{
                  position: absolute;
                }
            }
        }
    }
`

export default Signup
