/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import axios from "axios"

export default function Class(props) {

    const [classListData, setClassList] = useState([])

    useEffect(() => {

        async function getClasses() {
            const response = await axios.get('http://localhost:3000/classes/get-classes')
            setClassList(response.data?.classes)
        }

        getClasses()

    }, [])

    return (
        <>
            <div className={props.visible ? `flex items-center w-[75%]` : `hidden`}>
                <div className="flex items-center">
                    <div className="p-6 overflow-y-scroll h-[80vh]">
                        {
                            classListData.map(classItem => (
                                <li
                                    key={classItem?.id}
                                    className="list-none border bg-white p-4 rounded-md shadow-md cursor-pointer my-3 transition hover:scale-[1.03]"
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
                                        className="w-[85%] py-2"
                                    >
                                        {classItem?.description}
                                    </p>
                                    <b className="font-semibold">
                                        📅 {classItem?.schedule}
                                    </b>
                                    <div className="pt-2 border-2 p-2 mt-2 rounded-md">
                                        <b className="font-semibold">Materiais de Apoio</b>
                                        <div className="flex items-center mt-2">
                                            {
                                                classItem?.attachments.map(attachItem => (
                                                    <div
                                                        key={attachItem.filename}
                                                        className="flex items-center justify-center cursor-pointer border w-auto px-4 py-1 rounded-md mr-2"
                                                    >
                                                        <img src="/doc-icon.svg" className="w-[20px] mr-1" alt="" />
                                                        <h3>{attachItem.originalname}</h3>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}