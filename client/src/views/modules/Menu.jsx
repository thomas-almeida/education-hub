/* eslint-disable react/prop-types */
export default function Menu(props) {
    return (
        <>
            <div className={props.visible ? `flex items-center justify-center` : `hidden`}>
                <div className="flex items-center rounded-md border-2 shadow-sm w-[85%] bg-white cursor-pointer transition hover:scale-[1.02]">
                    <div className="p-12">
                        <div className="flex items-center">
                            <img src="/excel-2.png" className="w-[60px] mr-2" alt="" />
                            <h1 className="text-3xl font-semibold w-[40%] leading-8">Excel Avançado BigData</h1>
                        </div>
                        <p className="py-4 w-[70%]">Entender o funcionamento da ferramenta e seus contextos, como usar ela de forma profissional para diversos casos de uso, fazendo de nós profissionais altamente qualificados.</p>

                        <div className="border mt-2 h-[6px] rounded-sm">
                            <div className="bg-green-600 w-[10%] h-[5px] rounded-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}