import React from 'react'
import '../CSS/MainScreen.css'
import BasicSearch from './MainScreen/BasicSearch';
import AdvancedSearch from './MainScreen/AdvancedSearch';
import BasicGuideButton from './MainScreen/BasicGuideButton';
import AddIngredient from './MainScreen/AddIngredient';
class MainScreen extends React.Component{
    constructor(props){
        super(props)
        this.userID = props.userID
        this.filters = props.filters
    }
    search(recipe_name)
    {
        this.props.searchEvent(recipe_name);
    }
    render()
    {
        return(
        <div id = "main_screen_container" className='horizontal_container'>
            <div id = "left_view"> 
                <BasicSearch searchEvent = {this.search}/>
                <AdvancedSearch filters = {this.filters} userID = {this.userID}/>
            </div>
            <div id = "right_view"> 
                <BasicGuideButton/>
                <AddIngredient/>
            </div>
        </div>
        );
    }
}
export default MainScreen