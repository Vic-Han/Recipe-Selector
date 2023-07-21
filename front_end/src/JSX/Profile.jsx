
import React ,{useState} from 'react'
import '../CSS/Profile.css'
import UploadImage from './UploadImage'
import Info from './Info'
function Profile(props)
{
    const [defaultScreen,updateScreen] = useState(true) 
    const [imageFile,setImage] = useState(null)
    const logoutEvent = () =>{
        Info.setEmail("");
        props.logoutEvent();
    }
    
    const updateImage = () => {
        if(imageFile === null){
            return;
        }
    }
    return(
        <div>
            {defaultScreen ? 
            (<div>
                <h2 onClick={() => {updateScreen(false)}}> Update Profile Picture</h2>
                <h2 onClick={logoutEvent}> Logout</h2>
            </div>)
            :(<div>
                <h2>Select New Photo</h2>
                <UploadImage saveEvent = {setImage}/>
                <h2 onClick={updateImage}> Update</h2>
                <h2 onClick={() => {updateScreen(true)}}>Back </h2>
            </div>)
            }
        </div>
    )
}


export default Profile