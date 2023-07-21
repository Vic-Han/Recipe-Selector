import React, { useState } from 'react';
import '../../CSS/IngredientIcon.css'


function IngredientIcon(props)
{
    
    const clickHandler = props.clickHandler
    const localPath = `http://localhost:3001/`
    const imagePath = props.ingredient.imagePath;
    const showIngredientPopup = () => {
        clickHandler();
    }
    return(
        <div onClick = {showIngredientPopup} className='ingredient_icon'>
            <img className = "ingredient_image" src = {localPath + imagePath}></img> 
            <h4 align = "center"> {props.ingredient.name} </h4>
            
        </div>
    )
}

export default IngredientIcon