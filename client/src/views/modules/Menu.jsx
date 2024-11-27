/* eslint-disable react/prop-types */

import axios from "axios"
import { useEffect, useState } from "react"
import baseUrl from "../utils/baseUrl"
import Breadcrumb from "../../components/Breadcrumb"

export default function Menu(
    {
        visible,
        setActiveScreen,
        activeScreen,
        userData,
        coursesList
    }
) {



    const [studentFullName, setStudentFullName] = useState('')
    const [alreadySendFullName, setAlreadySendFullName] = useState(false)

    function calculateFreq(userFrequency, currentClass) {
        return (userFrequency / currentClass) * 100
    }

    function formatDate(timestamp) {
        const yy = String(timestamp).slice("", 4)
        const mm = String(timestamp).slice(5, 7)
        const dd = String(timestamp).slice(8)

        return `${dd}/${mm}/${yy}`
    }

    function showClassesFromCourse(courseId) {
        localStorage.setItem('currentCourse', courseId)
        setActiveScreen('class')
    }

    async function sendCertifateToAdmin() {

        if (studentFullName.length >= 5) {

            const response = await axios.post(`${baseUrl.productionUrl}/certificate-intent`, {
                studentName: studentFullName,
                userId: userData?.id
            })

            setAlreadySendFullName(true)
        }

        return
    }

    useEffect(() => {

        function checkCertificateIntent() {
            if (userData?.certificateData) {

                const intentName = userData?.certificateData?.intentName
                console.log(intentName)

                if (intentName !== "") {
                    setAlreadySendFullName(true)
                }

                return
            }
        }

        checkCertificateIntent()

    }, [userData])


    return (
        <>
            <div className={visible ? `flex items-center justify-center` : `hidden`}>
                <div className="flex flex-col items-center h-[90vh] overflow-y-auto menu-container">
                    <div className="flex justify-start w-[85%] mb-2 flex-col">
                        <Breadcrumb
                            activeScreen={activeScreen}
                            setActiveScreen={setActiveScreen}
                        />
                        <h2 className="w-auto text-left text-2xl font-semibold">Meus Cursos</h2>
                        <p>{userData?.role === 'ADMIN' || userData?.role === 'SPONSOR' ? 'Cursos que você é Instrutor, Aluno ou Convidado' : 'Cursos que você está matriculado'}</p>
                    </div>
                    {
                        coursesList?.map(course => (
                            <>
                                <div className="flex justify-center items-center">
                                    <div
                                        className="flex items-center rounded-md border-2 shadow-sm w-[55%] my-2 mr-2 bg-white cursor-pointer transition hover:scale-[1.02]"
                                        onClick={() => showClassesFromCourse(course.id)}
                                        key={course?.id}
                                    >
                                        <div className="p-12 h-[360px] course-banner">
                                            <div className="flex items-center relative left-[-12px]">
                                                <img src={course.icon} className="w-[40px] mr-2" alt="" />
                                                <h1 className="text-3xl font-semibold leading-8">{course?.name}</h1>
                                            </div>
                                            <div className="flex items-center py-4">
                                                <div className="relative top-1">
                                                    <h3 className="text-lg font-medium leading-3">
                                                        {course.instructor.name}
                                                    </h3>
                                                    <p
                                                        className="px-2 mt-2 border-2 rounded-md font-semibold text-center"
                                                    >
                                                        {`${userData?.role === 'ADMIN' && course?.instructor?.id === userData?.id ? 'Voce é o Instrutor(a) deste Curso' : 'Instrutor'}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="py-1 text-slate-700 font-medium italic">{course?.description}</p>

                                            <div className={course.currentClass >= 9 ? 'hidden' : 'border-2 mt-2 h-[9px] w-[100%] bg-gray-100 rounded-md'}>
                                                <div
                                                    style={{ width: `${course.currentClass * 10}%` }}
                                                    className={`bg-green-600 h-[5px] rounded-md`}
                                                ></div>
                                                <div className={course.currentClass >= 9 ? 'hidden' : 'flex mt-1 course-status'}>
                                                    <p className="border-2 w-[130px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-slate-500 font-semibold mr-2">
                                                        📘 {course.currentClass} de {course.totalClasses} Aulas
                                                    </p>

                                                    <p className="border-2 w-[230px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-slate-500 font-semibold mr-2">
                                                        📅 Próxima Aula: {formatDate(course.nextClass)}
                                                    </p>
                                                    <p className="border-2 w-[200px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-slate-500 font-semibold">
                                                        📄 Exercícios: {course?.exercises?.length}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className={course.currentClass >= 10 ? 'border-2 border-[#5e5e5e85] bg-[#21a365] text-[#fff] font-semibold rounded-md mt-2 w-[200px] text-center' : 'hidden'}>
                                                <h2>Este curso foi concluído</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={course.currentClass >= 10 ? 'flex justify-center items-center p-4 w-[30%] h-[360px] bg-white rounded-md border-2 shadow-sm ' : 'hidden'}>
                                        <div className="text-center">
                                            <h2 className="font-semibold text-lg py-2"> 🎓Certificado</h2>
                                            <p className="text-sm">Para emissão de certificado deste curso, informe-nos seu nome completo no formulário abaixo</p>
                                            <div className="text-left border p-2 my-4 rounded-md shadow-sm">
                                                {
                                                    alreadySendFullName === false ? (
                                                        <>
                                                            <p className="font-semibold">Seu Nome Completo</p>
                                                            <input
                                                                type="text"
                                                                placeholder="Amanda Silva Prestes"
                                                                className="p-2 border rounded-md w-full px-2 mt-2 outline-slate-400"
                                                                value={studentFullName}
                                                                onChange={(e) => setStudentFullName(e.target.value)}
                                                            />
                                                            <button
                                                                className="p-1 border w-full mt-2 rounded-md bg-blue-500 text-white"
                                                                onClick={() => sendCertifateToAdmin()}
                                                            >
                                                                Enviar para Emissão
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <p className="text-center text-sm text-blue-500 font-semibold">Seu certificado já está em processo de emissão</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                    <div className="grid grid-cols-3 justify-start py-4 mt-1 w-[85%]">
                        <div
                            className="border-2 rounded-md p-8 w-[300px] mr-2 bg-white cursor-pointer transition hover:scale-[1.02] exercises-box"
                            onClick={() => setActiveScreen('aichat')}
                        >
                            <p className="text-[12pt] w-[25%] text-center rounded-full bg-blue-500 font-semibold text-white mb-2">novo</p>
                            <h3 className="text-lg font-medium">🎓Tire Suas Dúvidas</h3>
                            <div className="flex">
                                <div>
                                    <h1 className="text-3xl font-semibold text-blue-500">Fale com o Edu</h1>

                                </div>
                            </div>
                        </div>
                        <div
                            className="border-2 rounded-md p-8 w-[300px] mr-2 bg-white cursor-pointer transition hover:scale-[1.02] exercises-box"
                            onClick={() => setActiveScreen('exercises')}
                        >
                            <h3 className="text-lg font-medium pb-2">Treinar Conhecimentos</h3>
                            <div className="flex">
                                <div>
                                    <h1 className="text-3xl font-semibold">Exercícios</h1>
                                    <p
                                        className="text-blue-500 font-semibold cursor-pointer"
                                    >
                                        Ver exercícios disponíveis
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="border-2 rounded-md p-8 w-[300px] mr-2 bg-white cursor-pointer transition hover:scale-[1.02] exercises-box"
                            onClick={() => showClassesFromCourse(coursesList[0].id)}
                        >
                            <h3 className="text-lg font-medium pb-2">Assista as Gravações</h3>
                            <div className="flex">
                                <div>
                                    <h1 className="text-3xl font-semibold">Aulas</h1>
                                    <p
                                        className="text-blue-500 font-semibold cursor-pointer"
                                    >
                                        Ver todas as aulas
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