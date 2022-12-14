import React, { useEffect, useRef, useState } from 'react'
import { ref, set, onValue} from 'firebase/database'
import db from '../firebase'
import User from './User'
import '../sass/controls.scss'
import logo from '../assets/logo.gif'
import volum from '../assets/volume.gif'
import sm from '../assets/settingMusic.gif'
import cb from '../assets/chatBox.gif'
import ChangeButton from './ChangeButton'
import { RiContactsBookLine, RiPlayListLine } from 'react-icons/ri';
import { WiRaindrop } from 'react-icons/wi';
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
import ItemChat from './ItemChat'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Emoji from './Emoji'

// register lottie and define custom element
defineLordIconElement(loadAnimation);
//
// import  SpotifyPlayer from 'react-spotify-web-playback';
function Controls({ listUser, listMusic, weather, status, keyBoard, changeWeather, changeStatus, changeKeyBoard, street, handleLg, handleRg, loginAccount, handleLogout, checkRg, connect }) {
    const rain = useRef()
    const rainData = 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/effects/rain_city.mp3'
    const [checkRain,setCheckRain] = useState(false)
    const handleRain = () => {
        if (!checkRain) { 
            rain.current.play()
            setCheckRain(!checkRain)
        } 
        else {
            setCheckRain(!checkRain)
            rain.current.pause()
        }
    }
    useEffect(() => {
        rain.current.addEventListener('timeupdate', function(){
            if (checkRain) {
                let buffer = 0.9
                if(rain.current.currentTime&&(rain.current.currentTime >rain.current.duration - buffer)){
                    rain.current.currentTime = 0
                    rain.current.play()
                }
            }
        });
    },[checkRain])
    const  keyBoardE = useRef()
    const keyBoardData = 'https://s3.us-east-2.amazonaws.com/lofi.co/lofi.co/effects/keyboard.mp3'
    const [checkKeyBoard,setCheckKeyBoard] = useState(false)
    const handleKeyBoard = () => {
        if (!checkKeyBoard) { 
            keyBoardE.current.play()
            setCheckKeyBoard(!checkKeyBoard)
        } 
        else {
            setCheckKeyBoard(!checkKeyBoard)
            keyBoardE.current.pause()
        }
    }
    useEffect(() => {
    
        if (street&&checkKeyBoard) {
            keyBoardE.current.play();
        }
    }, [street])
    
    //set icon change
    const [pause, setPause] = useState('play')
    //list data
    const [currentMusc, setCurrentMusic] = useState('')
    useEffect(() => {
        listMusic && setCurrentMusic(listMusic[0])
    },[listMusic])
    const [indexCurrent, setIndexCurrent] = useState(0)
    const [checkPlay, setCheckPlay] = useState(false)
    

    const music = useRef()

    //auto loadaudio
    useEffect(() => {
        listMusic&&music.current.addEventListener('ended', function () {
            if (listMusic && indexCurrent == listMusic.length - 1) {
                setIndexCurrent(0)
                setCurrentMusic(listMusic&&listMusic[0])
                if (pause == 'play')
                {
                    setPause('pause')
                    setCheckPlay(!checkPlay)
                }
            }
            else {
                listMusic&&listMusic.map((a, index) => {
                    indexCurrent+1 == index && setCurrentMusic(a)
                })
                setIndexCurrent(indexCurrent + 1)
                if (pause == 'play')
                {
                    setPause('pause')
                    setCheckPlay(!checkPlay)
                }
            }
        });
    }, [music.current, currentMusc, listMusic])
    
    const handlePlay = () => {
        music.current.autoplay = true;
        if (!checkPlay) { 
            music.current.play()
            setCheckPlay(!checkPlay)
        } 
        else {
            setCheckPlay(!checkPlay)
            music.current.pause()
        }
        pause == 'play' ? setPause('pause') : setPause('play')
    }
    const handleNext = () => {
        music.current.autoplay = true;
        if (listMusic && indexCurrent == listMusic.length - 1) {
            setIndexCurrent(0)
            setCurrentMusic(listMusic&&listMusic[0])
            if (pause == 'play')
            {
                setPause('pause')
                setCheckPlay(!checkPlay)
            }
        }
        else {
            listMusic&&listMusic.map((a, index) => {
                indexCurrent+1 == index && setCurrentMusic(a)
            })
            setIndexCurrent(indexCurrent + 1)
            if (pause == 'play')
            {
                setPause('pause')
                setCheckPlay(!checkPlay)
            }
        }
    }
    const handlePre = () => {
        music.current.autoplay =true; 
        if (indexCurrent == 0) {
            setIndexCurrent(listMusic&&listMusic.length-1)
            setCurrentMusic(listMusic && listMusic[listMusic.length - 1])
            if (pause == 'play')
            {
                setPause('pause')
                setCheckPlay(!checkPlay)
            }
        }
        else {
            if (pause == 'play')
            {
                setPause('pause')
                setCheckPlay(!checkPlay)
            }
            listMusic&&listMusic.map((a, index) => {
                indexCurrent-1 == index && setCurrentMusic(a)
            })
            setIndexCurrent(indexCurrent - 1)
        }
    }

    // useEffect(() => {
    //     music.current.play();
    // }, [currentMusc])
    
    //setting account
    const [setting, checkSetting] = useState(false)
    const handleSetting = () => {
        checkSetting(!setting)
    }
    //set check show volume
    const [volume,setVolume] = useState(false)
    const [volumee,setVolumee] = useState(1)
    useEffect(() => {
        if (listMusic) {
            music.current.volume = volumee;
        }
    }, [volumee,listMusic])
    const handleVolume = () => {
        setVolume(!volume)
    }
    //set check show chatbox
    const [chat, setChat] = useState(false)
    
    //set check table emoji
    const [checkEmoji, setCheckEmoji] = useState(false)
    const handleCheckEmoji = () => {
        setCheckEmoji(!checkEmoji)
    }
    const handleCheckEmoji1 = () => {
        setCheckEmoji(false)
    }
    useEffect(() => {
        setCheckEmoji(false)
    },[chat])
    const [check,setCheck] = useState(false)
    const handleChat = () => {
        if (loginAccount) {
            !chat&&setCheck(!check)
            setChat(!chat)
        }
        else {
            toast.error("C???n ????ng nh???p ????? s??? d???ng ch???c n??ng..!", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    //handle search
    const [listSearch, setListSearch] = useState('')
    //scroll auto bottom
    const scrll = useRef()
    useEffect(() => {
        chat==true&&scrll.current.scrollIntoView({ behavior: "smooth" });
    },[listUser,check])
    //get data Chat
    const [dataSuccess,setDataSuccess] = useState(0)
    const [dataChat, setDataChat] = useState('');
    const handleDataChat = (emoji) => {
        if (dataChat.length <=68) {
            setDataChat(dataChat+emoji)
        }
    }
    
    const [idChat,setIdChat] = useState()
    //get list chat
    const [listChat, setListChat] = useState('')
    useEffect(() => {
        
        onValue((ref(db,'listChat')),(snapshot)=>{
            const data = snapshot.val();
            // if(data.length >= 50){
            // }
            setListChat(Object.values(data))
        })
        chat==true&&scrll.current.scrollIntoView({ behavior: "smooth" });
    }, [db])

    useEffect(() => {
        chat==true&&scrll.current.scrollIntoView({ behavior: "smooth" });
    }, [listChat])
    
    const handleChatInput = e => {
        onValue((ref(db,'idChat')),(snapshot)=>{
            const data = snapshot.val();
            setIdChat(data.idChat)
        })
        // if (dataChat.replace('','') != '') {
        //     console.log(1)
        // }
        const dataChat1 = dataChat;
        if (idChat&&e.key == 'Enter' && dataChat1.replace(/\s/g, '') != '') {
            const dateCurrent = new Date();
            const date = `${dateCurrent.getHours()}h${dateCurrent.getMinutes()}p${dateCurrent.getSeconds()}s - Ng??y ${dateCurrent.getDate()}/${dateCurrent.getMonth() + 1}/${dateCurrent.getFullYear()}`
            
            setDataChat('')
            set(ref(db, `listChat/${idChat}`), {
                username: loginAccount.username,
                sex: loginAccount.sex,
                name: loginAccount.name,
                content: dataChat,
                time:date
            })
            setDataSuccess(dataSuccess+1)
            set(ref(db, `idChat`), {
                idChat: parseInt(idChat)+1
            })
            let idDelete;
            onValue((ref(db,'idDelete')),(snapshot)=>{
                const data = snapshot.val();
                idDelete = data.idDelete
                // setListChat(Object.values(data))
            })
            if (listChat.length >= 50 &&idDelete) {
                set(ref(db, `listChat/${idDelete}`), {
                })
                set(ref(db, `idDelete`), {
                    idDelete: parseInt(idDelete)+1
                })
            }
        }
        else if(e.key == 'Enter' && dataChat1.replace(/\s/g, '') == ''){
            setDataChat('')
        }
    }

    const handleClickChat = () => {
        onValue((ref(db,'idChat')),(snapshot)=>{
            const data = snapshot.val();
            setIdChat(data.idChat)
        })
        // if (dataChat.replace('','') != '') {
        //     console.log(1)
        // }
        const dataChat1 = dataChat;
        if (dataChat1.replace(/\s/g, '') != '') {
            const dateCurrent = new Date();
            const date = `${dateCurrent.getHours()}h${dateCurrent.getMinutes()}p${dateCurrent.getSeconds()}s - Ng??y ${dateCurrent.getDate()}/${dateCurrent.getMonth() + 1}/${dateCurrent.getFullYear()}`
            setDataChat('')
            set(ref(db, `listChat/${idChat}`), {
                username: loginAccount.username,
                sex: loginAccount.sex,
                name: loginAccount.name,
                content: dataChat,
                time:date
            })
            setDataSuccess(dataSuccess+1)
            set(ref(db, `idChat`), {
                idChat: parseInt(idChat)+1
            })
            let idDelete;
            onValue((ref(db,'idDelete')),(snapshot)=>{
                const data = snapshot.val();
                idDelete = data.idDelete
                // setListChat(Object.values(data))
            })
            if (listChat.length >= 50 &&idDelete) {
                set(ref(db, `listChat/${idDelete}`), {
                })
                set(ref(db, `idDelete`), {
                    idDelete: parseInt(idDelete)+1
                })
            }
        }
        else if(dataChat1.replace(/\s/g, '') == ''){
            setDataChat('')
        }
    }
    useEffect(() => {
        chat==true&&scrll.current.scrollIntoView({ behavior: "smooth" });
    }, [dataSuccess])


    const handleLogout1 = () => {
        handleLogout()
        setChat(false)
    }
    return (
        <div className="controls">
            <div className="controls__container">
            {!checkRg&&<ToastContainer
                    autoClose={2000}
                />
                }
                <div className="controls__header">
                    <div className="controls__logo">
                        <img src={logo} alt="logo"></img>
                    </div>
                    <div className="controls__group">
                        <ChangeButton type={weather} handleChange={changeWeather} handleRain={handleRain}></ChangeButton>
                        <ChangeButton type={status} handleChange={changeStatus}></ChangeButton>
                        {
                            street&&<ChangeButton type={keyBoard} handleChange={changeKeyBoard} handleKeyBoard={handleKeyBoard} checkKeyBoard={checkKeyBoard} street={street}></ChangeButton>
                        }
                        
                    </div>
                    {
                        !loginAccount
                            ? <div className="controls__account">
                                <button onClick={handleRg}>Sign up</button>
                                <button onClick={handleLg}>Login</button>
                            </div>
                            :
                            <div className='controls__user' onClick={handleSetting}>
                                <span className='controls__name' style={loginAccount.name=="admin"?{color:"#f312d9"}:{color:"#11b9ec"}}>{`${loginAccount.name}`} </span>
                                <img src={loginAccount&&loginAccount.sex == 1 ? `https://avatars.dicebear.com/api/male/${loginAccount.name}.svg`: `https://avatars.dicebear.com/api/female/${loginAccount.name}.svg`}></img>
                                {setting &&
                                    <div className='controls__setting'>
                                        <div className='controls__logoutbtn' onClick={handleLogout1}>
                                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                            <span style={{fontSize:'16px'}}>LogOut</span>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                    }
                </div>
                <div className='controls__body'>
                    <div className='controls__settingM'>
                        <img src={sm} alt="setting" className='icon controls__iconsetting' onClick={handleVolume}></img>
                        <img src={cb} alt="chatbox" className='icon controls__iconChat' onClick={handleChat}></img>
                    </div>
                    {
                        volume&&<div className='controls__boxMusic'>
                        <div className='controls__volum'>
                            <img src={volum}></img>
                            <input type='range' min="0" max="100" value={Math.floor(volumee*100)} onChange={e=>setVolumee(e.target.value/100)}></input>
                            <span>{Math.floor(volumee*100)}%</span>
                        </div>
                    </div>
                    }
                    {
                        
                        chat&&<div className='controls__boxChat'>
                                <div className='controls__listUser'>
                                    <div className='controls__search'>
                                        <input type='text' placeholder='Nh???p t??n...' onChange={e=>setListSearch(e.target.value)}></input>
                                    </div>
                                    <h3>Danh s??ch ng?????i d??ng:</h3>
                                    <div className='controls__itemUser'>
                                        <User name="admin" sex="1" ></User>
                                        {   listSearch!= ''?
                                            listUser && listUser.map(e => [
                                                e.name.toLowerCase().indexOf(listSearch.toLowerCase())!=-1 && e.name != "admin"
                                                && <User key={e} name={e.name} sex={e.sex}></User>
                                            ])
                                            :
                                            listUser && listUser.map(e => [
                                                e.name != "admin"
                                                &&<User key={e} name={e.name} sex={e.sex}></User>
                                            ])
                                        }
                                    </div>
                                </div>
                                
                                <div className='controls__chatContainer'>
                                    <div className='controls__showChat'>
                                        <h3>???????Ch??c m???i ng?????i nghe nh???c vui v??? nho?????????</h3>
                                        <div className='controls__listChat'>
                                            {
                                            listChat && listChat.map(e => [
                                                    <ItemChat key={e} name={e.name} content={e.content} sex={e.sex} time={e.time}></ItemChat>
                                                ])
                                            }
                                            {/* <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='dasdsadajshdjsahdjhsjdahsjdhsajdhajshdjashdjsahdjashjdsahjdahsjdhsajdhajshdjsahdjashdjashjdhasjdhsaj' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat>
                                            <ItemChat name='admin' content='hihihihi' sex='1'></ItemChat> */}
                                            <div ref={scrll} style={{ float: "left", clear: "both", width:"0px" }}></div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div className='controls__inputChat'>
                                        <input maxLength="70" placeholder='Chat v??o ????y...' value={dataChat} onChange={e =>setDataChat(e.target.value)} onKeyDown={handleChatInput} onClick={handleCheckEmoji1}></input>
                                        <i className="fa-solid fa-paper-plane" onClick={handleClickChat}></i>
                                        <Emoji handleDataChat={handleDataChat} checkEmoji={checkEmoji} handleCheckEmoji={handleCheckEmoji}></Emoji>
                                    </div>
                                </div>
                        </div>
                    }
                </div>
                <div className='controls__bottom'>
                    <i className="fa-solid fa-backward" onClick={handlePre}></i>
                    <i className={`fa-solid fa-${pause}`} onClick={handlePlay}></i>
                    <i className="fa-solid fa-forward" onClick={handleNext}></i>
                </div>
                
                {
                    /* <SpotifyPlayer
                        token="BQAI_7RWPJuqdZxS-I8XzhkUi9RKr8Q8UUNaJAHwWlpIq6..."
                        uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
                    ></SpotifyPlayer> */
                }
                <audio
                    src={currentMusc}
                    ref={music}
                    volume={volumee}
                >
                </audio>
                
                <audio
                    src={rainData}
                    ref={rain}
                    loop
                >
                </audio>
                {
                street&&<audio
                src={keyBoardData}
                ref={keyBoardE}
                loop
                >   
                </audio>
                }

            </div>
        </div>
    )
}
export default Controls