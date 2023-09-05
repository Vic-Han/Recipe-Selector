import React from 'react';
import '../CSS/EditIngredient.css';
import IngredientIcon from './EditIngredient/IngredientIcon';
import IngredientPopup from './EditIngredient/IngredientPopup';
import Info from './Info'
class EditIngredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientDetails: null,
      popUp: null,
      filter: ""
    };

  }
  editFilter = (e) => {
    this.setState({
      filter : e.target.value
    });
  }
  openPopUp = (targetIngredient) => {
    this.setState({
      popUp: <IngredientPopup closePopup={this.closePopup} ingredient={targetIngredient} />
    });
  };

  closePopup = () => {
    this.setState({
      popUp: null
    });
  };

  render() {
    return (
      <div className="edit_ingredient">
        {this.state.popUp}
        <div className='horizontal_container' id="edit_ingredient_header">
          <button onClick={() => this.openPopUp(null)}> Add Ingredient</button>
          <label> Search </label>
          <input type = "text" value ={this.state.filter} onChange={this.editFilter}></input>
        </div>
        <div className='ingredient_container'>
          {Info.getAllIngredients().map((item, index) => (
            item.name.toLowerCase().startsWith(this.state.filter.toLowerCase()) ?
            (<div className='ingredient_icon_container' key={index}>
              <IngredientIcon clickHandler={() => this.openPopUp(item)} ingredient={item} />
            </div>): null
          ))}
        </div>
      </div>
    );
  }
}

export default EditIngredient;
