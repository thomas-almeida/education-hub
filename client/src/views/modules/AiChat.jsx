/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from '../utils/baseUrl'
import Breadcrumb from "../../components/Breadcrumb"

export default function AiChat({
    visible,
    userData,
    setActiveScreen,
    activeScreen
}) {

    const [classListData, setClassList] = useState([])
    const [currentCourseId, setCurrentCourse] = useState('')

    useEffect(() => {

        async function getClassesByCourseId() {
            setCurrentCourse(localStorage.getItem('currentCourse'))
        }

        async function getClasses() {
            if (currentCourseId && currentCourseId !== '') {
                const response = await axios.get(`${baseUrl.productionUrl}/classes/get-classes-from-course/${currentCourseId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                })

                setClassList(response.data?.classes)
            }
        }

        getClassesByCourseId()
        getClasses()

    }, [currentCourseId])


    function formatDate(timestamp) {
        const yy = String(timestamp).slice("", 4)
        const mm = String(timestamp).slice(5, 7)
        const dd = String(timestamp).slice(8)

        return `${dd}/${mm}/${yy}`
    }

    function closeModal(tag) {
        if (tag === 'classes') {
            setIsVisibleClass(false)
        } else {
            setIsVisible(false)
        }
    }

    return (
        <>
            <div className={visible && classListData.length > 0 ? `flex justify-center items-center w-[90%] class-container` : `hidden`}>
                <div className="flex justify-center items-center w-full">
                    <div className="p-6 h-[80vh] w-[85%] flex justify-center items-center ">
                        <div className="w-full">
                            <div className="p-4 my-6 flex justify-center items-center flex-col">
                                <img src="/edu-hub-logo.png" className="w-[100px]" alt="" />
                                <h1 className="font-semibold text-2xl py-1 text-slate-500">Edu</h1>
                                <p className="font-semibold text-sm text-center w-[32%] text-slate-400">
                                    {`Ola ${userData?.name} Me diga suas dúvidas sobre as aulas, vamos ajudar você!`}
                                </p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <div className="flex items-center relative w-[55%] bg-white border shadow-lg rounded-lg px-4 py-4">
                                    <textarea
                                        style={{
                                            resize: 'none'
                                        }}
                                        rows={1}
                                        className="w-[90%] text-sm outline-none"
                                        aria-multiline={true}

                                    >
                                    </textarea>

                                    <img
                                        src="/arrow.svg"
                                        className="w-[40px] border rounded-full p-2 shadow-md absolute right-[10px] bg-[#878787df] cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <p className="w-[40%] text-center italic mt-6 text-[#ff2da4] rounded-full border font-semibold">Seu plano não possui acesso a este chat 💔</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}