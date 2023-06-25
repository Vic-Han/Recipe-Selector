import React from 'react';
import '../../CSS/Logo.css';

function Logo(props) {
  
    return (
    <div id = "logo_container" onClick={props.clickHandler}>
        <div id = "logo_small_container">
            <h3 id = "logo_big_text">Find Your Recipe</h3>
            <h6 id = "logo_small_text"> Search Recipes</h6>
        </div>
    </div>
    );
}

export default Logo;