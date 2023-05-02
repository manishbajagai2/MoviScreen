/* eslint-disable react/prop-types */

import styled from "styled-components"

// export default function SelectGenre({ genres, type }) {
export default function SelectGenre({ genres }) {
    return (
        <Select
            className="flex"
            onChange={(e) => {
                console.log(e.target.value)
            }}
            // onChange={(e) => {
            //     dispatch(
            //         fetchDataByGenre({
            //             genres,
            //             genre: e.target.value,
            //             type,
            //         })
            //     )
            // }}
        >
            {genres.map((genre) => {
                return (
                    <option value={genre.id} key={genre.id}>
                        {genre.name}
                    </option>
                )
            })}
        </Select>
    )
}

const Select = styled.select`
    margin-left: 5rem;
    cursor: pointer;
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
`
