/* eslint-disable react/prop-types */
import styled from "styled-components"
import background from "../assets/login.jpeg"

function BackgroundImage({ imgSrc }) {
    return (
        <Container>
            <img src={imgSrc ? imgSrc : background} alt="background image" />
        </Container>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    img {
        height: 100vh;
        width: 100vw;
        object-fit: cover;
        mask-image: linear-gradient(
            to top,
            rgba(20, 20, 20, 0) 0,
            rgba(20, 20, 20, 0.15) 15%,
            rgba(20, 20, 20, 0.35) 29%,
            rgba(20, 20, 20, 0.58) 44%,
            #141414 68%,
            #141414 100%
        );
        -webkit-mask-image: linear-gradient(
            to top,
            rgba(20, 20, 20, 0) 0,
            rgba(20, 20, 20, 0.15) 15%,
            rgba(20, 20, 20, 0.35) 29%,
            rgba(20, 20, 20, 0.58) 44%,
            #141414 68%,
            #141414 100%
        );
    }
`
export default BackgroundImage
