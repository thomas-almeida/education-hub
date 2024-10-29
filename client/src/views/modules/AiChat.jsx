/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

//import { useEffect, useState } from "react"
//import axios from "axios"
//import baseUrl from '../utils/baseUrl'

export default function AiChat({
    visible,
    userData,
    setActiveScreen,
    activeScreen
}) {


    return (
        <>
            <div className={visible ? `flex justify-center items-center w-[90%] class-container` : `hidden`}>
                <div className="flex justify-center items-center w-full">
                    <div className="p-6 h-[80vh] w-[85%] flex justify-center items-center ">
                        <div className="w-full">
                            <div className={`${userData?.chatHistory?.length > 0 ? 'hidden' : ''} p-4 my-6 flex justify-center items-center flex-col`}>
                                <img src="/edu-hub-logo.png" className="w-[100px]" alt="" />
                                <h1 className="font-semibold text-2xl py-1 text-slate-500">Edu</h1>
                                <p className="font-semibold text-sm text-center w-[32%] text-slate-400">
                                    {`Olá ${userData?.name} Me diga suas dúvidas sobre as aulas, vamos ajudar você!`}
                                </p>
                            </div>
                            <div
                                className="border h-[80vh] mb-2 p-4 overflow-y-auto hidden"
                            >
                                {
                                    userData?.chatHistory?.map((chatObj) => (
                                        <div
                                            key={chatObj?.id}
                                            className="relative p-4 px-8 h-[100%] border"
                                        >
                                            <div
                                                className={`absolute right-0 border shadow-md bg-blue-400 p-4 rounded-md`}
                                            >
                                                <p className="text-sm font-semibold text-white">
                                                    {
                                                        chatObj?.userMessage?.contents[0]?.parts[0]?.text
                                                    }
                                                </p>
                                            </div>
                                            <div
                                                className={`absolute left-0 border shadow-md bg-slate-600 p-4 rounded-md w-[60%]`}
                                            >
                                                <p className="text-sm font-semibold text-white">
                                                    {
                                                        chatObj?.aiResult?.response?.candidates[0]?.content?.parts[0]?.text
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex justify-center items-center ">
                                <div
                                    className={`flex items-center relative w-[55%] ${userData?.paymentStatus !== 1 ? 'bg-[#f4f4f4]' : 'bg-white'}  border shadow-lg rounded-lg px-4 py-4`}
                                >
                                    <textarea
                                        style={{
                                            resize: 'none'
                                        }}
                                        rows={1}
                                        className="w-[90%] text-sm outline-none"
                                        aria-multiline={true}
                                        disabled={userData?.paymentStatus !== 1}

                                    >
                                    </textarea>

                                    <img
                                        src="/arrow.svg"
                                        className="w-[40px] border rounded-full p-2 shadow-md absolute right-[10px] bg-[#878787df] cursor-pointer"
                                        onClick={() => alert('aa')}
                                    />
                                </div>
                            </div>
                            <div
                                className={userData?.paymentStatus === 1 ? 'hidden' : 'flex justify-center items-center'}
                            >
                                <p className="w-[40%] text-center mt-6 text-yellow-500 rounded-full border font-semibold">Chat Indisponível no seu plano atual</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}