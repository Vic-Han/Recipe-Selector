
import React ,{useState} from 'react'
import '../CSS/Profile.css'
import UploadImage from './UploadImage'
import Info from './Info'
function Profile(props)
{
    const [defaultScreen, setDefaultScreen] = useState(true)
    const [imageScreen, setImageScreen] = useState(false)
    const [nameScreen, setNameScreen] = useState(false) 
    const [imageFile, setImage] = useState(null)
    const user = Info.getUserInfo();
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const logoutEvent = () =>{
        Info.resetUser();
        props.logoutEvent();
    }
    const showDefaultScreen = () =>{
        setNameScreen(false)
        setDefaultScreen(true)
        setImageScreen(false)
    }
    const showImageScreen = () =>{
        setNameScreen(false)
        setDefaultScreen(false)
        setImageScreen(true)
    }
    const showNameScreen = () =>{
        setNameScreen(true)
        setDefaultScreen(false)
        setImageScreen(false)
    }
    const updateImage = () => {
        if(imageFile === null){
            return;
        }
    }
    const updateNames = () => {
        // send message
        showDefaultScreen();
        user.firstName = firstName;
        user.lastName = lastName;
    }
    const cancelNameUpdate = () =>{

    }
    return(
        <div>
            {defaultScreen ? 
            (<div>
                <div onClick={showNameScreen}>
                    Name : {user.firstName}  {user.lastName} {"     >"}
                </div>
                <div>
                    Email: {user.email}
                </div>
                <div>
                    
                </div>
                <h2 onClick={showImageScreen}> Update Profile Picture</h2>
                <h2 onClick={logoutEvent}> Logout</h2>
            </div>)
            :null}
            {imageScreen?(<div className='update_profile_picture'>
                <h2>Select New Photo</h2>
                <UploadImage saveEvent = {setImage}/>
                <h2 onClick={updateImage}> Update</h2>
                <h2 onClick={showDefaultScreen}>Back </h2>
            </div>):null
            }
            {nameScreen? (<div>
                <input type = "text" value = {firstName} onChange={e=>{setFirstName(e.target.value)}}/>
                <input type = "text" value = {lastName} onChange={e=>{setLastName(e.target.value)}}/>
            </div>):null

            }
        </div>
    )
}


export default Profile