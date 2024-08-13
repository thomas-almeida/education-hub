/* eslint-disable react/prop-types */

import { useState } from "react"

export default function ClassModal({ isVisible }) {

    const [isVisibleModal, setIsVisible] = useState(true)

    function closeModal() {
        setIsVisible(false)
    }

    return (
        <>
            <div className={isVisibleModal && isVisible ? `flex items-center justify-center absolute top-0 left-0 h-[100vh] w-[100%] bg-[#0000008e]` : `hidden`}>
                <div className="p-6">
                    <h1>Modal</h1>
                    <button
                        className="p-6"
                        onClick={() => closeModal(isVisible)}
                    >
                        close
                    </button>
                </div>
            </div>
        </>
    )
}