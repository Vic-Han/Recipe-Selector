import React from 'react';
import '../../CSS/AdvancedSearch.css';
import Filters from './Filters';


class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.userID = props.userID;
    this.filters = props.filters
  }

  render() {
    return (
    <div id = "advanced_search_container">
    <h1>Advanced Search: </h1>
    <Filters filters = {this.filters} userID = {this.userID}/>
    </div>
    );
  }
}

export default AdvancedSearch;