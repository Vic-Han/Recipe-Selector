import React from 'react'
import '../../CSS/ProfileIcon.css'

function ProfileIcon(props)
{
    return(
        <div>
            <button id = "login_button" onClick={props.clickHandler}> Profile </button>
        </div>
    )
}

export default ProfileIcon