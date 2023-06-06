import React from 'react'
import '../CSS/Login.css'
import '../back_end/user.js'
class Login extends React.Component
{

    constructor(props)
    {
        super(props)
        this.loginSuccessEvent = props.loginSuccessEvent
        this.registerEvent = props.registerEvent
    
    }
    loginFail()
    {

    }
    loginCheck()
    {
        if(false)
        {

        }
        else{
        }
    }
    render(){
        return(<div>
            <h2> username or email:</h2>
            <input type = "text" maxLength={50} id = "userNameFeild"></input>
            <h2>password:</h2>
            <input type = "password" maxLength={50}></input>
            <button onClick = {this.loginCheck()}>login</button>
            <div className='horizontal_container'>
                <h3>don't have an account?</h3><button onClick={this.registerEvent}>Register</button>
            </div>
            

        </div>)
    }
}
export default Login