import { useState } from "react"
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom"

import baseUrl from './utils/baseUrl'

export default function SignUp() {

    // Navigate
    const redirect = useNavigate()


    // Payload States
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // SignUp Payload
    const userPayload = {
        username: username,
        name: name,
        email: email,
        password: password,
    }

    const [alertInfo, setAlertInfo] = useState('')

    // create User
    async function createUser(event) {

        event.preventDefault()

        try {
            console.log(userPayload)
            const response = await axios.post(`${baseUrl.productionUrl}/users/sign-up`, userPayload)
            redirect(`/home?id=${response.data.id}`)

        } catch (error) {

            setAlertInfo(console.error)
            alert(alertInfo)
            console.error(error)

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
                        <form className="" onSubmit={createUser}>
                            <p className="text-blue-500 font-medium">Dados de Login</p>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Nome de Usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Seu Nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Seu Melhor Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <p className="text-blue-500 font-medium">Senha</p>
                            <input
                                type="password"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Escolha uma senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="submit"
                                className="border w-[100%] my-2 p-2 py-3 rounded-sm bg-blue-500 text-white font-medium cursor-pointer"
                                value="Registrar Aluno"
                            />
                            <p className="text-center mt-4">
                                Já tem conta?
                                <NavLink to={"/"}>
                                    <b className="font-semibold text-blue-500"> faça login aqui.</b>
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}