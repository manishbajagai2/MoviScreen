// import useModalState from "../hooks/useModalState"
import useMovieState from "../hooks/useMovieState"

const TestComp = () => {
    const { movie, updateMovie } = useMovieState()

    // const { isShowing, show, hide} = useModalState()

    console.log("--->", movie)

    return (
        <div>
            <button onClick={() => updateMovie("Hello")}>Click Me</button>
        </div>
    )
}
export default TestComp
