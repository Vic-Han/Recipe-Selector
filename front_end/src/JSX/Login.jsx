import React from 'react';
import '../CSS/Login.css';
import Info from './Info';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.loginSuccessEvent = props.loginSuccessEvent;
    this.registerEvent = props.registerEvent;
    this.state = {
      email: '',
      password: '',
      errorMessage : '          '
    };
  }

  loginFail = () => {
    this.setState({
        errorMessage: "Incorrect email or password",
    })
    setTimeout(()=>{
        this.setState({
            errorMessage: '          ',
        })
    },3000)
  };

  loginCheck = () => {
    const localPath = 'http://localhost:3001';
    fetch(`${localPath}/logincorrect/${encodeURIComponent(this.state.email.trim())}/${encodeURIComponent(this.state.password.trim())}`)
      .then(response => response.json())
      .then(data => {
        if (data.result !== false) {
          // Login success
          Info.setUser(data.result);
          
          this.loginSuccessEvent();
        } else {
          // Login failure
          this.loginFail();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  showRegister = () => {
    this.registerEvent();
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div id="login_contents">
        <h2>Email:</h2>
        <h3>{this.state.errorMessage}</h3>
        <input type="text" maxLength={50} value={this.state.email} onChange={this.handleEmailChange} id="userNameFeild" />
        <h2>Password:</h2>
        <input type="password" maxLength={50} value={this.state.password} onChange={this.handlePasswordChange} />
        <button onClick={this.loginCheck}>Login</button>
        <div className="horizontal_container">
          <h3 className="horizontal_component">Don't have an account?</h3>
          <button onClick={this.showRegister} className="horizontal_component">
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
