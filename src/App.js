import { useEffect, useState } from "react";
import { ref, set, getDatabase, onValue} from 'firebase/database'
import db  from './firebase'
import Controls from "./components/Controls";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Street from "./components/Street";
import './sass/base.scss'
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  //loading first
  const [loading, setLoading] = useState(false)
 
  //check login,register
  const [checkLg,setCheckLg] = useState(false)
  const [checkRg,setCheckRg] = useState(false)
  const handleLg = () => {
    setCheckLg(!checkLg)
  }
  const handleRg = () => {
    setCheckRg(!checkRg)
  }
  const changeForm = () => {
    setCheckLg(!checkLg)
    setCheckRg(!checkRg)
  }
  //check account
  const [loginAccount, setLoginAccount] = useState(false)
  const handleGetAccount = (values) => {
    setCheckLg(!checkLg)
    setLoginAccount(values[0])
  }
  //list data Music
  const [listMusic, setListMusic] = useState()
  //list data User
  const [listUser, setListUser] = useState()
  useEffect(()=>{
      // Get database 
        onValue((ref(db,'listMusic')),(snapshot)=>{
          const data = snapshot.val();
          const [id,value] = data
          const listuser = Object.values(data)
          setListMusic('')
          listuser.map(l=>{
              setListMusic(pre=>[...pre,l])
          })
        })
      //get list user
      onValue((ref(db,'listAccount')),(snapshot)=>{
        const data1 = snapshot.val();
        // const [id1,value1] = data1
        const listuser = Object.values(data1)
        setListUser('')
        listuser.map(l1=>{
          setListUser(pre1=>[...pre1,l1])
        })
      })
  }, [])
  const [street, setStreet] = useState(false)
  const changeStreet = () => {
    setStreet(!street)
  }
  //rain
  const [weather, setWeather] = useState('cloud')
  const changeWeather = () => {
    weather === 'cloud' ? setWeather('cloud-rain') : setWeather('cloud')
  }
  //night
  const [status, setStatus] = useState('sun')
  const changeStatus = () => {
    status === 'sun' ? setStatus('moon') : setStatus('sun')
  }
  //keyboard
  const [keyBoard, setkeyBoard] = useState('keyboard_mute')
  const changeKeyBoard = () => {
    keyBoard === 'keyboard' ? setkeyBoard('keyboard_mute') : setkeyBoard('keyboard')
  }
  //trang loading và ngăn f11 zoom
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000)
    document.addEventListener("keydown", e => {
      if (e.key == "F11") e.preventDefault();
    });
  }, [])
  
  //dang xuat
  const handleLogout = () => {
    // setCheckLg(!checkLg)
    setLoginAccount(false)
  }
  return (
    <>
      <Loading loading={loading}></Loading>
      {checkLg&&<Login listUser={listUser} handleLg={handleLg} changeForm={changeForm} handleGetAccount={handleGetAccount}></Login>}
      {checkRg&&<Register listUser={listUser} handleRg={handleRg} changeForm={changeForm}></Register>}
      <Controls
        listUser={listUser}
        listMusic={listMusic}
        weather={weather}
        status={status}
        keyBoard={keyBoard}
        changeWeather={changeWeather}
        changeStatus={changeStatus}
        changeKeyBoard={changeKeyBoard}
        street={street}
        handleLg={handleLg}
        handleRg={handleRg}
        loginAccount={loginAccount}
        handleLogout={handleLogout}
      ></Controls>
      <Street Street weather={weather} status={status} changeStreet={changeStreet} street={street}></Street>
      <Home weather={weather} status={status} changeStreet={changeStreet} street={street} ></Home>
    </>
  );
}

export default App;
