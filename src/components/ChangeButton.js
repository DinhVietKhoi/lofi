import React, { useEffect, useState } from 'react'
import '../sass/changeButton.scss'

function ChangeButton({ type, handleChange, handleRain, handleKeyBoard,checkKeyBoard,street}) {
    
    const [classContainer,setClassContainer] = useState('changeButton__container')
    const handleControls = () => {
        handleRain && handleRain()
        handleKeyBoard&&handleKeyBoard()
        handleChange()
        classContainer === 'changeButton__container'
            ? setClassContainer('changeButton__container active')
            :setClassContainer('changeButton__container')
    }
    useEffect(() => {
        if (checkKeyBoard) {
            classContainer === 'changeButton__container'
            ? setClassContainer('changeButton__container active')
            :setClassContainer('changeButton__container')
        }
    },[street])
    return (
        <div className="changeButton">
            <div className={classContainer} onClick={handleControls}>
                <div className='dot'></div>
                {
                    type === 'keyboard_mute'
                        ?<i className={`fa-solid fa-keyboard mute`}></i>
                        :type === 'keyboard'
                        ?<i className={`fa-solid fa-${type}`}></i>
                        :<i className={`fa-solid fa-${type}`}></i>
                }
                
                {/* <i class="fa-solid fa-sun"></i>
                <i class="fa-solid fa-cloud"></i>
                <i class="fa-solid fa-cloud-rain"></i> */}
            </div>
        </div>
    )
}

export default ChangeButton