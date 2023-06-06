import React from 'react';
import '../../CSS/AdvancedSearch.css';

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.userID = props.userID;
  }

  render() {
    return (
    <div id = "advanced_search_container">
    <h1>Advanced Search</h1>
    </div>
    );
  }
}

export default AdvancedSearch;