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
        this.buttonIDList = ["favorites","login","add_recipe","edit_ingredient","manage_users"]
        this.logoClick = () => {
            this.buttonIDList.forEach(id => {
                const button = document.getElementById(id)
                if(button != null){
                    button.classList.remove("selected")
                }
            })
            props.eventHandlers.logoClick()
        };
        this.favouritesClick = () => {
            this.buttonIDList.forEach(id => {
                const button = document.getElementById(id)
                if(button != null){
                    button.classList.remove("selected")
                }
            })
            const button = document.getElementById("favorites")
            button.classList.add("selected")
            props.eventHandlers.favouritesClick();
        }
        this.recipeClick = () => {
            this.buttonIDList.forEach(id => {
                const button = document.getElementById(id)
                if(button != null){
                    button.classList.remove("selected")
                }
            })
            const button = document.getElementById("add_recipe")
            button.classList.add("selected")
            props.eventHandlers.recipeClick();
        }
        this.ingredientClick = () => {
            this.buttonIDList.forEach(id => {
                const button = document.getElementById(id)
                if(button != null){
                    button.classList.remove("selected")
                }
            })
            const button = document.getElementById("edit_ingredient")
            button.classList.add("selected")
            props.eventHandlers.ingredientClick();
        }
        this.manageClick = () => {
            this.buttonIDList.forEach(id => {
                const button = document.getElementById(id)
                if(button != null){
                    button.classList.remove("selected")
                }
            })
            const button = document.getElementById("manage_users")
            button.classList.add("selected")
            props.eventHandlers.manageClick();
        }
        this.profClick = () => {
            this.buttonIDList.forEach(id => {
                const button = document.getElementById(id)
                if(button != null){
                    button.classList.remove("selected")
                }
            })
            props.eventHandlers.profClick();
        }
        this.loginClick = () => {
            this.buttonIDList.forEach(id => {
                const button = document.getElementById(id)
                if(button != null){
                    button.classList.remove("selected")
                }
            })
            const button = document.getElementById("login")
            button.classList.add("selected")
            props.eventHandlers.loginClick();
        }
        this.favouritesData ={
            ID: "favorites",
            imagePath: "images/general/starIcon.png",
            text: "Favourites",
            clickHandler: this.favouritesClick
        }
        this.addRecipeData ={
            ID: "add_recipe",
            imagePath: "images/general/panIcon.png",
            text: "Add Recipe",
            clickHandler: this.recipeClick
        }
        this.editIngredientData = {
            ID: "edit_ingredient",
            imagePath: "images/general/editPenIcon.png",
            text: "Edit Ingredients",
            clickHandler: this.ingredientClick
        }
        this.manageUserData = {
            ID: "manage_users",
            imagePath: "images/general/adminIcon.png",
            text: "Manage Users",
            clickHandler: this.manageClick
        }
        this.loginData = {
            ID: "login",
            imagePath: "images/general/loginIcon.png",
            text: "Login",
            clickHandler: this.loginClick
        }
        this.state = {
            logo: <Logo clickHandler = {this.logoClick}/>,
            favourites: ((Info.permission > 0) ? (<HeaderButton data = {this.favouritesData}/>): null),
            recipe: null,
            ingredient: null,
            manage: null,
            prof_Icon : null
            
        }
   
        Info.addObserver(this.update)
    }
    componentDidMount()
    {
        this.setState({
            logo: <Logo clickHandler = {this.logoClick}/>,
            prof_Icon : <HeaderButton data = {this.loginData}/>,
            favourites: null,
            recipe: null,
            ingredient: null,
            manage: null,
        })
    }
    update = () =>
    {
        let new_favourites = "";
        let new_recipe = "";
        let new_ingredient = "";
        let new_manage = "";
        let new_prof_Icon = "";

        if(Info.getPermission() >= 1)
        {
            new_favourites = <HeaderButton data= {this.favouritesData}/>
            new_prof_Icon = <ProfileIcon clickHandler = {this.profClick}/>
        }
        else{
            new_prof_Icon = <HeaderButton data = {this.loginData}/>
        }
        if(Info.getPermission() >= 2)
        {
            new_recipe = <HeaderButton data = {this.addRecipeData}/>
        }
        if(Info.getPermission() >= 3)
        {
            new_ingredient = <HeaderButton data= {this.editIngredientData}/>
            new_manage = <HeaderButton data = {this.manageUserData}/>
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