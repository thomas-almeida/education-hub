/* eslint-disable react/prop-types */
import axios from "axios"
import { useState } from "react"
import baseUrl from "../views/utils/baseUrl"

export default function Modal({ visible, closeModal }) {

  const [selectedFiles, setSelectedFiles] = useState([])

  const [className, setClassName] = useState('')
  const [classDescription, setClassDescription] = useState('')
  const [classDate, setClassDate] = useState('')
  const [classUrl, setClassUrl] = useState('')

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
  }

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    )
  }

  async function createClass() {

    const formData = new FormData()
    formData.append("name", className)
    formData.append("description", classDescription)
    formData.append("schedule", classDate)
    formData.append("videoUrl", classUrl)
    selectedFiles.forEach((file) => formData.append("files", file))

    if (className === '' || classDescription === '' || classDate === '') {
      alert('Preencha os campos obrigatórios')
      return
    }

    try {
      const response = await axios.post(`${baseUrl.productionUrl}/users/admin/create-class`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      alert(response.data.message)
      closeModal('classes')
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div
        className={
          visible
            ? `absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-[#0000004e]`
            : `hidden`
        }
      >
        <div className="bg-white p-10 rounded-md shadow-lg">
          <h1 className="text-lg mb-4 font-semibold">Criar Nova Aula</h1>
          <form className=" block">
            <input
              type="text"
              name="name"
              placeholder="Título da Aula"
              className="border w-[100%] rounded-sm p-2 my-1"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Breve descrição"
              className="border w-[100%] rounded-sm p-2 my1"
              rows={3}
              value={classDescription}
              onChange={(e) => setClassDescription(e.target.value)}
            ></textarea>

            <div className="mt-2">
              <p>ID da Aula no <b className="font-semibold">Google Drive</b></p>
              <input
                type="text"
                name="videoUrl"
                className="border w-[100%] rounded-sm p-2 my-1"
                placeholder="ex: Insira o ID do Google Drive"
                value={classUrl}
                onChange={(e) => setClassUrl(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <p>Data da Aula</p>
              <input
                type="date"
                name="schedule"
                className="border w-[100%] rounded-sm p-2 my-1"
                value={classDate}
                onChange={(e) => setClassDate(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <p>Materiais de Apoio</p>
              <div className="border-dashed border-2 border-gray-300 rounded-md p-6 text-center relative cursor-pointer hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  name="files"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  multiple
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center">
                  <p className="mt-1 text-sm text-gray-500">
                    Arraste e Solte os arquivos ou <span className="text-blue-600">Escolha do Computador</span>
                  </p>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-2">
                  <ul className="list-none mt-2 grid grid-cols-2 overflow-y-auto max-h-[100px]">
                    {selectedFiles.map((file, index) => (
                      <li
                        key={index}
                        className="text-gray-600 cursor-pointer border my-1 max-w-[270px] py-1 px-2 rounded-md hover:border-blue-500 hover:shadow-lg"
                        onClick={() => handleRemoveFile(index)}
                      >
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </form>

          <div className="">
            <button
              className="p-2 border-2 bg-blue-500 text-white mt-2 w-[280px] font-medium rounded-sm transition hover:scale-[1.02] mr-1"
              onClick={() => createClass()}
            >
              Criar Nova Aula
            </button>
            <button
              className="p-2 border-2 border-blue-400 text-blue-500 mt-2 w-[280px] font-medium rounded-sm transition hover:scale-[1.02] ml-1"
              onClick={() => closeModal('classes')}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
