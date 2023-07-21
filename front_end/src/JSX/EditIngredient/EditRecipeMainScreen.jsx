import React from 'react'
import '../../CSS/EditRecipe.css'
class EditRecipe extends React.Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        return(
            <div className="EditRecipe">
                <div className='horizontal_container' id="edit_ingredient_header">
                <button onClick={() => this.openPopUp(null)}> Add Ingredient</button>
                <label> Search </label>
                <input type = "text"></input>
                </div>
            </div>
        )
    }
}
export default EditRecipe