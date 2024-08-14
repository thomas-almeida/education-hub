/* eslint-disable react/prop-types */

import Class from "../views/modules/Class"
import Exercises from "../views/modules/Exercise"
import Menu from "../views/modules/Menu"

export default function Screens({ activeScreen }) {
    return (
        <>
            {activeScreen === 'menu' && <Menu visible={true} />}
            {activeScreen === 'class' && <Class visible={true} />}
            {activeScreen === 'exercises' && <Exercises visible={true} />}
        </>
    )
}