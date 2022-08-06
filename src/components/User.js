import React from 'react'
import '../sass/user.scss'
function user({name,sex}) {
return (
    <div className='user'>
        <img src={sex == 1
            ? `https://avatars.dicebear.com/api/male/${name}.svg`
            :`https://avatars.dicebear.com/api/female/${name}.svg`
            }></img>
        <span style={name == "admin" ? { color: 'rgb(243, 18, 217)'}:{color:'rgb(17, 185, 236)'}}>{name}</span>
    </div>
    )
}

export default user