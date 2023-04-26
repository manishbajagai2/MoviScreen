/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/logo.png"

import { device } from "../utils/device"

export default function Header(props) {
    const navigate = useNavigate()
    return (
        <StyledHeader className="flex a-center j-between">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <button
                onClick={() => navigate(props.login ? "/login" : "")}
                className={!props.login ? "hidden" : ""}
            >
                {props.login ? "Sign In" : ""}
            </button>
        </StyledHeader>
    )
}
const StyledHeader = styled.header`
    padding: 1rem 1rem;
    .logo {
        img {
            height: 2.5rem;
        }
    }
    @media ${device.tablet} {
        padding: 1.5rem 6rem;
        .logo {
            img {
                height: 3.5rem;
            }
        }
    }

    button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
    }
`
