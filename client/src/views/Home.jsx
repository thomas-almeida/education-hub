
import { useEffect, useState } from "react"
import SideBar from "../components/SideBar"
import axios from 'axios'
import Screens from "./screens"

export default function Home() {

  const [userData, setUserData] = useState('')
  const [activeScreen, setActiveScreen] = useState('menu')

  useEffect(() => {

    async function getUserData() {
      let url = window.location
      let userId = new URLSearchParams(url.search).get('id')
      const response = await axios.get(`http://localhost:3000/users/get-user-by-id/${userId}`)
      setUserData(response.data?.user)
    }

    getUserData()

  }, [])

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center h-svh">
          <SideBar
            userEmail={userData?.email}
            userName={userData?.name}
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />
        </div>
        <div className="w-[100%] bg-[#fcfbf9]">
          <div className="flex items-center px-8 py-3">
            <h1 className="text-2xl font-bold italic text-blue-500">EDU.HUB</h1>
          </div>
          <div className="p-8 flex items-center justify-center h-[90vh]">
            <Screens
              activeScreen={activeScreen}
            />
          </div>
        </div>
      </div>
    </>
  )
}