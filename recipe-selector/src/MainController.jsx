import React from 'react';
import Logo from './Logo';
import MainScreen from './MainScreen.jsx'
import Login from './Login.jsx'
import Register from './Register/jsx'
class MainController extends React.Component{

    constructor(props)
    {
        super()
        this.mainContents = <MainScreen/>
        this.user = -1;
    }
    componentDidMount(){

    }
    showLoginScreen()
    {
        this.mainContents = <Login/>
    }
    showHomeScreen(userID)
    {
        this.mainContents = <MainScreen/>
    }
    showRegisterScreen()
    {
        this.mainContents = <Register/>
    }   
    render(){
    return (<div>
        <Logo parent = {this.showHomeScreen()}/>
        <div id = "MainContents">{this.mainContents}</div>
        </div>);}
}
export default MainController