import React, {useState} from 'react'
import '../../CSS/RecipeView.css'
import Info from '../Info'
function RecipeView(props) {
    const backEvent = props.backEvent
    const localPath = `http://localhost:3001/`
    const imagePath = props.recipe.imagePath;
    const id = props.recipe._id
    const [favourited, toggled_fav] = useState(Info.getFavoriteIDS().includes(id)) 
    const editMode = props.editMode
    const favoriteVisible = !(editMode || Info.getUserID() === null)
    let favoriteButtonEnable = true
    const updateFav = async() => {
      await fetch(`${localPath}updatefavorite/${encodeURIComponent(Info.getUserID())}/${encodeURIComponent(id)}`)
    }
    const favouriteClick = async () => {
        if (favoriteButtonEnable) {
            favoriteButtonEnable = false;
            const newFavState = !favourited;
            toggled_fav(newFavState);
            await updateFav();
            favoriteButtonEnable = true;
        }
    }
    
    const createIngr = (ingredient) => {
        if(ingredient.volume !== null){
            return(
                <div> {ingredient.name} {" "} {ingredient.volume}{"ml"}</div>
            )
        }
        else if(ingredient.serving !== null){
            return(
                <div>{ingredient.name}{"s"} {ingredient.serving}</div>
            )
        }
        else if(ingredient.weight !== null){
            return(
                <div> {ingredient.name} {" "} {ingredient.weight}{" grams"}</div>
            )
        }
       
    }
    const ingrContent = (props.recipe.ingredients.map((ingr, index) =>(
        createIngr(ingr)
    )))
    const instrContent = (props.recipe.instructions.map((instr, index) =>(
        <div>{(index+1) + ".   " + instr}</div>
    )))
    const [textContent, changeTextContent] = useState(ingrContent)
    const getInstructions = () => {
        
        changeTextContent(instrContent)
        
    }
    const getIngredients = () => {
        changeTextContent(ingrContent)
    }
    return(
        <div className='recipe_view_container'>
            <div className='recipe_main_preview'>
                <img className = "ingredient_image" src = {localPath + imagePath}></img> 
                <h4 align = "center"> {props.recipe.name} </h4>
            </div>
            <div>
                <div className= 'recipe_button_container'>
                    <h4 onClick={getIngredients} align = "center"> Ingredients </h4>
                    <h4 onClick={getInstructions} align = "center"> Instructions </h4>
                    <h4></h4>
                </div>
                <div className='recipe_text_content'>
                    {textContent}
                </div>
            </div>
            <div onClick={backEvent}> back</div>
            {favoriteVisible ? <div className='star_container'>
            <div className={`favourite_star ${favourited ? ' highlighted':''}`} onClick={favouriteClick}></div>
            </div> : null}
            
           
        </div>
    )
    
}
export default RecipeView