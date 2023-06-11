import React from "react";
import '../../CSS/Filters.css'

class Filters extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        preferences: props.filters,
        userID : props.userID,
      };
     

    }
  
    handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      const { preferences } = this.state;
      preferences[name] = checked;
      this.setState({ preferences });
    };
    handleFavorites = (event) => {
        const { name, checked } = event.target;
        if(this.state.userID === -1){

        }
        else{
            const { preferences } = this.state;
            preferences[name] = checked;
            this.setState({ preferences });
        }
    };
    render() {
      const { preferences } = this.state;
  
      return (
        <div>
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
        </div>
      );
    }
  }

export default Filters;