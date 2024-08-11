export default function SideBar(
    {
        setActiveScreen,
        activeScreen,
        userName,
        userFrequency
    }
) {
    return (
        <div className="bg-[#1d1d1d] h-svh w-[350px]">
            <div className="flex items-center px-4 py-6">
                <div className="">
                    <div className="flex items-center">
                        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis w-[110px] mr-1 font-bold text-xl">
                            {userName}
                        </h2>
                    </div>
                    <div className="flex items-center font-normal">
                        <b className="border border-gray-500 px-3 rounded-sm font-medium text-sm text-gray-300">
                            {userFrequency.toFixed(2)}%
                        </b>
                    </div>
                </div>
            </div>
            <div className="px-4 mt-8 text-gray-400">
                <ul>
                    <li
                        className={`p-2 my-2 cursor-pointer font-normal text-lg hover:text-white ${activeScreen === 'menu' ? 'text-white font-bold' : ''}`}
                        onClick={() => setActiveScreen('menu')}
                    >
                        <a href="#">Início</a>
                    </li>
                    <li
                        className={`p-2 my-2 cursor-pointer font-normal text-lg hover:text-white ${activeScreen === 'team' ? 'text-white font-bold' : ''}`}
                        onClick={() => setActiveScreen('classes')}
                    >
                        <a href="#">Minhas Aulas</a>
                    </li>
                    <li
                        className={`p-2 my-2 cursor-pointer font-normal text-lg hover:text-white ${activeScreen === 'packs' ? 'text-white font-bold' : ''}`}
                        onClick={() => setActiveScreen('exercises')}
                    >
                        <a href="#">Exercícios</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
