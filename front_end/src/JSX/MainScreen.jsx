import React from 'react'
import '../CSS/MainScreen.css'

import IngredientSelect from './MainScreen/IngredientSelect';
import Filters from './MainScreen/Filters';
import RecipeAI from './MainScreen/RecipeAI';
import Info from './Info'
import RecipeIcon from './EditIngredient/RecipeIcon';
class MainScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        searchOption: null,
        buttonHighLight: [true,false,false],
        searchFilter: "",
        flags: [],
        targetIngredientList: [],
        avoidedIngredientList:[],
        recipeList : [],
        matchesSearchPrefix: [],
        matchesAvoidedIngredients: [],
        matchesTargetIngredients: [],
        matchesFlags: [],
       }
       this.viewRecipeEvent = props.viewRecipeEvent
       this.recipeList = []
       this.flagList = Info.flagArray()
       
       this.flagToInt = {}
       
       for(let i = 0; i < this.flagList.length; i++){
        this.flagToInt[this.flagList[i]] = i
       }
        
       const allRecipes = Info.getAllRecipes()
       this.optimizedRecipeKeys = []
       for(let i=0 ;i < allRecipes.length; ++i){
       
        let recipeKey = {
            ingredientList : new Set(),
            flagList: new Array(Info.flagArray().length).fill(false)
        }
        
        for(let a = 0; a < allRecipes[i].ingredients.length; a++){
            recipeKey.ingredientList.add(allRecipes[i].ingredients[a].name)
        }
        
        for(let a = 0; a < allRecipes[i].flags.length; a++){
            recipeKey.flagList[this.flagtoInt[allRecipes[i].flags[a]]] = true;
        }
        this.optimizedRecipeKeys.push(recipeKey)
       }
    }
    componentDidMount(){
        this.buttonToggle(0)
        Info.getAllRecipes().then(list =>{
            this.setState({
                recipeList: list,
                matchesSearchPrefix: Array.from({ length: list.length }, () => true),
                matchesAvoidedIngredients: Array.from({ length: list.length }, () => true),
                matchesTargetIngredients: Array.from({ length: list.length }, () => true),
                matchesFlags: Array.from({ length: list.length }, () => true),
            })

        })
    }
    meets_criteria(recipe)
    {
        if(!recipe.name.toLowerCase().startsWith(this.state.searchFilter.toLowerCase()))
        {
            return false;
        }
        return true;
    }
    saveFlags = async(operation, flagName) => {
       if(operation == '-'){
        this.copyArr = [...this.state.matchesFlags];
        const newFlags = this.state.flags.filter(item => item !== flagName)
        this.removeFlag(flagName).then(() =>{
            this.setState({
                flags:newFlags,
                matchesFlags : [...this.copyArr],
            })
        })
       }
       else if(operation == '+'){
        this.copyArr = [...this.state.matchesFlags];
        const newFlags = this.state.flags.filter(item => item !== flagName)
        this.addFlag(flagName).then(() =>{
            this.setState({
                flags:newFlags,
                matchesFlags : [...this.copyArr],
            })
        })
       }
    }
    saveIngredients = async(operation, ingrName, list) => {
        if(operation == '-'){
            if(list == 'target'){
                await this.addDesiredIngredient(ingrName)
            }
            else if(list == 'avoid'){
                await this.removeDesiredIngredient(ingrName)
            }
        }
        else if(operation == '+'){
            if(list == 'target'){
                await this.addNonDesiredIngredient(ingrName)
            }
            else if(list == 'avoid'){
                await this.removeDesiredIngredient(ingrName)
            }
        }

    }
    removeFlag = async(flagName) =>{
        const newFlags = this.state.flags.filter(item => item !== flagName)
        const flagIntKeys = newFlags.map(flag => this.flagToInt[flag])
        for(let index = 0; index < this.copyArr.length; index++){
            const hasAll = true
            flagIntKeys.forEach(intKey => {
                hasAll &= this.optimizedRecipeKeys[index].flagList[intKey]
            })
            this.copyArr[index] |= hasAll
        }
    }
    addFlag = async(flagName) =>{
        const intKey = this.flagToInt[flagName]
        for(let index = 0; index < this.copyArr.length; index++){
            this.copyArr[index] &= this.optimizedRecipeKeys[index].flagList[intKey]
        }
    }
    addDesiredIngredient = async(ingrName) => {
        for(let index = 0; index < this.copyArr.length; index++){
            this.copyArr[index] &= this.optimizedRecipeKeys[index].ingredientList.has(ingrName)
        }
    }
    removeDesiredIngredient = async(ingrName) => {
        const newTargetIngrList = this.state.avoidedIngredientList.filter(ingr => ingr!== ingrName);
        for(let index = 0; index < this.copyArr.length; index++){
            const hasAll = true
            newTargetIngrList.forEach(target => {
                hasAll &= this.optimizedRecipeKeys[index].ingredientList.has(target)
            })
            this.copyArr[index] |= hasAll
        }
    }
    addNonDesiredIngredient = async(ingrName) => {
        for(let index = 0; index < this.copyArr.length; index++){
            this.copyArr[index] &= !(this.optimizedRecipeKeys[index].ingredientList.has(ingrName))
        }
    }
    removeNonDesiredIngredient = async(ingrName) => {
        const newAvoidIngrList = this.state.avoidedIngredientList.filter(ingr => ingr!== ingrName);
        for(let index = 0; index < this.copyArr.length; index++){
            const hasAll = true
            newAvoidIngrList.forEach(target => {
                hasAll &= (!this.optimizedRecipeKeys[index].ingredientList.has(target))
            })
            this.copyArr[index] |= hasAll
        }
    }
    buttonToggle = (value) =>{
        if(value === 0){
            this.setState({
                searchOption: <Filters flags = {this.state.flags} saveFlags ={this.saveFlags}/>,
                buttonHighLight: [true,false,false]
            })
            this.resetAI()
        }
        else if(value === 1){
            this.setState({
                searchOption: <IngredientSelect 
                    targetIngredientList = {this.state.targetIngredientList}
                    avoidedIngredientList = {this.state.avoidedIngredientList}
                    editIngredients = {this.saveIngredients}

                />,
                buttonHighLight: [false,true,false]
            })
            this.resetAI()
        }
        else if(value === 2){
            this.setState({
                searchOption: <RecipeAI/>,
                buttonHighLight: [false,false,true]
            })
        }
    }
    resetAI = () =>{

    }
    render()
    {
        return(
        <div id = "main_screen_container" className=''>
            <div id = "left_view"> 
                <div className='basic_search_main_screen'>
                    <label> Search </label>
                    <input type = "text" value = {this.state.filter} onChange={e => this.setState({filter: e.target.value})}></input>
                </div> 
                <div className='advanced_search_buttons'>
                    <button 
                    className={`advanced_search_button ${this.state.buttonHighLight[0] ? 'toggled' : ''}`}
                    onClick={() => this.buttonToggle(0)}>
                        Dietary Restrictions
                    </button>
                    <button 
                    className={`advanced_search_button ${this.state.buttonHighLight[1] ? 'toggled' : ''}`}
                    onClick={() => this.buttonToggle(1)}>
                        Ingredient Select
                    </button>
                    <button 
                    className={`advanced_search_button ${this.state.buttonHighLight[2] ? 'toggled' : ''}`}
                    onClick={() => this.buttonToggle(2)}>
                        Help Bot
                    </button>
                </div>
                <div className='advanced_search_display'>
                    {this.state.searchOption}   
                </div>
            </div>
            <div id = "right_view" className=''> 
            {this.state.recipeList.map( (item, index)=> (
                    this.state.matchesSearchPrefix[index] && this.state.matchesFlags[index]
                    && this.state.matchesTargetIngredients[index] && this.state.matchesAvoidedIngredients[index]?
                        (<div className='recipe_icon_container' >
                            
                            <RecipeIcon recipe={item} clickHandler ={() => this.viewRecipeEvent(item)}/>
                        </div>) : (null)
                    ))}
            </div>
        </div>
        );
    }
}
export default MainScreen