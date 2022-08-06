import React, { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, set} from 'firebase/database'
import * as Yup from 'yup'
import db from '../firebase'
import {useFormik} from 'formik'
import '../sass/login.scss'
import logo from '../assets/logo.gif'
function Login({listUser, handleLg, changeForm, handleGetAccount }) {
    //get ELement
    const inputUsername = useRef(null);
    const inputPassword = useRef(null);

    //show/hide password
    const [eye, setEye] = useState('eye')
    const handleShowPassword = () => {
        if (eye === 'eye') {
            setEye('eye-slash')
            inputPassword.current.type = "text"
        }
        else {
            setEye('eye')
            inputPassword.current.type = "password"
        }
    }

    //formik react
    const formik = useFormik({
        initialValues: {
            userName: "",
            passWord: "",
            nickName: ""
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required("Không được bỏ trống!")
            ,
            passWord: Yup.string()
                .required("Không được bỏ trống!")
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm()
            const checkLogin = listUser.filter(user => {
                return user.username == values.userName && user.password == values.passWord
            })
            if (checkLogin.length < 1 || checkLogin == undefined) {
                inputUsername.current.value=""
                inputPassword.current.value=""
                toast.error("Đăng nhập thất bại, sai tài khoản hoặc mật khẩu!!")
            }
            else {
                handleGetAccount(checkLogin)
                inputUsername.current.value=""
                inputPassword.current.value=""
                // toast.success("Đăng nhập thành công!");
            }
    },
})
return (
    <div className="login">
        <div className='login__container'>
            <ToastContainer
                autoClose={3000}
            />
            <div className='login__quit'>
                <i className="fa-solid fa-xmark" onClick={handleLg}></i>
            </div>
            <div className='login__body'>
                <div className='login__header'>
                    <img src={logo}></img>
                    <span>Welcome back!</span>
                    <span>Log In to your account</span>
                </div>
                <div className='login__input'>
                <form className='loginform'
                        onSubmit={formik.handleSubmit}>
                        <input 
                        type="text" 
                        placeholder='Username' 
                        name="userName" 
                        id="userName"
                        onChange={formik.handleChange}
                        ref={inputUsername}
                        autoComplete="off" 
                        ></input>
                        {
                        formik.errors.userName && (
                            <p className="error">{formik.errors.userName}</p>
                        )
                        }
                        <input 
                        type="password" 
                        placeholder='Password' 
                        name="passWord" 
                        id="passWord"
                        ref={inputPassword}
                        onChange={formik.handleChange}
                        >
                        </input>
                        {/* <i className="fa-solid fa-eye-slash"></i> */}
                            <i className={`fa-solid fa-${eye}`} onClick={handleShowPassword}></i>
                        {
                        formik.errors.passWord && (
                            <p className="error1">{formik.errors.passWord}</p>
                        )
                        }
                        <button type="submit">Login</button>
                    </form>
                    <span>Don't have an account? <p onClick={changeForm}>Sign up for free</p></span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login