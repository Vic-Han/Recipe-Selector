import React from 'react'
import '../../CSS/RecipeButton.css'

class RecipeButton extends React.Component{
    constructor(props)
    {
        super(props)
        this.recipeClicked = props.clickHandler;
        this.recipe = this.recipe.bind(this);
    }
    recipe = () => {
        this.recipeClicked();
    }
    render(){
        return(
            <div>
                <button id = "recipe_button" onClick={this.recipe}> Add Recipes </button>
            </div>
        )
    }
}
export default RecipeButton