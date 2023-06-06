import React from 'react'
import '../CSS/MainScreen.css'
import BasicSearch from './MainScreen/BasicSearch';
import AdvancedSearch from './MainScreen/AdvancedSearch';
class MainScreen extends React.Component{
    constructor(props){
        super(props)
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
                <AdvancedSearch/>
            </div>
            <div id = "right_view"> </div>
        </div>
        );
    }
}
export default MainScreen