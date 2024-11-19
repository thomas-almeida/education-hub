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
                <div className="p-4 border border-slate-200">
                    <div className="border flex justify-center flex-col text-center">
                        <h1>Challenges</h1>
                        <p className="border">
                            Crie novos exercícios para treinar os conhecimentos no seu curso
                        </p>
                    </div>
                    <div className="border rounded bg-slate-100 p-4 mt-2">

                    </div>
                </div>
            </div>
        </>
    )
}