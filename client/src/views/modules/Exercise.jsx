/* eslint-disable react/prop-types */
export default function Exercises(props) {

    return (
        <>
            <div className={props.visible ? `block` : `hidden`}>
                <h1 className="text-center text-2xl font-medium">Nenhum Exercício Postado</h1>
                <p className="text-center italic">Todos os exercícios aparecerão aqui</p>
            </div>
        </>
    )
}