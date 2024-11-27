/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import baseUrl from '../utils/baseUrl'
//import Markdown from 'react-markdown'

export default function Challenges({
    visible,
    userData,
    setActiveScreen,
    activeScreen,
    refreshData
}) {


    const [userPrompt, setUserPrompt] = useState('')

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

    return (
        <>
            <div className={visible ? `flex justify-center items-center w-[90%] class-container` : `hidden`}>
                <div className="p-4 border-slate-200">
                    <div className="flex justify-center flex-col text-center">

                        <div className="text-center flex justify-center">
                            <img src="/edu-hub-logo.png" className="w-[100px]" alt="" />
                        </div>
                        <h1 className="font-semibold text-2xl py-1 text-slate-500">Desafios</h1>
                        <div className="text-center flex justify-center">
                            <p className="font-semibold text-sm text-center w-[50%] text-slate-400">
                                {`Olá @${userData?.name}!, Crie novos exercícios para treinar os conhecimentos no seu curso!`}
                            </p>
                        </div>
                    </div>
                    <div
                        className={userData?.paymentStatus === 1 ? 'hidden' : 'flex justify-center items-center'}
                    >
                        <p className="w-[80%] text-center mt-6 text-red-400 rounded-full border font-semibold">Criação de Desafios Indisponível no seu plano atual</p>
                    </div>
                </div>
            </div>
        </>
    )
}