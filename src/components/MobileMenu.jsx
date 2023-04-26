/* eslint-disable react/prop-types */
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { navitems } from "../utils/navitems"

const MobileMenu = ({ visible }) => {
    if (!visible) {
        return null
    }

    

    return (
        <Container>
            <div className="navFlex">
                {navitems.map(({ name, link }) => {
                    return (
                        <div key={name} className="navItems">
                            <NavLink
                                to={link}
                                style={({ isActive }) => ({
                                    color: isActive ? "red" : "white",
                                })}
                            >
                                {name}
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    position: absolute;
    left: 0;
    top: 2rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    background-color: #000000;
    flex-direction: column;
    width: 14rem;
    border-width: 2px;
    border-color: #1f2937;
    .navFlex {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .navItems {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        color: #ffffff;
        text-align: center;
        &:hover {
            text-decoration: underline;
        }
    }
`

export default MobileMenu
