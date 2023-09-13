import React from 'react'
import '../../CSS/HeaderButton.css'

function HeaderButton(props)
{
    return(
        <div>
            <h4 id= {props.ID} className = "header_button" onClick={props.clickHandler}> {props.text} </h4>
        </div>
    )
}
export default HeaderButton