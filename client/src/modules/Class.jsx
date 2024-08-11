export default function Class(props) {

    return (
        <>
            <div className={props.visible ? `block` : `hidden`}>
                <h1>Class</h1>
            </div>
        </>
    )
}