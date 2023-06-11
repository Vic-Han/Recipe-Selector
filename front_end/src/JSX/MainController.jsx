import React from 'react';
import '../CSS/MainController.css';
import Logo from './Logo';
import MainScreen from './MainScreen.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProfileIcon from './ProfileIcon';

class MainController extends React.Component {
    
  constructor() {
    super();
    this.userID = -1;
    this.filters = { "gluten-free": false, keto: false };
    this.state = {
      mainContents: <MainScreen searchEvent={this.search} userID={this.userID} filters={this.filters} />,
      test : 4,
    };
  }

  componentDidMount() {}

  showLoginScreen = () => {
    this.setState({
      mainContents: <Login loginSuccessEvent={this.showHomeScreen} registerEvent={this.showRegisterScreen} />,
      test : 5,
    });
    console.log(this.state.test)
  }

  showHomeScreen = (userID)  => {
    this.userID = userID;
    if(userID > 0)
    {
    }
    this.setState({
      mainContents: <MainScreen searchEvent={this.search} userID={this.userID} filters={this.filters} />,
    });
  }

  showRegisterScreen = () => {
    this.setState({
        mainContents : <Register />
    });
  }

  search(recipe_name) {

  }

  render() {

    return (
      <div id = "main_application">
        <div id="Header" className="horizontal_container">
          <div className="horizontal_component">
            <Logo clickHandler={this.showHomeScreen} />
          </div>
          <div className="horizontal_component">
            <ProfileIcon userID={this.userID} loginClicked={this.showLoginScreen} />
          </div>
        </div>
        <div id="MainContents">{this.state.mainContents}</div>
      </div>
    );
  }
}

export default MainController;