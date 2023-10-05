import React from 'react'
import '../../CSS/HeaderButton.css'

function HeaderButton(props)
{
    const ID = props.data.ID;
    const clickHandler = props.data.clickHandler
    const text = props.data.text
    const imagePath = 'http://localhost:3001/' + props.data.imagePath
    return(
        <div className='header_button_container' onClick={clickHandler}>
            <img className ="header_icon"src ={imagePath}/>
            <h4 id= {ID} className = "header_button_text" > {text} </h4>
        </div>
    )
}
export default HeaderButton