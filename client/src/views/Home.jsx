
import { useEffect, useState } from "react"
import SideBar from "../components/SideBar"
import axios from 'axios'
import Screens from "../components/screens"
import baseUrl from './utils/baseUrl.js'


export default function Home() {

  const [userData, setUserData] = useState('')
  const [activeScreen, setActiveScreen] = useState('menu')

  useEffect(() => {

    async function getUserData() {
      let url = window.location
      let userId = new URLSearchParams(url.search).get('id')
      const response = await axios.get(`${baseUrl.productionUrl}/users/get-user-by-id/${userId}`, {
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      })
      setUserData(response.data?.user)
    }

    getUserData()   

  }, [])

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center h-svh">
          <SideBar
            userEmail={userData?.username}
            userName={userData?.name}
            userTag={userData?.role}
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />
        </div>
        <div className="w-[100%] bg-[#fcfbf9]">
          <div className="flex items-center px-8 py-3 justify-end">
            <img src="/edu-hub-logo.png" className="w-[30px] mr-1 relative top-1" alt="" />
            <h1 className="text-2xl font-semibold text-blue-500">edu.hub</h1>
          </div>
          <div className="p-8 flex items-center justify-center h-[90vh]">
            <Screens
              setActiveScreen={setActiveScreen}
              activeScreen={activeScreen}
              userData={userData}
            />
          </div>
        </div>
      </div>
    </>
  )
}