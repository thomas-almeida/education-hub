/* eslint-disable react/prop-types */

import axios from "axios"
import { useEffect, useState } from "react"
import baseUrl from "../utils/baseUrl"

export default function Menu(
    {
        visible,
        setActiveScreen,
        userData
    }
) {

    const totalHomeworks = 0

    const [coursesList, setCoursesList] = useState([])

    function calculateFreq(userFrequency, currentClass) {
        return (userFrequency / currentClass) * 100
    }
    
    function formatDate(timestamp) {
        const yy = String(timestamp).slice("", 4)
        const mm = String(timestamp).slice(5, 7)
        const dd = String(timestamp).slice(8)

        return `${dd}/${mm}/${yy}`
    }

    useEffect(() => {

        async function getCourses() {

            if (userData && userData?.id) {
                const userId = userData?.id

                if (userData.role === 'ADMIN') {
                    const response = await axios.get(`${baseUrl.productionUrl}/users/admin/courses/get-courses-by-instructor-id/${userId}`, {
                        headers: {
                            "ngrok-skip-browser-warning": "true"
                        }
                    })
                    setCoursesList(response.data?.courses)
                } else {
                    const response = await axios.get(`${baseUrl.productionUrl}/users/admin/courses/get-courses-by-student-id/${userData?.courseId}`, {
                        headers: {
                            "ngrok-skip-browser-warning": "true"
                        }
                    })
                    setCoursesList(response.data?.courses)
                }
            }

        }

        getCourses()

    }, [userData])

    function showClassesFromCourse(courseId) {
        localStorage.setItem('currentCourse', courseId)
        setActiveScreen('class')
    }

    return (
        <>
            <div className={visible ? `flex items-center justify-center` : `hidden`}>
                <div className="flex flex-col items-center menu-container">
                    <div className="flex justify-start w-[85%] mb-4 flex-col">
                        <h2 className="w-auto text-left text-2xl font-semibold">Meus Cursos</h2>
                        <p>{userData?.role === 'ADMIN' ? 'Cursos que você é o professor' : 'Cursos que você está matriculado'}</p>
                    </div>
                    {
                        coursesList.map(course => (
                            <div
                                className="flex items-center rounded-md border-2 shadow-sm w-[85%] my-2 bg-white cursor-pointer transition hover:scale-[1.02]"
                                onClick={() => showClassesFromCourse(course.id)}
                                key={course?.id}
                            >
                                <div className="p-12 h-[360px] course-banner">
                                    <div className="flex items-center relative left-[-12px]">
                                        <img src={course.icon} className="w-[60px] mr-2" alt="" />
                                        <h1 className="text-3xl font-semibold w-[40%] leading-8">{course?.name}</h1>
                                    </div>
                                    <div className="flex items-center py-4">
                                        <div className="relative top-1">
                                            <h3 className="text-lg font-medium leading-3">
                                                Thomas Almeida
                                            </h3>
                                            <p>{`${userData?.role === 'ADMIN' && course?.instructorId === userData?.id ? 'Voce é o Instrutor deste Curso' : 'Instrutor'}`}</p>
                                        </div>
                                    </div>
                                    <p className="py-1 w-[70%] text-slate-700 font-medium italic">{course?.description}</p>

                                    <div className="border-2 mt-2 h-[9px] w-[100%] bg-gray-100 rounded-md">
                                        <div
                                            style={{ width: `${course.currentClass * 10}%` }}
                                            className={`bg-green-600 h-[5px] rounded-md`}
                                        ></div>
                                        <div className="flex mt-1 course-status">
                                            <p className="border-2 w-[130px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-slate-500 font-semibold mr-2">
                                                📘 {course.currentClass} de {course.totalClasses} Aulas
                                            </p>
                                            {
                                                userData?.role === 'STUDENT' && (
                                                    <p className="border-2 w-[180px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-slate-500 font-semibold mr-2">
                                                        📐 Frequência: {calculateFreq(userData?.frequency, course.currentClass).toFixed(2)}%
                                                    </p>
                                                )
                                            }
                                            <p className="border-2 w-[230px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-slate-500 font-semibold mr-2">
                                                📅 Próxima Aula: {formatDate(course.nextClass)}
                                            </p>
                                            <p className="border-2 w-[200px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-slate-500 font-semibold">
                                                📄 Exercícios: {course.exercises.length === 0 ? 'Nenhum' : course.exercises.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className="flex items-center justify-start w-[85%] py-4 mt-1">
                        <div
                            className="border-2 rounded-md p-8 w-[300px] mr-2 bg-white cursor-pointer transition hover:scale-[1.02] exercises-box"
                            onClick={() => setActiveScreen('exercises')}
                        >
                            <h3 className="text-lg font-medium pb-2">Exercícios</h3>
                            <div className="flex">
                                <div>
                                    <h1 className="text-3xl font-semibold">{totalHomeworks} Atividades</h1>
                                    <p
                                        className="text-blue-500 font-semibold cursor-pointer"
                                    >
                                        Ver meus exercícios
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}