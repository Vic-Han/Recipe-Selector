import React, { useState } from 'react';
import '../../CSS/LoginButton.css'


function IngredientIcon(props)
{
    
    const clickHandler = props.clickHandler
    const showIngredientPopup = () => {
        clickHandler();
    }
    return(
        <div onClick = {showIngredientPopup}>
            <h4 align = "center"> {props.ingredient.name} </h4>
            <div className='horizontal_container'>
                <div className='horizontal_component'>
                    Calories: { props.ingredient.nutrition_facts.calories}
                </div>
                <div className='horizontal_component'>
                    Fats: {props.ingredient.nutrition_facts.fats}
                </div>
            </div>
            <div className='horizontal_container'>   
                <div className='horizontal_component'>
                     Carbs: {props.ingredient.nutrition_facts.carbs}
                </div>
                <div className='horizontal_component'>
                     Protein: {props.ingredient.nutrition_facts.protein}
                </div>
            </div>
        </div>
    )
}

export default IngredientIcon