import React,{useState} from 'react'
import '../../CSS/ProfileIcon.css'
import Info from '../Info'
function ProfileIcon(props)
{
    const localPath = 'http://localhost:3001/'
    const imgPath = Info.getImagePath();
    
    return(
        <div onClick={props.clickHandler}>
            <img src = { localPath+ imgPath} id = "profile_icon"></img>
        </div>
    );
}

export default ProfileIcon