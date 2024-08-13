/* eslint-disable react/prop-types */

import Class from "./modules/Class"
import Exercises from "./modules/Exercise"
import Menu from "./modules/Menu"

export default function Screens({ activeScreen }) {
    return (
        <>
            {activeScreen === 'menu' && <Menu visible={true} />}
            {activeScreen === 'class' && <Class visible={true} />}
            {activeScreen === 'exercises' && <Exercises visible={true} />}
        </>
    )
}