import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

export default function SignIn() {

    const redirect = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const userPayload = {
        username: username,
        password: password
    }

    const serverEndpoint = 'http://localhost:3000'
    const [alertInfo, setAlertInfo] = useState('')

    async function signInUser(event) {

        event.preventDefault()

        try {

            const response = await axios.post(`${serverEndpoint}/users/sign-in`, userPayload)
            console.log(response.data.user)
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
                <div className="w-[85%]">
                    <div className="text-center">
                        <h1>Sign In</h1>
                        <p>Entrar</p>
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
                                className="border w-[100%] my-2 p-2 rounded-sm bg-purple-600 text-white font-medium"
                                value="Entrar"
                            />
                            <p className="text-center mt-4">
                                Ainda não tem o site de voces?,
                                <NavLink to={"/sign-up"}>
                                    <b className="font-semibold text-purple-600"> crie um agora!</b>
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}