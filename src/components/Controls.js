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

// register lottie and define custom element
defineLordIconElement(loadAnimation);

// import  SpotifyPlayer from 'react-spotify-web-playback';
function Controls({listUser, listMusic, weather, status, keyBoard, changeWeather, changeStatus, changeKeyBoard, street, handleLg, handleRg, loginAccount, handleLogout}) {
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
    const [currentMusc, setCurrentMusic] = useState('https://vnno-vn-6-tf-mp3-s1-zmp3.zmdcdn.me/5550a26ad82e3170683f/3511956447422652229?authen=exp=1659970500~acl=/5550a26ad82e3170683f/*~hmac=a9a00e7ae1d97d37b2f2533a98c6b11b&fs=MTY1OTmUsIC5NzmUsICwMDU4OXx3ZWJWNnwwfDE3MS4yMzQdUngMTA5LjIyNw')
    const [indexCurrent, setIndexCurrent] = useState(0)
    const [checkPlay,setCheckPlay] = useState(false)
    const music = useRef()
    //auto loadaudio
    useEffect(() => {
        music.current.addEventListener('ended', function () {
            let dem = indexCurrent + 1;
            if (indexCurrent == listMusic && listMusic.length - 1) {
                setIndexCurrent(0)
                setCurrentMusic(listMusic&&listMusic[0])
            }
            else {
                listMusic && listMusic.map((a, index) => {
                    dem == index && setCurrentMusic(a)
                })
                setIndexCurrent(indexCurrent + 1)
            }
        });
    }, [music.current,currentMusc])
    const handlePlay = () => {
        music.current.autoplay =true;
        pause=='play'?setPause('pause'):setPause('play')
        setCheckPlay(!checkPlay)
        !checkPlay?music.current.play():music.current.pause()
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
            setCurrentMusic(listMusic&&listMusic[listMusic.length-1])
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
    //list audio
    const [listAudio, setListAudio] = useState(false)
    const handleListAudio = () => {
        setListAudio(!listAudio)
    }
    //setting account
    const [setting, checkSetting] = useState(false)
    const handleSetting = () => {
        checkSetting(!setting)
    }
    //set check show volume
    const [volume,setVolume] = useState(false)
    const [volumee,setVolumee] = useState(1)
    useEffect(() => {
        music.current.volume = volumee;
    }, [volumee])
    const handleVolume = () => {
        setVolume(!volume)
    }

    //set check show chatbox
    const [chat, setChat] = useState(false)
    const [check,setCheck] = useState(false)
    const handleChat = () => {
        if (loginAccount) {
            !chat&&setCheck(!check)
            setChat(!chat)
        }
        else {
            toast.error("Cần đăng nhập để sử dụng chức năng..!", {
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
    const [idChat,setIdChat] = useState()
    const handleChatInput = e => {
        
        onValue((ref(db,'idChat')),(snapshot)=>{
            const data = snapshot.val();
            setIdChat(data.idChat)
        })
        // if (dataChat.replace('','') != '') {
        //     console.log(1)
        // }
        const dataChat1 = dataChat;
        if (e.key == 'Enter' && dataChat1.replace(/\s/g, '') != '') {
            setDataChat('')
            set(ref(db, `listChat/${idChat}`), {
                username: loginAccount.username,
                sex: loginAccount.sex,
                name: loginAccount.name,
                content: dataChat,
            })
            setDataSuccess(dataSuccess+1)
            set(ref(db, `idChat`), {
                idChat: parseInt(idChat)+1
            })
        }
        else if(e.key == 'Enter' && dataChat1.replace(/\s/g, '') == ''){
            setDataChat('')
        }
    }
    useEffect(() => {
        chat==true&&scrll.current.scrollIntoView({ behavior: "smooth" });
    },[dataSuccess])
    //get list chat
    const [listChat, setListChat] = useState('')
    useEffect(() => {
        onValue((ref(db,'listChat')),(snapshot)=>{
            const data = snapshot.val();
            setListChat(Object.values(data))
        })
        chat==true&&scrll.current.scrollIntoView({ behavior: "smooth" });
    }, [db])
    return (
        <div className="controls">
            <div className="controls__container">
                <ToastContainer
                    autoClose={2000}
                />
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
                        {/* <div className='controls__listAudio'>
                            <RiPlayListLine fontSize="30px" color="#ffffff" cursor="pointer" onClick={handleListAudio}></RiPlayListLine>
                            {
                                listAudio&&<div className="controls__sound">
                                    <div className="controls__sound-group">
                                        <WiRaindrop fontSize="30px" color="#ffffff"></WiRaindrop>
                                        <input type='range'></input>
                                    </div>
                                </div>
                            }
                        </div> */}
                    </div>
                    {
                        !loginAccount
                            ? <div className="controls__account">
                                <button onClick={handleRg}>Sign up</button>
                                <button onClick={handleLg}>Login</button>
                            </div>
                            :
                            <div className='controls__user' onClick={handleSetting}>
                                <span className='controls__name' style={loginAccount.name=="admin"?{color:"#f312d9"}:{color:"#11b9ec"}}>{`Hi, ${loginAccount.name}`} </span>
                                <img src={loginAccount&&loginAccount.sex == 1 ? `https://avatars.dicebear.com/api/male/${loginAccount.name}.svg`: `https://avatars.dicebear.com/api/female/${loginAccount.name}.svg`}></img>
                                {setting &&
                                    <div className='controls__setting'>
                                        <div className='controls__logoutbtn' onClick={handleLogout}>
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
                        chat &&
                            <div className='controls__boxChat'>
                                <div className='controls__listUser'>
                                    <div className='controls__search'>
                                        <input type='text' placeholder='Nhập tên...' onChange={e=>setListSearch(e.target.value)}></input>
                                    </div>
                                    <h3>Danh sách người dùng:</h3>
                                    <div className='controls__itemUser'>
                                        <User name="admin" sex="1"></User>
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
                                        <h3>️🎶Chúc mọi người nghe nhạc vui vẻ nhoé️🎶</h3>
                                        <div className='controls__listChat'>
                                            {
                                                listChat&&listChat.map(e => [
                                                    <ItemChat key={e} name={e.name} content={e.content} sex={e.sex}></ItemChat>
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
                                        <input maxLength="100" placeholder='Chat vào đây...' value={dataChat} onChange={e => setDataChat(e.target.value)} onKeyDown={handleChatInput}></input>
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