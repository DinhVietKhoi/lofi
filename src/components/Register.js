import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, set} from 'firebase/database'
import * as Yup from 'yup'
import db from '../firebase'
import {useFormik} from 'formik'
import '../sass/register.scss'
import logo from '../assets/logo.gif'

function Register({ listUser, handleRg, changeForm }) {

    const [valueSex,checkValueSex] = useState("1")
    //get ELement
    const inputUsername = useRef(null);
    const inputPassword = useRef(null);
    const inputNickname = useRef(null);
    const inputSex = useRef(null);

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
                .min(4, "Phải có 4 ký tự trở lên")
                .max(16, "Phải bé hơn 16 ký tự")
                .matches(/^[a-z0-9_.]+$/, "Tài khoản chứa ký tự đặc biệt!")
            ,
            passWord: Yup.string()
                .required("Không được bỏ trống!")
                .min(6, "Phải có 6 ký tự trở lên")
                .max(16, "Phải bé hơn 16 ký tự")
                .matches(/^[a-zA-Z0-9]+$/,
                    "Mật khẩu chứa ký tự đặc biệt!")
            ,
            nickName: Yup.string()
                .required("Không được bỏ trống!")
                .min(2, "Phải có 6 ký tự trở lên")
                .max(10, "Phải bé hơn 10 ký tự")
            ,
        }),
        onSubmit: (values, { resetForm }) => {
            resetForm()
            const checkRegister = listUser.filter(user => {
                return user.username == values.userName
            })
            if (values.userName.search('admin') != -1 || values.nickName.search('admin') != -1) {
                inputUsername.current.value=""
                inputNickname.current.value=""
                inputPassword.current.value = ""
                checkValueSex("1")
                toast.error("Không sử dụng từ khoá 'admin'!!");
            }
            else {
                if (checkRegister.length < 1 || checkRegister == undefined) {
                    set(ref(db, `listAccount/${values.userName}`), {
                        username: values.userName,
                        password: values.passWord,
                        name: values.nickName,
                        sex:valueSex
                    })
                    inputUsername.current.value=""
                    inputNickname.current.value=""
                    inputPassword.current.value = ""
                    checkValueSex("1")
                    toast.success("Đăng ký thành công!");
                }
                else {
                    inputUsername.current.value=""
                    inputNickname.current.value=""
                    inputPassword.current.value = ""
                    checkValueSex("1")
                    toast.error("Đăng ký thất bại, tài khoản đã tồn tại!!")
                }
            }
        
    },
})
return (
    <div className="register">
        <div className='register__container'>
            <ToastContainer
                position="top-left"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                autoClose={3000}
            />
            <div className='register__quit'>
                <i className="fa-solid fa-xmark" onClick={handleRg}></i>
            </div>
            <div className='register__body'>
                <div className='register__header'>
                    <img src={logo} alt="logo"></img>
                    <span>Nice to meet you!</span>
                    <span>Sig up for a free account</span>
                </div>
                <div className='register__input'>
                    {/* <input placeholder='Username'></input>
                    <input placeholder='password'></input> */}
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
                        <input 
                        type="text" 
                        placeholder='NickName' 
                        name="nickName" 
                        id="nickName"
                        ref={inputNickname}
                        onChange={formik.handleChange}
                        autoComplete="off" 
                        >
                        </input>
                        {
                        formik.errors.nickName && (
                            <p className="error2">{formik.errors.nickName}</p>
                        )
                        }
                        <div className='register__sex'>
                            <select ref={inputSex} value={valueSex} onChange={e=>checkValueSex(e.target.value)}>
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </select>
                        </div>
                        <button type="submit">Sign up</button>
                    </form>
                    <span>Already have an account? <p onClick={changeForm}>Log In</p></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register