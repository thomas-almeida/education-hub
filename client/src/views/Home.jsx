
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SideBar from "../components/SideBar"
import axios from 'axios'
import Screens from "../components/screens"
import baseUrl from './utils/baseUrl.js'


export default function Home() {

  const redirect = useNavigate()
  const [userData, setUserData] = useState('')
  const [coursesList, setCoursesList] = useState([])
  const [activeScreen, setActiveScreen] = useState('menu')

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

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {

    async function getCourses() {

        if (userData && userData?.id) {
            const userId = userData?.id

            if (userData.role === 'ADMIN') {
                const response = await axios.get(`${baseUrl.productionUrl}/users/admin/courses/get-courses-by-instructor-id/${userId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                })
                setCoursesList(response.data?.courses)
            } else {
                const response = await axios.get(`${baseUrl.productionUrl}/users/admin/courses/get-courses-by-student-id/${userData?.courseId}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true"
                    }
                })
                setCoursesList(response.data?.courses)
            }
        }

    }

    getCourses()

}, [userData])


  function logOffUser() {
    localStorage.clear()
    redirect('/')
  }

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center h-svh home-container">
          <SideBar
            userEmail={userData?.username}
            userName={userData?.name}
            userTag={userData?.role}
            userId={userData?.id}
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
            coursesList={coursesList}
          />
        </div>
        <div className="w-[100%] screens">
          <div className="flex items-center px-8 py-3 justify-end">
            <div
              className="p-1 px-2 border-2 rounded-md mt-2 mr-6 cursor-pointer transition hover:border-[#f92f60] hover:scale-[1.02]"
              onClick={() => logOffUser()}
            >
              <p className="text-[10pt]"> <b className="text-[8pt]">❌</b> Sair do App</p>
            </div>
            <img src="/edu-hub-logo.png" className="w-[30px] mr-1 relative top-1" alt="" />
            <h1 className="text-2xl font-semibold text-blue-500">edu.hub</h1>
          </div>
          <div className="p-8 flex items-center justify-center h-[90vh] screens-container">
            <Screens
              setActiveScreen={setActiveScreen}
              activeScreen={activeScreen}
              userData={userData}
              refreshData={getUserData}
              coursesList={coursesList}
            />
          </div>
        </div>
      </div>
    </>
  )
}