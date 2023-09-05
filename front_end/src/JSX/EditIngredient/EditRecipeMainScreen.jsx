import React from 'react'
import '../../CSS/EditRecipeMainScreen.css'
import Info from '../Info'
import RecipeIcon from './RecipeIcon'
class EditRecipeMainScreen extends React.Component{
    constructor(props)
    {
        super(props)
        this.addRecipeEvent = props.addRecipeEvent
        this.viewRecipeEvent = props.viewRecipeEvent
       
        this.state = {
            filter : "",
            recipeList : Info.getAllRecipes(),
        }
    }
    render(){
        return(
            <div className="EditRecipe">
                <div className='horizontal_container' id="edit_ingredient_header">
                <button onClick={this.addRecipeEvent}> Add Recipe</button>
                <label> Search </label>
                <input type = "text" value = {this.state.filter} onChange={e => this.setState({filter: e.target.value})}></input>
                </div>
                <div className='recipe_list'>
                    {this.state.recipeList.map( (item, index)=> (
                        <div className='recipe_icon_container' >
                            
                            <RecipeIcon recipe={item} clickHandler ={() => this.viewRecipeEvent(item)}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
//
//
//
export default EditRecipeMainScreen