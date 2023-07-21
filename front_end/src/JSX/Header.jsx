import React from 'react'
import '../CSS/Header.css'
import Info from './Info'
import Logo from "./Header/Logo.jsx"
import HeaderButton from './Header/HeaderButton.jsx'
import ProfileIcon from './Header/ProfileIcon'
class Header extends React.Component
{
    constructor(props)
    {
        super(props)
        this.logoClick = props.eventHandlers.logoClick;
        this.favouritesClick = props.eventHandlers.favouritesClick;
        this.recipeClick = props.eventHandlers.recipeClick;
        this.ingredientClick = props.eventHandlers.ingredientClick;
        this.manageClick = props.eventHandlers.manageClick;
        this.profClick = props.eventHandlers.profClick;
        this.loginClick = props.eventHandlers.loginClick;
        this.state = {
            logo: <Logo clickHandler = {this.logoClick}/>,
            favourites: ((Info.permission > 0) ? (<HeaderButton clickHandler = {this.favouritesClick} text = "Favourites"/>): null),
            recipe: null,
            ingredient: null,
            manage: null,
            prof_Icon : null
            
        }
   
        Info.addObserver(this.update)
        //this.update()
    }
    componentDidMount()
    {
        this.setState({
            logo: <Logo clickHandler = {this.logoClick}/>,
            prof_Icon : <HeaderButton clickHandler = {this.loginClick} text = "Login"/>,
            favourites: null,
            recipe: null,
            ingredient: null,
            manage: null,
        })
    }
    update = () =>
    {
        console.log(Info.getPermission())
        let new_favourites = "";
        let new_recipe = "";
        let new_ingredient = "";
        let new_manage = "";
        let new_prof_Icon = "";

        if(Info.getPermission() >= 1)
        {
            new_favourites = <HeaderButton clickHandler = {this.favouritesClick} text = "Favourites"/>
            new_prof_Icon = <ProfileIcon clickHandler = {this.profClick}/>
        }
        else{
            new_prof_Icon = <HeaderButton clickHandler = {this.loginClick} text = "Login"/>
        }
        if(Info.getPermission() >= 2)
        {
            new_recipe = <HeaderButton clickHandler = {this.recipeClick} text = "Add Recipe"/>
        }
        if(Info.getPermission() >= 3)
        {
            new_ingredient = <HeaderButton clickHandler = {this.ingredientClick} text = "Edit Ingredients"/>
            new_manage = <HeaderButton clickHandler = {this.manageClick} text = "Manage Users"/>
        }
        this.setState ( {
            logo: <Logo clickHandler = {this.logoClick}/>,
            prof_Icon : new_prof_Icon,
            favourites: new_favourites,
            recipe: new_recipe,
            ingredient: new_ingredient,
            manage: new_manage,
        })
       
    }
    render(){
        return(
            <div className='horizontal_container' id = 'Header'>
                <div className='horizontal_component header_component'>
                    {this.state.logo}
                </div>
                <div className='horizontal_component header_component'>
                    {this.state.favourites}
                </div>
                <div className='horizontal_component header_component'>
                    {this.state.recipe}
                </div>
                <div className='horizontal_component header_component'>
                    {this.state.ingredient}
                </div>
                <div className='horizontal_component header_component'>
                    {this.state.manage}
                </div>
                <div className='horizontal_component header_component'>
                    {this.state.prof_Icon}
                </div>
            </div>
        )
    }
}

export default Header