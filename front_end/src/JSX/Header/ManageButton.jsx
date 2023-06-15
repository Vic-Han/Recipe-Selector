
import React from 'react'
import '../../CSS/ManageButton.css'

function ManageButton(props)
{
    return(
        <div>
            <button id = "manage_button" onClick={props.clickHandler}> Manage Users </button>
        </div>
    )
}

export default ManageButton