import React from 'react'
import '../CSS/Header.css'
import Info from './Info'
import Logo from "./Header/Logo.jsx"
import FavouritesButton from './Header/FavouritesButton.jsx'
import ProfileIcon from './Header/ProfileIcon'
import LoginButton from './Header/LoginButton'
import ManageButton from './Header/ManageButton'
import RecipeButton from './Header/RecipeButton'
import IngredientsButton from './Header/IngredientsButton'
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
            logo: null,
            favourites: null,
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
            prof_Icon : <LoginButton clickHandler = {this.loginClick}/>,
            favourites: null,
            recipe: null,
            ingredient: null,
            manage: null,
        })
    }
    update = () =>
    {
        let new_favourites = "sdsd";
        let new_recipe = "sdsd";
        let new_ingredient = "sdsd";
        let new_manage = "sdsd";
        let new_prof_Icon = "sds";
        console.log(Info.getPermission())
        if(Info.getPermission() >= 1)
        {
            new_favourites = <FavouritesButton clickHandler = {this.favouritesClick}/>
            new_prof_Icon = <ProfileIcon clickHandler = {this.profClick}/>
        }
        else{
            new_prof_Icon = <LoginButton clickHandler = {this.loginClick}/>
        }
        if(Info.getPermission() >= 2)
        {
            new_recipe = <RecipeButton clickHandler = {this.recipeClick}/>
        }
        if(Info.getPermission() >= 3)
        {
            new_ingredient = <IngredientsButton clickHandler = {this.ingredientClick}/>
            new_manage = <ManageButton clickHandler = {this.manageClick}/>
            console.log(new_manage)
        }
        console.log(this.state)
        this.setState ( {
            logo: <Logo clickHandler = {this.logoClick}/>,
            prof_Icon : new_prof_Icon,
            favourites: new_favourites,
            recipe: new_recipe,
            ingredient: new_ingredient,
            manage: new_manage,
        })
        this.state.manage = new_manage;
        console.log(this.state)
    }
    render(){
        return(
            <div className='horizontal_container' id = 'Header'>
                <div className='horizontal_component'>
                    {this.state.logo}
                </div>
                <div className='horizontal_component'>
                    {this.state.favourites}
                </div>
                <div className='horizontal_component'>
                    {this.state.recipe}
                </div>
                <div className='horizontal_component'>
                    {this.state.ingredient}
                </div>
                <div className='horizontal_component'>
                    {this.state.manage}
                </div>
                <div className='horizontal_component'>
                    {this.state.prof_Icon}
                </div>
            </div>
        )
    }
}

export default Header