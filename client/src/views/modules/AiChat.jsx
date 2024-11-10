/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import baseUrl from '../utils/baseUrl'
import Markdown from 'react-markdown'

export default function AiChat({
    visible,
    userData,
    setActiveScreen,
    activeScreen,
    refreshData
}) {


    const [userPrompt, setUserPrompt] = useState('')
    const chatEndsRef = useRef(null)
    const chatContainer = useRef(null)

    const promptPayload = {
        prompt: {
            contents: [
                {
                    parts: [
                        {
                            text: userPrompt
                        }
                    ]
                }
            ]
        },
        userId: userData?.id
    }

    async function askToGemini() {
        try {
            const response = await axios.post(`${baseUrl.productionUrl}/chat/ask-to-edu`, promptPayload)
            setUserPrompt('')
            console.log(response.data)
        } catch (error) {
            console.error(error)
        } finally {
            refreshData()
            scrollToBottom()
        }
    }

    function scrollToBottom() {
        chatEndsRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [userData?.chatHistory])

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
                                    {`Olá @${userData?.name}!, Me diga suas dúvidas sobre as aulas, vamos ajudar você!`}
                                </p>
                            </div>
                            <div
                                className={`${userData?.chatHistory?.length > 0 ? 'h-[80vh] mb-2 p-4 overflow-y-auto scroll-smooth relative' : 'hidden'}`}
                                ref={chatContainer}
                            >
                                {
                                    userData?.chatHistory?.map((chatObj) => (
                                        <div
                                            key={chatObj?.id}
                                            className="relative p-4 px-8"
                                        >
                                            <div className='relative'>
                                                <div className='flex justify-end'>
                                                    <div
                                                        className={`shadow-md bg-blue-400 p-4 rounded-md max-w-[65%]`}
                                                    >
                                                        <p className="text-sm font-semibold text-white">
                                                            {
                                                                chatObj?.userMessage?.contents[0]?.parts[0]?.text
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='flex justify-start mt-6'>
                                                    <div
                                                        className={`shadow-lg bg-white p-4 rounded-md max-w-[75%]`}
                                                    >
                                                        <p className="text-sm font-semibold text-black leading-7">
                                                            <Markdown>
                                                                {
                                                                    chatObj?.aiResult?.response?.candidates[0]?.content?.parts[0]?.text
                                                                }
                                                            </Markdown>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div ref={chatEndsRef} />
                            </div>
                            <div
                                className={`hidden absolute bottom-[10%] right-[40%] border-2 px-4 py-2 rounded-md z-[9999] cursor-pointer shadow-md text-white bg-blue-500`}
                                onClick={() => scrollToBottom()}
                            >
                                <p>{chatContainer.current?.scrollTop}</p>
                            </div>
                            <div className="flex justify-center items-center ">
                                <div
                                    className={`flex items-center relative w-[55%] ${userData?.paymentStatus !== 1 ? 'bg-[#f4f4f4] pointer-events-none' : 'bg-white'}  border shadow-lg rounded-lg px-4 py-4`}
                                >
                                    <textarea
                                        style={{
                                            resize: 'none'
                                        }}
                                        rows={1}
                                        className="w-[90%] text-sm outline-none"
                                        aria-multiline={true}
                                        disabled={userData?.paymentStatus !== 1}
                                        onChange={(e) => setUserPrompt(e.target.value)}
                                        value={userPrompt}
                                    >
                                    </textarea>

                                    <img
                                        src="/arrow.svg"
                                        className={`w-[40px] border rounded-full p-2 shadow-md absolute right-[10px] ${userData?.paymentStatus !== 1 ? 'bg-[#878787df]' : 'bg-blue-500'} cursor-pointer`}
                                        onClick={() => askToGemini()}
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