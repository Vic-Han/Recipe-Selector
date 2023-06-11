import React from 'react';
import '../../CSS/BasicSearch.css';

class BasicSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: ''
    };
  }

  handleInputChange(event) {
    this.setState({ recipeName: event.target.value });
  }

  search() { 
    const { recipeName } = this.state;
    this.props.searchEvent(recipeName);
  }

  render() {
    return (
      <div>
        <div className='horizontal_container'>
          <h2 className='horizontal_component'>Search for a recipe</h2>
          <input
            type="text"
            className='horizontal_component'
            value={this.state.recipeName}
            onChange={(event) => this.handleInputChange(event)}
          />
        </div>
        <button onClick={() => this.search()}>Search</button>
      </div>
    );
  }
}

export default BasicSearch;
