import styled from "styled-components"
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"
import usePlayerId from "../hooks/usePlayerId"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player/youtube"

export default function Player() {
    const navigate = useNavigate()
    let { id } = useParams()

    const trailerData = usePlayerId(id)
    const [trailer, setTrailer] = useState("")

    useEffect(() => {
        if (trailerData.data) {
            const index = trailerData.data.videos.results.findIndex(
                (element) => element.type === "Trailer"
            )
            setTrailer(trailerData.data.videos?.results[index]?.key)
        }
    }, [trailerData.data])
    

    return (
        <Container>
            <div className="player relative">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${trailer}`}
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", top: "0", left: "0" }}
                    playing
                    controls
                    pip
                    config={{
                        youtube: {
                            playerVars: { showinfo: 0 },
                        },
                    }}
                />
            </div>
        </Container>
    )
}

const Container = styled.div`
    .player {
        width: 100vw;
        height: 100vh;
        .back {
            position: absolute;
            padding: 4rem 2rem;
            z-index: 1;
            svg {
                font-size: 3rem;
                cursor: pointer;
            }
        }
        video {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }
`
