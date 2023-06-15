
import '../CSS/Register.css'
/*
class Register extends React.Component{

    constructor()
    {
        super()
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [username, setUsername] = useState('');
        const [confirmPassword, setConfirm] = useState('');
        const [result, setResult] = useState(null);
        const [error, setError] = useState(null);
    }
    tryRegister = (userName, email, password, confirmPassword) => {
        if(password !== confirmPassword)
        {
            this.setState({
                register_message : "Passwords don't match"
            });
            setTimeout(() =>{
                this.setState({
                    register_message : ""
                });
            }, 3000)
            return;
        }

    fetch(`/createuser/${email}/${password}/${username}`)
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setResult(true);
          setError(null);
        } else {
          setResult(false);
          setError(data.error);
        }
      })
      .catch(error => {
        setResult(false);
        setError(error.message);
      });
    }
    render()
    {
        return(<div id = "register_contents_container">
           <h2 id = "register_message"> {this.state.register_message}</h2>
            <h2 className='register_label'> username:</h2>
            <input type = "text" maxLength={50} className='register_field'></input>
           
           
           <h2 className='register_label'> email:</h2>
            <input type = "text" maxLength={50} className='register_field'></input>
           
           <h2 className='register_label'> password:</h2>
            <input type = "password" maxLength={50} className='register_field'></input>
            
          
            <h2 className='register_label'> confirm password:</h2>
            <input type = "text" maxLength={50} className='register_field'></input>
            <button onClick={this.tryRegister()}>Register</button>
            
        </div>);
    }
}
export default Register;*/
import React, { useState } from 'react';

function Register(){
    //const localPath = "http:/localhost:3001"
  const [errorMessage, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const validPassword = () =>{
    let passwordValid = true;
    passwordValid |= password.length >= 8;
    passwordValid |= password.match(/[a-z]/);
    passwordValid |= password.match(/[A-Z]/);
    passwordValid |= password.match(/[0-9]/);
    return passwordValid;
  }
  const uniqueEmail = () => {
        
  }

  const tryRegister = () => {
    
    if(password !== confirmPassword)
    {
       setMessage("Passwords don't match")
        setTimeout(() =>{
            setMessage("")
        }, 3000)
        return;
    }
     
    const localPath = `http://localhost:3001`

    fetch(localPath+`/createuser/${encodeURIComponent(email)}
    /${encodeURIComponent(password)}/${encodeURIComponent(firstName)}/${encodeURIComponent(lastName)}`)
      .then(response => response.json())
      .then(data => {
        console.log("success")
      })
      .catch(error => {
        console.log("fail")
      });
  };

  return (
    <div id ='register_contents_container'>

      <h2>Register</h2>
      
       <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={e => setFirstname(e.target.value)} />
        </div>
        <div>
        <label>Last Name:</label>
          <input type="text" value={lastName} onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        
        <div>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirm(e.target.value)} />
        </div>
        <button onClick={tryRegister}>Register</button>
        <h2>{errorMessage}</h2>
    </div>
  );
};

export default Register;
