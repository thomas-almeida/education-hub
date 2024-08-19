/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import axios from "axios"
import baseUrl from '../utils/baseUrl'
import Modal from "../../components/Modal"

export default function Class({
    visible,
    userData
}) {

    const [classListData, setClassList] = useState([])
    const [isModalVisible, setIsVisible] = useState(false)
    const [isVisibleClass, setIsVisibleClass] = useState(false)
    const [currentClass, setCurrentClass] = useState({})
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

    function closeModal(tag) {
        if (tag === 'classes') {
            setIsVisibleClass(false)
        } else {
            setIsVisible(false)
        }
    }

    function openModal(classItem) {

        setIsVisible(true)
        setCurrentClass(classItem)

    }

    function openCreateModal() {
        setIsVisibleClass(true)
    }

    async function donwloadFile(fileName, originalName) {
        try {
            const response = await axios.get(`${baseUrl.productionUrl}/files/download/${fileName}`, {
                responseType: 'blob'
            })

            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', originalName)
            document.body.appendChild(link)
            link.click()
            link.parentNode.removeChild(link)

            alert('Material Baixado com sucesso!')

        } catch (error) {
            console.error("Erro ao baixar o arquivo:", error)
            alert('Erro ao baixar material de apoio')
        }
    }

    return (
        <>
            {
                classListData.length === 0 && (
                    <div>
                        <h1 className="text-center text-2xl font-medium">Nenhuma Aula Postada</h1>
                        <p className="text-center italic">Todas as aulas aparecerão aqui</p>

                        {
                            userData?.role === 'ADMIN' && (
                                <button
                                    className="p-2 border-2 border-blue-400 text-blue-500 mt-2 w-[200px] font-medium rounded-sm transition hover:scale-[1.02]"
                                    onClick={() => openCreateModal()}
                                >
                                    Criar Nova Aula
                                </button>
                            )
                        }

                    </div>
                )
            }
            <div className={visible && classListData.length > 0 ? `flex items-center w-[75%]` : `hidden`}>
                <div className="flex items-center">
                    <div className="p-6 overflow-y-auto h-[80vh]">
                        {
                            userData?.role === 'ADMIN' && (
                                <button
                                    className="p-2 border-2 border-blue-400 text-blue-500 mt-2 w-[200px] font-medium rounded-sm transition hover:scale-[1.02]"
                                    onClick={() => openCreateModal()}
                                >
                                    Criar Nova Aula
                                </button>
                            )
                        }
                        {
                            classListData?.map(classItem => (
                                <li
                                    key={classItem?.id}
                                    className="list-none border bg-white p-4 rounded-md shadow-md cursor-pointer my-3 transition hover:scale-[1.03]"
                                    onClick={() => openModal(classItem)}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="/excel-2.png"
                                            className="w-[30px] mr-1"
                                        />
                                        <h2 className="font-semibold text-xl">
                                            {classItem?.name}
                                        </h2>
                                    </div>
                                    <p
                                        className="w-[85%] py-2 mb-3"
                                    >
                                        {classItem?.description}
                                    </p>
                                    <b className="font-semibold border-2 p-1 px-2 rounded-md mr-4">
                                        📅 {classItem?.schedule}
                                    </b>
                                    <b className="font-semibold border-2 p-1 px-2 rounded-md mr-4">
                                        🎥 Video
                                    </b>
                                    <b className="font-semibold border-2 p-1 px-2 rounded-md">
                                        📁 Material de Apoio
                                    </b>
                                </li>
                            ))
                        }
                    </div>
                </div>
                <div className={isModalVisible ? `flex items-center justify-center absolute top-0 left-0 h-[100vh] w-[100%] bg-[#00000054] z-50` : `hidden`}>
                    <div className="p-12 bg-white w-[85%] h-[680px] flex rounded-md shadow-2xl">
                        <div className="w-[40%] py-10">
                            <div className="flex items-center mb-4">
                                <img
                                    src="/excel-2.png"
                                    className="w-[30px] mr-1"
                                />
                                <h2 className="font-semibold text-xl">
                                    {currentClass?.name}
                                </h2>
                            </div>
                            <p className="border-2 w-[125px] text-center p-1 rounded-md">
                                📅 {currentClass?.schedule}
                            </p>
                            <p className="w-[80%] pt-2 text-md">{currentClass?.description}</p>
                            <div className="pt-2 py-2 mt-2 rounded-md">
                                <b className="font-semibold">📁 Materiais de Apoio</b>
                                <div className="mt-2">
                                    {
                                        currentClass?.attachments?.map(attachItem => (
                                            <div
                                                key={attachItem.filename}
                                                className="flex items-center cursor-pointer border-2 w-[280px] px-4 py-1 rounded-md my-2 text-left shadow-sm hover:border-blue-400"
                                                onClick={() => donwloadFile(attachItem?.filename, attachItem?.originalname)}
                                            >
                                                <img src="/doc-icon.svg" className="w-[20px] mr-1" alt="" />
                                                <h3>{attachItem.originalname}</h3>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <button
                                className="p-2 border-2 border-blue-400 text-blue-500 mt-2 w-[280px] font-medium rounded-sm transition hover:scale-[1.02]"
                                onClick={() => closeModal()}
                            >
                                Fechar Detalhes
                            </button>
                        </div>
                        <div className="w-[60%] flex justify-center items-center p-4">
                            <iframe
                                className="border-4 border-gray-400 rounded-md"
                                src={`https://drive.google.com/file/d/${currentClass?.videoUrl}/preview`}
                                width="90%"
                                height="350px"
                                allow="autoplay"
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                visible={isVisibleClass}
                closeModal={closeModal}
            />
        </>
    )
}