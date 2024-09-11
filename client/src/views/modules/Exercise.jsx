/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../utils/baseUrl"

export default function Exercises(props) {

    const [exerciseList, setExerciseList] = useState([])
    const [isSolved, setIsSolved] = useState(null)

    useEffect(() => {

        async function getIsSolvedStatus() {
            setIsSolved(localStorage.getItem('isSolved'))
            console.log(isSolved)
        }

        async function getExercises() {
            const response = await axios.get(`${baseUrl.productionUrl}/exercises/get-exercises`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            })

            setExerciseList(response.data?.exercises)
        }

        getExercises()
        getIsSolvedStatus()
    }, [])

    function solveExercise() {
        setIsSolved('true')
        localStorage.setItem('isSolved', 'true')
        console.log(isSolved)
    }

    return (
        <>
            {
                exerciseList.length <= 0 && (
                    <div className={props.visible ? `block` : `hidden`}>
                        <h1 className="text-center text-2xl font-medium">Nenhum Exercício Postado</h1>
                        <p className="text-center italic">Todos os exercícios aparecerão aqui</p>
                    </div>
                )
            }
            {
                exerciseList.length > 0 && (
                    <div className={props.visible ? `flex items-center justify-center w-[75%] exercise-item` : `hidden`}>
                        <div className="h-[80vh] overflow-y-auto p-6">

                            {
                                exerciseList.map(exercise => (
                                    <div
                                        key={exercise?.id}
                                        className="border-2 p-4 rounded-md shadow-md transition hover:scale-[1.02] bg-white mt-4"
                                    >
                                        <div
                                            className="flex items-center mb-4"
                                        >
                                            <img
                                                src="/excel-2.png"
                                                className="w-[30px] mr-1"
                                                draggable={false}
                                            />
                                            <h1
                                                className="text-2xl font-semibold exercise-name"
                                            >
                                                {exercise?.name}
                                            </h1>
                                        </div>
                                        <textarea
                                            value={exercise?.description}
                                            rows={10}
                                            className="w-[700px] exercise-description"
                                            contentEditable={false}
                                            readOnly
                                        >

                                        </textarea>
                                        <h2 className="text-lg font-semibold">🗂 Material de Apoio</h2>
                                        <div className="flex items-center justify-between py-4 exercise-options">

                                            <a
                                                href={`${baseUrl.productionUrl}/files/download/${exercise?.attachment?.filename}`}
                                                className="flex items-center relative w-[100%]"
                                                download
                                            >
                                                <div
                                                    className="border-2 max-w-[270px] p-2 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 hover:shadow-md"
                                                >
                                                    <img src="/doc-icon.svg" className="w-[20px] mr-1" alt="" />
                                                    <h3>
                                                        {
                                                            exercise?.attachment?.originalname
                                                        }
                                                    </h3>
                                                </div>
                                                <div
                                                    className={`absolute right-0 border-2 max-w-[270px] p-2 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500 hover:shadow-md ${isSolved === 'true' ? 'text-green-600 font-bold border-green-500 hover:border-green-500' : ''}`}
                                                    onClick={() => solveExercise()}
                                                >
                                                    <p className="pr-2">
                                                        ✅
                                                    </p>
                                                    <h3>
                                                        {
                                                            isSolved === 'true' ? 'Exercício Entregue!' : 'Marcar Como Entregue'
                                                        }
                                                    </h3>
                                                </div>
                                            </a>

                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                )
            }
        </>
    )
}