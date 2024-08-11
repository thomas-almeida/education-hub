export default function Exercises(props) {

    return (
        <>
            <div className={props.visible ? `block` : `hidden`}>
                <h1>Exercises</h1>
            </div>
        </>
    )
}