 
/* eslint-disable react/prop-types */

//import { useEffect, useState } from "react"
import Class from "../views/modules/Class"
import Exercises from "../views/modules/Exercise"
import Menu from "../views/modules/Menu"

export default function Screens({ activeScreen, userData, setActiveScreen }) {

    return (
        <>
            {activeScreen === 'menu' && <Menu visible={true} userData={userData} setActiveScreen={setActiveScreen} activeScreen={activeScreen} />}
            {activeScreen === 'class' && <Class visible={true} userData={userData} setActiveScreen={setActiveScreen} activeScreen={activeScreen} />}
            {activeScreen === 'exercises' && <Exercises visible={true} setActiveScreen={setActiveScreen} activeScreen={activeScreen} />}
        </>
    )
}