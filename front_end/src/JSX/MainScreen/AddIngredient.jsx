import React from "react";
import '../../CSS/AddIngredient.css'

class AddIngredient extends React.Component {
    constructor(props)
    {
        super()
    }
    render()
    {
        return(
            <div>
                <h2>Tell us some ingredients you have on hand:</h2>
                <input type = "text"></input>
            </div>
        );
    }
}
export default AddIngredient