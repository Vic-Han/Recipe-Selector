import React from 'react'
import '../CSS/EditRecipe.css'
import EditRecipeMainScreen from './EditIngredient/EditRecipeMainScreen'
class EditRecipe extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {
            display: <EditRecipeMainScreen/>
        }
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