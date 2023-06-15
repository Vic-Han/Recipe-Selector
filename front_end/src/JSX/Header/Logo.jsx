import React from 'react';
import '../../CSS/Logo.css';

function Logo(props) {
  
    return (
    <div id = "logo_container">
    <h1 onClick={props.clickHandler}>Find Your Recipe</h1>
    </div>
    );
}

export default Logo;