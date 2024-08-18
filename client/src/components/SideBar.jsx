/* eslint-disable react/prop-types */
export default function SideBar(
    {
        setActiveScreen,
        activeScreen,
        userName,
        userEmail,
        userTag
    }
) {

    function translateRole(role) {
        return role === 'STUDENT' ? 'Aluno(a)' : 'Professor(a)'
    }

    return (
        <div className="bg-white text-black h-svh w-[220px] border">
            <div className="flex items-center px-4 py-6">
                <div className="">
                    <div className="flex items-center">
                        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis w-[100%] mr-1 font-semibold text-xl">
                            {userName}
                        </h2>
                    </div>
                    <div className="flex items-center font-normal">
                        <b className="border-gray-500 rounded-sm font-medium text-sm italic whitespace-nowrap overflow-hidden text-ellipsis w-[80%] text-slate-500">
                            {userEmail}
                        </b>
                    </div>
                    <div className="flex items-center font-normal">
                        <b className="border-2 border-gray-300 px-4 rounded-md font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis text-slate-500 mt-2">
                            {translateRole(userTag)}
                        </b>
                    </div>
                </div>
            </div>
            <div className="px-4 mt-8">
                <ul>
                    <li
                        className={`p-2 my-2 cursor-pointer font-semibold text-lg hover:text-blue-500 ${activeScreen === 'menu' ? 'text-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveScreen('menu')}
                    >
                        <a href="#">Início</a>
                    </li>
                    <li
                        className={`p-2 my-2 cursor-pointer font-semibold text-lg hover:text-blue-500 ${activeScreen === 'class' ? 'text-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveScreen('class')}
                    >
                        <a href="#">
                            {
                                `${userTag === 'STUDENT' ? 'Minhas Aulas' : 'Aulas'}`
                            }
                        </a>
                    </li>
                    <li
                        className={`p-2 my-2 cursor-pointer font-semibold text-lg hover:text-blue-500 ${activeScreen === 'exercises' ? 'text-blue-500 font-bold' : ''}`}
                        onClick={() => setActiveScreen('exercises')}
                    >
                        <a href="#">Exercícios</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
