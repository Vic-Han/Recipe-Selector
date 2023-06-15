import React from 'react'
import '../../CSS/LoginButton.css'

function FavouritesButton(props)
{
    return(
        <div>
            <button id = "login_button" onClick={props.clickHandler}> My Favourites </button>
        </div>
    )
}
export default FavouritesButton