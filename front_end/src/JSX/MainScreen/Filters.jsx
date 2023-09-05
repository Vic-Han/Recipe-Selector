import React, { useState } from "react";
import '../../CSS/Filters.css'
import Info from '../Info'
function Filters (props) {
  const saveFlags = props.saveFlags
  const [flags,changeFlags] = useState(props.flags)
  const handleCheckboxClick = (event) => {
    const value = event.target.value;
    if (event.target.checked){
      const newFlags = [...flags,value]
      saveFlags(newFlags)
      changeFlags(newFlags)
    }
    else{
      const newFlags = flags.filter(item => item !== value)
      saveFlags(newFlags)
      changeFlags(newFlags)
    }
    
  };

   
  return (
    <div>
      <div> 
        {Info.flagArray().map((restriction) => (
        <div key={restriction}>
        <label>
        {restriction}
        </label>
        <input
          type="checkbox"
          value={restriction}
          checked={flags.includes(restriction)}
          onChange={handleCheckboxClick}
        ></input>
                        
        </div>
        ))}
      </div>
    </div>
  );
  }

export default Filters;

/*<div>
            <div id = "favorites">
                <label>
                favorites:
                <input
                type="checkbox"
                name= "favorites"
                checked={preferences["favorites"] || false}
                onChange={this.handleFavorites}></input>
                </label>
            </div>
            <div className="filter_container">
            {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="filter">
                    <label>
                    {key}:
                    <input
                    type="checkbox"
                    name={key}
                    checked={preferences[key] || false}
                    onChange={this.handleCheckboxChange}></input>
                    </label>
                </div>
            
            ))}
            </div>
        </div>*/