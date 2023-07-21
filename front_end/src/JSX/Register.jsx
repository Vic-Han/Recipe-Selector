
import '../CSS/Register.css'

import React, { useState } from 'react';
import UploadImage from './UploadImage';
import Info from './Info'
import axios from 'axios'
function Register(props){
  const localPath = `http://localhost:3001`
  const [errorMessage, setMessage] = useState('                          ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [infoScreen, setScreen] = useState(true);
  const [imageFile, changeImage] = useState(null)
  const finishRegister = props.finishRegister;
  const validPassword = () =>{
    let passwordValid = false;
    passwordValid |= password.length >= 8;
    passwordValid &= /[a-z]/.test(password);
    passwordValid &= /[A-Z]/.test(password);
    passwordValid &= /[0-9]/.test(password);
    passwordValid &= /[!-?]/.test(password);

    if(!passwordValid){
      setMessage("Password should be at least 8 characters long, with an uppercase, lowercase, and special character")
        setTimeout(() =>{
            setMessage("")
        }, 5000)
    }
    return passwordValid;
  }
  const uniqueEmail = async () => {
    try {
      const response = await fetch(localPath + `/userexists/${encodeURIComponent(email)}/`);
      const data = await response.json();
      if (data === true) {
        setMessage("Email already in use");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        return false
      }
      else{
        return true;
      }
      

    } catch (error) {
      console.log(error);
      return false;
    }
  };
  

  const passwordMatch = () => {
    
    if(password !== confirmPassword)
    {
       setMessage("Passwords don't match")
        setTimeout(() =>{
            setMessage("")
        }, 5000)
    
        return false;
    }
    return true;
  }
  const nextScreen = async() => {
    const unique_email = await uniqueEmail()
   
    if(validPassword() && unique_email && passwordMatch()){
      setScreen(false)
    }
  }
  const register_user = async() => {
    const formData = new FormData();
    let mongoID = null
    console.log({
      realemail: email,
      sentemail: encodeURIComponent(email),
      password: password,
      firstName : firstName,
    })
    await fetch(localPath+`/createuser/${encodeURIComponent(email)}
    /${encodeURIComponent(password)}/${encodeURIComponent(firstName)}/${encodeURIComponent(lastName)}`)
      .then(response => response.json())
      .then(data => {
        mongoID = data.toString()
      })
      .catch(error => {
        console.log(error)
      });
      if(imageFile !== null){
      formData.append('image', imageFile);
      formData.append('id', mongoID)
      await axios.post(localPath+'/uploaduserimage', formData)
      }
      Info.setEmail(email);
      console.log(email)
      finishRegister();
  };

  return (
    <div id ='register_contents_container'>
      
      { infoScreen ?
      (<div><h2>Register </h2>   
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
          <button onClick={nextScreen}> Next </button>
          <h2>{errorMessage}</h2>
        </div>) 
        : (<div className='register_image_upload'>
          
          <UploadImage saveEvent = {changeImage}/>
          <div className='horizontal_container'>
            <button onClick={() => {setScreen (true)}} className='horizontal_component'> Back </button>
            <button onClick={register_user} className='horizontal_component'> Finish </button>
          </div>
          </div>)
        }
    </div>
  );
};

export default Register;
