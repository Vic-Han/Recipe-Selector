import React, {useState} from 'react'
import '../../CSS/ManageScreen.css'
function RecipeIcon(props) {
    const clickHandler = props.clickHandler
    
    const localPath = `http://localhost:3001/`
    const imagePath = props.recipe.imagePath;
    return(
        <div onClick = {clickHandler} className='ingredient_icon'>
            <img className = "ingredient_image" src = {localPath + imagePath}></img> 
            <h4 align = "center"> {props.recipe.name} </h4>
            
        </div>
    )
    
}
export default RecipeIcon