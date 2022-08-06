import React from 'react'
import User from '../components/User'
import '../sass/itemChat.scss'
function ItemChat({name,content,sex}) {
return (
    <div className='itemChat'>
        <div className='itemChat__user'>
            <User name={name} sex={sex}></User>
        </div>
        <div className='itemChat__content'>
            <div className='itemChat__boxContent'>
                <span className='itemChat__cham'>:</span>
                <p>
                    { content}
                </p>  
            </div>
        </div>
    </div>
)
}

export default ItemChat