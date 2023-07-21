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
      ingredientList: []
    };
    this.getAllIngredients();
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

  getAllIngredients() {
    const localPath = 'http://localhost:3001/';
    fetch(`${localPath}getallingredients/`)
      .then(response => response.json())
      .then(data => {     
        this.setState({
          ingredientList: data.result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteIngredient = (ingrID) => {

  }
  addIngrdient = (ingrID) =>{

  }
  filter = (prefix) => {

  }
  render() {
    return (
      <div className="edit_ingredient">
        {this.state.popUp}
        <div className='horizontal_container' id="edit_ingredient_header">
          <button onClick={() => this.openPopUp(null)}> Add Ingredient</button>
          <label> Search </label>
          <input type = "text"></input>
        </div>
        <div className='ingredient_container'>
          {this.state.ingredientList.map((item, index) => (
            <div className='ingredient_icon_container' key={index}>
              <IngredientIcon clickHandler={() => this.openPopUp(item)} ingredient={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default EditIngredient;
