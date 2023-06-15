import React from 'react'
import '../../CSS/LoginButton.css'


function LoginButton(props)
{
    return(
        <div>
            <button id = "login_button" onClick={props.clickHandler}> Login </button>
        </div>
    )
}

export default LoginButton