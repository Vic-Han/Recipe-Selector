import React from 'react';
import '../CSS/MainController.css';
import MainScreen from './MainScreen.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Profile from './Profile.jsx'
import Header from './Header.jsx'
import Favourites from './Favourites.jsx';
import ManageScreen from './ManageScreen.jsx';
import EditIngredient from './EditIngredient.jsx';
import EditRecipe from './EditRecipe.jsx';
import Info from './Info.jsx'
import UploadImage from './UploadImage';

class MainController extends React.Component {
    
  constructor() {
    super();
    
    this.filters = { "gluten-free": false, keto: false };
    this.state = {
      mainContents: <MainScreen searchEvent={this.search} userID={this.userID} filters={this.filters} />,
      
    };
    this.headerButtons = {
      logoClick : this.showHomeScreen,
      favouritesClick : this.showFavourites,
      recipeClick : this.showRecipes,
      ingredientClick : this.showIngredientsScreen,
      manageClick : this.showManageScreen,
      profClick : this.showProfileScreen,
      loginClick : this.showLoginScreen,
    }
  }

  componentDidMount() {}

  showLoginScreen = () => {
    this.setState({
      mainContents: <Login loginSuccessEvent={this.showHomeScreen} registerEvent={this.showRegisterScreen} />,
    });
  }

  showHomeScreen = ()  => {
    this.setState({
      mainContents: <MainScreen searchEvent={this.search}  filters={this.filters} />,
    });

  }

  showRegisterScreen = () => {
    this.setState({
        mainContents : <Register finishRegister = {this.showHomeScreen}/>
    });
  }
  showProfileScreen = () => {
    this.setState({
      mainContents : <Profile logoutEvent = {this.showHomeScreen}/>
    })
  }
  showFavourites = () => {
    this.setState({
      mainContents : <Favourites/>
    })
  }
  showManageScreen = () => {
    this.setState({
    mainContents : <ManageScreen/>
     })
  }
  showIngredientsScreen = () => {
    this.setState({
      mainContents : <EditIngredient/>
    })
  }
  showRecipes = () => {
    this.setState({
      mainContents : <EditRecipe/>
    })
  }
  search(recipe_name) {

  }

  render() {
    
    return (
      <div id = "main_application">
          <Header eventHandlers = {this.headerButtons}/>
        
        <div id="MainContents">{this.state.mainContents}</div>
      </div>
    )
  }
}

export default MainController;