import React, { useState } from 'react';
import '../../CSS/RecipePopup.css';

function RecipePopup(props) {
  const closePopup = props.closePopup;
  const image = props.recipeInfo.image;
  const instructions = props.recipeInfo.instructions;
  const name = props.recipeInfo.name;
  const ingredients = props.recipeInfo.ingredients;
  console.log(ingredients)
  const [imageSrc, setImageSrc] = useState(null);

  // Handle image loading when the component mounts
  React.useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);
  const handleOverlayClick = e =>{
        // Check if the click event originated from the overlay element
        if (e.target.classList.contains('popup_overlay')) {
            closePopup();
            return;
          }
  }
  return (
    <div className="recipe_popup popup_overlay" onClick={handleOverlayClick}>
        <div className='popup_content'>
            <h1 align = "center"> {name} </h1>
            {imageSrc && <img className = "recipe_image"src={imageSrc} />}
            <div className='preview_instruction_container'>
                <div className='preview_ingredient_list'>
                    {ingredients.map((ingr,index) => (
                        (ingr.amount.endsWith("ml") || ingr.amount.endsWith("grams")) ?
                        (<h2 align = "center">{ingr.name + " " + ingr.amount}</h2>):
                        (<h2 align = "center">{ingr.amount + " " + ingr.name + 's'}</h2>)
                    ))}
                </div>
                <div className='preview_instruction_list'>
                   {instructions.map((item,index)=> (
                    <div>
                    <label align = "center">{index+1}:</label>
                    <div align = "center">{item}</div>
                    </div>
                   ))}
                </div>
            </div>
        </div>
    </div> 
    
  );
}

export default RecipePopup;
/*
    <div className='popup_overlay' >
            <div className='popup_content'>
                <div className= "ingredient_name_field">
                        <label> Name: </label>
                        
                </div>
                <div className='horizontal_container'>
                    <div className='horizontal_component'>
                        <label> Calories: </label>
                        
                    </div>
                    <div className='horizontal_component'>
                        <label> Fats: </label>
                       
                    </div>
                    <div className='horizontal_component'>
                        <label> Carbs: </label>
                       
                    </div>
                    <div className='horizontal_component'>
                        <label> Protein: </label>
                      
                    </div>
                </div>
                </div>
            
        </div>*/