import React from 'react';
import '../CSS/MainController.css'
import Logo from './Logo';
import MainScreen from './MainScreen.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import ProfileIcon from './ProfileIcon';
class MainController extends React.Component{

    constructor(props)
    {
        super()
        this.userID = -1;
        this.advancedSearchOptions = {"gluten-free" : false};
        this.showHomeScreen(this.userID)
    }
    componentDidMount(){

    }
    showLoginScreen()
    {
        this.mainContents = <Login/>
    }
    showHomeScreen(userID)
    {
        this.userID = userID;
        this.mainContents = <MainScreen searchEvent = {this.search} userID = {this.userID}/>
        
    }
    showRegisterScreen()
    {
        this.mainContents = <Register/>
    } 
    search(recipe_name)
    {

    }  
    render(){
    return(
    <div>
        <div id = "Header" className = "horizontal_container">
            <div className = "horizontal_component"> <Logo clickHandler = {this.showHomeScreen} /> </div>
            <div className = "horizontal_component"> <ProfileIcon userID = {this.user} loginClicked = {this.showLoginScreen}/> </div>
            
        </div>
        <div id = "MainContents">
           {this.mainContents}
        </div>
    </div>
    );
    }
}
export default MainController