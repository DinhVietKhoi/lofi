import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.gif'
import '../sass/loading.scss'
function Loading({ loading }) {
  const [loadingContainer,setLoadingContainer] = useState(false)
  const [hide,setHide] = useState(false)
  useEffect(() => {
    loading && setTimeout(() => {
      setLoadingContainer(true)
    }, 1000)
    loading && setTimeout(() => {
      setHide(true)
    },2000)
  },[loading])
  return (
    <div className={!hide ?`loading`:`loading hide`}>
        <div className={!loadingContainer ?`loading__container`:`loading__container hide__container`}>
            <div className={!loading ?`loading__logo`:`loading__logo hide__logo`}>
                <img src={logo} alt="logo"></img>
            </div>
        </div>
    </div>
  )
}

export default Loading