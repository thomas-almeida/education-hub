import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

import baseUrl from './utils/baseUrl'

export default function SignIn() {

    const redirect = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const userPayload = {
        username: username,
        password: password
    }

    const [alertInfo, setAlertInfo] = useState('')

    async function signInUser(event) {

        event.preventDefault()

        try {

            const response = await axios.post(`${baseUrl.productionUrl}/users/sign-in`, userPayload)
            localStorage.setItem('userData', JSON.stringify(response.data.user))
            redirect(`/home?id=${response.data.user?.id}`)

        } catch (error) {
            console.error(error)
            setAlertInfo(error)
            alert(alertInfo)
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-[50%]">
                    <div className="flex items-center justify-center">
                        <img
                            src="/edu-hub-logo.png"
                            className="w-[50px] relative top-1"
                        />
                        <h1 className="text-4xl font-semibold text-blue-500">edu.hub</h1>
                    </div>
                    <div className="mt-5">
                        <form className="" onSubmit={signInUser}>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm"
                                placeholder="Nome de Usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="border w-[100%] my-2 p-2 rounded-sm"
                                placeholder="Escolha uma senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="submit"
                                className="border w-[100%] my-2 p-2 rounded-sm bg-blue-500 text-white font-medium cursor-pointer"
                                value="Entrar"
                            />
                            <p className="text-center mt-4">
                                Ainda sem login?
                                <NavLink to={"/sign-up"}>
                                    <b className="font-semibold text-blue-500"> crie um agora!</b>
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}