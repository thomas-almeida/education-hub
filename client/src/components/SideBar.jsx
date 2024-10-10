/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import axios from 'axios'

export default function SideBar(
    {
        setActiveScreen,
        activeScreen,
        userName,
        userEmail,
        userTag,
        userId
    }
) {

    const [students, setStudents] = useState('')

    function translateRole(role) {
        if (role === 'STUDENT') {
            return role = 'Aluno(a)'
        } else if (role === 'SPONSOR') {
            return role = 'Convidado(a)'
        } else {
            return role = 'Professor(a)'
        }
    }

    useEffect(() => {

        async function getStudents() {
            try {

                if (userId !== undefined) {
                    const response = await axios.get(`${baseUrl.productionUrl}/users/get-students/${userId}`)
                    setStudents(response.data?.students)
                }

            } catch (error) {
                console.error(error)
            }
        }

        getStudents()

    }, [userId])

    return (
        <div className="bg-white text-black h-svh w-[220px] border sidebar">
            <div className="flex items-center px-4 py-6">
                <div className="">
                    <div className="flex items-center">
                        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis w-[100%] mr-1 font-semibold text-xl">
                            {userName}
                        </h2>
                    </div>
                    <div className="flex items-center font-normal">
                        <b className="border-gray-500 rounded-sm font-medium text-sm italic whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-slate-500">
                            @{userEmail}
                        </b>
                    </div>
                    <div className="flex items-center font-normal">
                        <b className="border-2 border-gray-300 px-4 rounded-md font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis text-slate-500 mt-2">
                            {translateRole(userTag)}
                        </b>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <ul>
                    <li
                        className={`p-2 cursor-pointer font-semibold text-lg hover:text-blue-500 ${activeScreen === 'menu' ? 'text-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveScreen('menu')}
                    >
                        <a href="#">Início</a>
                    </li>
                    <li
                        className={`p-2 cursor-pointer font-semibold text-lg hover:text-blue-500 ${activeScreen === 'class' ? 'text-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveScreen('class')}
                    >
                        <a href="#">
                            {
                                `${userTag === 'STUDENT' ? 'Minhas Aulas' : 'Aulas'}`
                            }
                        </a>
                    </li>
                    <li
                        className={`p-2 mb-2 cursor-pointer font-semibold text-lg hover:text-blue-500 ${activeScreen === 'exercises' ? 'text-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveScreen('exercises')}
                    >
                        <a href="#">Exercícios</a>
                    </li>
                </ul>
            </div>
            <div className="flex justify-center items-center">
                <hr className="w-[80%]" />
            </div>
            {
                students.length > 0 && (
                    <div className="overflow-y-scroll">

                        <h2 className="px-6 my-2 font-semibold text-lg">Alunos</h2>

                        {
                            students.map((student) => (
                                <div className="px-5 my-2">
                                    <h3 className="px-1 font-medium hover:text-blue-500 cursor-pointer">{student.name}</h3>
                                    <p className="px-1 italic text-[#7f7f7f]">@{student.username}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}
