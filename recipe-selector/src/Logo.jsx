import React from 'react';
import './CSS/Logo.css';

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = props.clickHandler;
  }

  render() {
    return (
    <div id = "logo_container">
    <h1 onClick={this.clickHandler}>Find Your Recipe</h1>
    </div>
    );
  }
}

export default Logo;