import { useEffect, useState } from "react"

export default function Breadcrumb({
  setActiveScreen,
  activeScreen
}) {

  const [breadlink, setBreadLink] = useState('')

  useEffect(() => {

    async function translateActiveScreen() {

      if (activeScreen === 'class') {
        setBreadLink('Aulas')
        return
      } else if (activeScreen === 'menu') {
        setBreadLink('')
        return
      }

      setBreadLink('Exercícios')
    }

    translateActiveScreen()

  }, [activeScreen])

  return (
    <>
      <div className="p-1 my-4 border w-[180px] bg-white rounded-md flex justify-center items-center list-none">
        <li 
          className="font-semibold cursor-pointer px-2 hover:text-blue-500 text-center"
          onClick={() => setActiveScreen('menu')}
        >
          {
            breadlink !== '' ? 'Início >' : 'Início'
          }
        </li>
        <li
        >
          {
            breadlink
          }
        </li>
      </div>
    </>
  )
}