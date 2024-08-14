/* eslint-disable react/prop-types */
export default function Menu(props) {
    return (
        <>
            <div className={props.visible ? `flex items-center justify-center` : `hidden`}>
                <div className="flex flex-col items-center">
                    <div className="flex justify-start w-[85%] mb-4">
                        <h2 className="w-auto text-left text-2xl font-semibold">Meus Cursos</h2>
                    </div>
                    <div className="flex items-center rounded-md border-2 shadow-sm w-[85%] bg-white">
                        <div className="p-12 h-[350px]">
                            <div className="flex items-center relative left-[-12px]">
                                <img src="/excel-2.png" className="w-[60px] mr-2" alt="" />
                                <h1 className="text-3xl font-semibold w-[40%] leading-8">Excel Avançado BigData</h1>
                            </div>
                            <div className="flex items-center py-4">
                                <img src="/profile-pic.jpeg" className="w-[50px] rounded-3xl mr-1 shadow-md border-2 object-cover" alt="" />
                                <div className="relative top-1">
                                    <h3 className="text-lg font-medium leading-3">Thomas Almeida</h3>
                                    <p>Instrutor</p>
                                </div>
                            </div>
                            <p className="py-1 w-[70%] text-slate-700 font-medium italic">Entender o funcionamento da ferramenta e seus contextos, como usar ela de forma profissional para diversos casos de uso, fazendo de nós profissionais altamente qualificados.</p>

                            <div className="border-2 mt-2 h-[9px] w-[550px] bg-gray-100 rounded-md">
                                <div className="bg-green-600 w-[20%] h-[5px] rounded-md"></div>
                                <p className="border-2 w-[130px] text-center mt-2 rounded-md shadow-sm bg-gray-100 text-green-600 font-medium">02 de 10 Aulas</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-start w-[85%] py-4 mt-1">
                        <div className="border-2 rounded-md p-8 w-[300px] mr-2 bg-white">
                            <h3 className="text-lg font-medium pb-2">Frequência</h3>
                            <h1 className="text-3xl font-semibold">100 %</h1>
                            <p>📈 Aulas participadas: <b>2</b></p>
                        </div>
                        <div className="border-2 rounded-md p-8 w-[300px] mr-2 bg-white">
                            <h3 className="text-lg font-medium pb-2">Próxima Aula</h3>
                            <div className="flex">
                                <div>
                                    <h1 className="text-3xl font-semibold">26/08/2024</h1>
                                    <p>📅 Segunda-Feira</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}