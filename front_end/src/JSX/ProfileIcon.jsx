import React from 'react'
import '../CSS/ProfileIcon.css'

class ProfileIcon extends React.Component
{
    constructor(props)
    {
        super(props)
        this.userID = props.userID
        if(this.userID = -1)
        {
            this.display = <LoginButton loginClicked = {props.loginClicked}/>
        }
        else{

        }
    }
    render(){
        return(
            <div>
                {this.display}
            </div>
        )
    }
}
class LoginButton extends React.Component{
    constructor(props)
    {
        super(props)
        this.loginClicked = props.loginClicked;
        this.login = this.login.bind(this);
    }
    login = () => {
        console.log("sup")
        this.loginClicked();
    }
    render(){
        return(
            <div>
                <button id = "login_button" onClick={this.login}> Login </button>
            </div>
        )
    }
}
export default ProfileIcon