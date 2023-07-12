import React,{useState} from 'react'
import '../../CSS/ProfileIcon.css'
import Info from '../Info'
function ProfileIcon(props)
{
    const localPath = 'http://localhost:3001/'
    const [imgPath, setPath] = useState('')
    const getPath = async() =>{
        try{
        await fetch(localPath +`getimagepath/${encodeURIComponent(Info.getEmail())}`)
        .then(response => response.json())
        .then(result => {setPath(result)})}
        catch{

        }
    } 
    getPath();
    return(
        <div onClick={props.clickHandler}>
            <img src = { localPath+ imgPath} id = "profile_icon"></img>
        </div>
    );
}

export default ProfileIcon