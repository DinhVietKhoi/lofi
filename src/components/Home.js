import React, { useEffect, useState } from 'react'
import day from '../assets/video/home/morning.mp4'
import dayRain from '../assets/video/home/dayRain.mp4'
import night from '../assets/video/home/night.mp4'
import nightRain from '../assets/video/home/nightRain.mp4'
import exit from '../assets/exit.gif'
import '../sass/home.scss'
function Home({ weather, status,changeStreet ,street }) {
    const [classContainer, setClassContainer] = useState('home__container day')
    const [zindexDay,setZindexDay] = useState(0)
    const [zindexNight,setZindexNight] = useState(0)
    const [zindexDayRain,setZindexDayRain] = useState(0)
    const [zindexNightRain, setZindexNightRain] = useState(0)
    const [showPage,setShowPage] = useState("home")
    useEffect(() => {
        if (weather === 'cloud' && status === 'sun') {
            setClassContainer('home__container day')
            setZindexDay(1)
            setZindexNight(0)
            setZindexDayRain(0)
            setZindexNightRain(0)
        }
        if (weather === 'cloud-rain' && status === 'sun') {
            setClassContainer('home__container dayRain')
            setZindexDay(0)
            setZindexNight(0)
            setZindexDayRain(1)
            setZindexNightRain(0)
        }
        if (weather === 'cloud' && status === 'moon') {
            setClassContainer('home__container night')
            setZindexDay(0)
            setZindexNight(1)
            setZindexDayRain(0)
            setZindexNightRain(0)
        }
        if (weather === 'cloud-rain' && status === 'moon') {
            setClassContainer('home__container nightRain')
            setZindexDay(0)
            setZindexNight(0)
            setZindexDayRain(0)
            setZindexNightRain(1)
        }
    }, [weather, status])
    useEffect(() => {
        if (street) {
            setShowPage("home show")
        }
        else {
            setShowPage("home")
        }
    },[street])
    return (
        <div className={showPage}>
            <div className={classContainer}>
                <div className='home__goHome'>
                    <img src={exit} onClick={changeStreet}></img>
                    <div className='home__note'>GO OUT</div>
                </div>
                <div className="home__video" style={{zIndex:zindexDay}}>
                    <video className='home__video--day'
                        src={day}
                        loop
                        autoPlay
                        muted
                        // hidden={ hideDay}
                    >
                    </video>
                </div>
                <div className="home__video1" style={{zIndex:zindexDayRain}}>
                    <video className='home__video--dayRain'
                        src={dayRain}
                        loop
                        autoPlay
                        muted
                        // hidden={hideDayRain}
                    >
                    </video>
                </div>
                <div className="home__video2" style={{zIndex:zindexNight}}>
                    <video className='home__video--night'
                        src={night} 
                        loop 
                        autoPlay 
                        muted
                        // hidden={hideNight}
                    >
                    </video>
                </div>
                <div className="home__video3" style={{zIndex:zindexNightRain}}>
                    <video className='home__video--nightRain'
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

export default Home
