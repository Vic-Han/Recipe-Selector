import React from 'react'
import '../../CSS/IngredientsButton.css'

function IngredientsButton(props)
{
    return(
        <div>
            <button id = "login_button" onClick={props.clickHandler}> Edit Ingredients </button>
        </div>
    )
}
export default IngredientsButton