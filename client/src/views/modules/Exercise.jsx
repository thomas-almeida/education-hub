/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../utils/baseUrl"
import Breadcrumb from "../../components/Breadcrumb"

export default function Exercises({
    setActiveScreen,
    activeScreen,
    visible,
    coursesList
}) {


    console.log(coursesList)

    return (
        <>

            {
                coursesList?.length <= 0 && (
                    <div className={visible ? `block` : `hidden`}>
                        <h1 className="text-center text-2xl font-medium">Nenhum Exercício Postado</h1>
                        <p className="text-center italic">Todos os exercícios aparecerão aqui</p>
                    </div>
                )
            }
            {
                coursesList?.length > 0 && (
                    <div className={visible ? `flex items-center justify-center w-[75%] exercise-item flex-col` : `hidden`}>
                        <div className="w-[100%]">
                            <Breadcrumb
                                setActiveScreen={setActiveScreen}
                                activeScreen={activeScreen}
                            />
                        </div>
                        <div className="h-[80vh] overflow-y-auto p-6">

                            {
                                coursesList?.map(
                                    (course => (
                                        course?.exercises?.map(
                                            (exercise => (
                                                <>
                                                    <div
                                                        key={exercise?.id}
                                                        className="border-2 p-4 rounded-md shadow-md transition hover:scale-[1.02] bg-white mt-4"
                                                    >
                                                        <div
                                                            className="flex items-center mb-4"
                                                        >
                                                            <img
                                                                src={course?.icon}
                                                                className="w-[60px] mr-1"
                                                                draggable={false}
                                                            />
                                                            <div>
                                                                <h1
                                                                    className="text-2xl font-semibold exercise-name"
                                                                >
                                                                    {exercise?.name}
                                                                </h1>
                                                                <h3 className="border-2 px-2 mt-1 rounded-md">
                                                                    {course?.name}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <textarea
                                                            value={exercise?.description}
                                                            rows={3}
                                                            className="w-[700px] exercise-description font-semibold"
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
                                                            </a>

                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        )
                                    ))
                                )
                            }

                        </div>
                    </div>
                )
            }
        </>
    )
}