import React from 'react'
import '../CSS/Login.css'
class Login extends React.Component
{

    constructor(props)
    {
        super(props)
        this.loginSuccessEvent = props.loginSuccessEvent
        this.registerEvent = props.registerEvent
        this.state = {
            email : "",
            password : ""
        }
    }
    loginFail = () => {

    }
    loginCheck = () => {
        let loginSuccess = false;
        const localPath = "http://localhost:3001"
        fetch(localPath + `/logincorrect/${this.state.email}/${this.state.password}`)
        .then(response => response.json())
        .then(data => {
            loginSuccess = data
          console.log("success")
        })
        .catch(error => {
          console.log(error)
        });
        if(loginSuccess)
        {
            this.loginSuccessEvent(this.state.email);
        }
        else{
            
        }
    }
    showRegister = () => {
        this.registerEvent();
    }
    render(){
        return(<div id = "login_contents">
            <h2> username or email:</h2>
            <input type = "text" maxLength={50} id = "userNameFeild"></input>
            <h2>password:</h2>
            <input type = "password" maxLength={50}></input>
            <button onClick = {this.loginCheck}>login</button>
            <div className='horizontal_container'>
                <h3 className='horizontal_component'>don't have an account?</h3>
                <button onClick={this.showRegister} className='horizontal_component'>Register</button>
            </div>
            

        </div>)
    }
}
export default Login