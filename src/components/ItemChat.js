import React from 'react'
import User from '../components/User'
import '../sass/itemChat.scss'
function ItemChat({name,content,sex,time}) {
return (
    <div className='itemChat'>
        <span className='itemChat__time'>{ time}</span>
        <div className='itemChat__container'>
            <div className='itemChat__user'>
                <User name={name} sex={sex}></User>
            </div>
            <div className='itemChat__content'>
                <div className='itemChat__boxContent'>
                    <span className='itemChat__cham'>:</span>
                    <span>
                        { content}
                    </span>  
                </div>
            </div>
        </div>
        
    </div>
)
}

export default ItemChat