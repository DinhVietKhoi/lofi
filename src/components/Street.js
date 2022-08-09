import React, { useEffect, useRef, useState } from 'react'
import day from '../assets/video/street/morning.mp4'
import dayRain from '../assets/video/street/dayRain.mp4'
import night from '../assets/video/street/night.mp4'
import nightRain from '../assets/video/street/nightRain.mp4'
import key from '../assets/key.gif'
import '../sass/street.scss'
function Street({ weather, status, changeStreet, street }) {
    const [classContainer, setClassContainer] = useState('street__container day')
    const [zindexDay,setZindexDay] = useState(0)
    const [zindexNight,setZindexNight] = useState(0)
    const [zindexDayRain,setZindexDayRain] = useState(0)
    const [zindexNightRain,setZindexNightRain] = useState(0)
    const [hidePage, setHidePage] = useState("street")

    const [checkDay,setCheckDay] = useState(true)
    const [checkNight,setCheckNight] = useState(true)
    const [checkDayRain,setCheckDayRain] = useState(true)
    const [checkNightRain, setCheckNightRain] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            zindexDay!=1?setCheckDay(true):setCheckDay(false)
            zindexNight!=1?setCheckNight(true):setCheckNight(false)
            zindexDayRain!=1?setCheckDayRain(true):setCheckDayRain(false)
            zindexNightRain!=1?setCheckNightRain(true):setCheckNightRain(false)
        }, 100)
    },[zindexDay,zindexNight,zindexDayRain,zindexNightRain])
    useEffect(() => {
        if (weather === 'cloud' && status === 'sun') {
            setClassContainer('street__container day')
            setZindexDay(1)
            setTimeout(() => {
                setZindexNight(0)
                setZindexDayRain(0)
                setZindexNightRain(0)
            },100)
        }
        if (weather === 'cloud-rain' && status === 'sun') {
            setClassContainer('street__container dayRain')
            setZindexDayRain(1)
            setTimeout(() => {
                setZindexNight(0)
                setZindexNightRain(0)
                setZindexDay(0)
            },100)
        }
        if (weather === 'cloud' && status === 'moon') {
            setClassContainer('street__container night')
            setZindexNight(1)
            setTimeout(() => {
                setZindexDayRain(0)
                setZindexNightRain(0)
            setZindexDay(0)

            },100)
        }
        if (weather === 'cloud-rain' && status === 'moon') {
            setClassContainer('street__container nightRain')
            
            setZindexNightRain(1)
            setTimeout(() => {
                setZindexDay(0)
                setZindexNight(0)
                setZindexDayRain(0)
            },100)
        }
        
    }, [weather, status])
    useEffect(() => {
        if (street) {
            setHidePage("street hide")
        }
        else {
            setHidePage("street")
        }
    },[street])
    return (
        <div className={hidePage}>
            <div className={classContainer}>
                <div className='street__goHome'>
                    <img src={key} onClick={changeStreet}></img>
                    <div className='street__note'>GO HOME</div>
                </div>
                <div className="street__video" style={checkDay ? { zIndex: zindexDay, display: "none" } : {zIndex: zindexDay, display: "block"}}>
                    <video className='street__video--day'
                        src={day}
                        loop
                        autoPlay
                        muted
                        // hidden={ hideDay}
                    >
                    </video>
                </div>
                <div className="street__video1" style={checkDayRain ? { zIndex: zindexDayRain, display: "none" } : {zIndex: zindexDayRain, display: "block"}} >
                    <video className='street__video--dayRain'
                        src={dayRain}
                        loop
                        autoPlay
                        muted
                        width='100%'
                        height='100%'
                        // hidden={hideDayRain}
                    >
                    </video>
                </div>
                <div className="street__video2" style={ checkNight? { zIndex: zindexNight, display: "none" } : {zIndex: zindexNight, display: "block"}}>
                <video className='street__video--night'
                    src={night} 
                    loop 
                    autoPlay 
                    muted
                    // hidden={hideNight}
                >
                </video>
                    </div>
                <div className="street__video3" style={checkNightRain ? { zIndex: zindexNightRain, display: "none" } : {zIndex: zindexNightRain, display: "block"}}>
                    <video className='street__video--nightRain'
                        src={nightRain} 
                        loop 
                        autoPlay 
                        muted
                        // hidden={hideNightRain}
                    >
                    </video>
                </div>
                
            </div>
        </div>
    )
}

export default Street