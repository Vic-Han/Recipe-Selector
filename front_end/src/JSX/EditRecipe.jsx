import React from 'react'
import '../CSS/EditRecipe.css'
import EditRecipeMainScreen from './EditIngredient/EditRecipeMainScreen'
import RecipeCreate from './EditIngredient/RecipeCreate'
import RecipeView from './EditIngredient/RecipeView'
class EditRecipe extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            display: <EditRecipeMainScreen addRecipeEvent = {this.showAddRecipeScreen} viewRecipeEvent = {this.viewRecipeEvent}/>
        }
    }
    showAddRecipeScreen = () =>{
        this.setState({
            display: <RecipeCreate backEvent = {this.showMainScreen}/>
        })
    }
    showMainScreen = () =>{
        this.setState({
            display: <EditRecipeMainScreen addRecipeEvent = {this.showAddRecipeScreen} viewRecipeEvent = {this.viewRecipeEvent}/>
        })
    }
    viewRecipeEvent = (recipe) => {
        this.setState({
            display: <RecipeView backEvent = {this.showMainScreen} recipe = {recipe} editMode = {true}/>
        })
    }
    render(){
        return(
            <div className="EditRecipe">
                {this.state.display}
            </div>
        )
    }
}
export default EditRecipe