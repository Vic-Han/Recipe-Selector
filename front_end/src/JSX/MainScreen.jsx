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
        avoidIngredientList:[],
        recipeList : [],
        matchesSearchPrefix: [],
        matchesAvoidedIngredients: [],
        matchesTargetIngredients: [],
        matchesFlags: [],
       }
       this.viewRecipeEvent = props.viewRecipeEvent
       this.recipeList = []
       this.flagList = Info.flagArray()
       
       this.flagToInt = new Map()
       
       for(let i = 0; i < this.flagList.length; i++){
        this.flagToInt[this.flagList[i]] = i
       }
       this.optimizedRecipeKeys =[];
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
            this.optimizedRecipeKeys.length = list.length
            const allRecipes = [...list]
            for(let i=0 ;i < allRecipes.length; ++i){
            
             let recipeKey = {
                 ingredientList : new Set(),
                 flagList: new Array(Info.flagArray().length).fill(false)
             }
             
             for(let a = 0; a < allRecipes[i].ingredients.length; a++){
                 recipeKey.ingredientList.add(allRecipes[i].ingredients[a].name)
             }
              //console.log(this.flagtoInt[allRecipes[4].flags[0]], "Fuck")
             for(let a = 0; a < allRecipes[i].flags.length; a++){
                recipeKey.flagList[this.flagToInt[allRecipes[i].flags[a]]] = true;
             }
             this.optimizedRecipeKeys[i] = (recipeKey)
            }
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
        const newFlags = [...this.state.flags,flagName]
        this.addFlag(flagName).then(() => {
            this.setState({
                flags:[...newFlags],
                matchesFlags : [...this.copyArr],
            })
        })
       }
    }
    saveIngredients = async(operation, ingr, list) => {
        const ingrName = ingr.name
        if(operation == '-'){
            if(list == 'target'){
                this.copyArr = [...this.state.matchesTargetIngredients]
                const newList = this.state.targetIngredientList.filter(item => item !== ingrName)
                console.log(newList)
                this.removeDesiredIngredient(ingrName).then(() => {
                    this.setState({
                        targetIngredientList: [ ...newList ],
                        matchesTargetIngredients:[...this.copyArr]
                    })
                })
                
            }
            else if(list == 'avoid'){
                const newList = this.state.avoidIngredientList.filter(item => item !== ingrName)
                this.copyArr = [...this.state.matchesAvoidedIngredients]

                this.removeNonDesiredIngredient(ingrName).then(() => {
                    this.setState({
                        avoidIngredientList: [ ...newList ],
                        matchesAvoidedIngredients: [...this.copyArr]
                    })
                })
                
            }
        }
        else if(operation == '+'){
            if(list == 'target'){
                const newList = [...this.state.targetIngredientList,ingrName]
                this.copyArr = [...this.state.matchesTargetIngredients]
                this.addDesiredIngredient(ingrName).then(() => {
                    this.setState({
                        targetIngredientList: [ ...newList ],
                        matchesTargetIngredients: [...this.copyArr]
                    })
                })

            }
            else if(list == 'avoid'){
                const newList = [...this.state.avoidIngredientList,ingrName]
                this.copyArr = [...this.state.matchesAvoidedIngredients]

                this.addNonDesiredIngredient(ingrName).then(() => {
                    this.setState({
                        avoidIngredientList: [...newList],
                        matchesAvoidedIngredients: [...this.copyArr]
                    })
                })
            
            }
        }
        console.log(this.state.matchesAvoidedIngredients)
        console.log(this.state.matchesTargetIngredients)
    }

    removeFlag = async(flagName) =>{
        const newFlags = this.state.flags.filter(item => item !== flagName)
        const flagIntKeys = newFlags.map(flag => this.flagToInt[flag])
        for(let index = 0; index < this.copyArr.length; index++){
            let hasAll = true
            flagIntKeys.forEach(intKey => {
                hasAll &= this.optimizedRecipeKeys[index].flagList[intKey]
            })
            this.copyArr[index] |= hasAll
        }
        return;
    }

    addFlag = async(flagName) =>{
        console.log(this.optimizedRecipeKeys)
        const intKey = this.flagToInt[flagName]
        for(let index = 0; index < this.copyArr.length; index++){
            this.copyArr[index] &= this.optimizedRecipeKeys[index].flagList[intKey]
        }
        return;
    }

    addDesiredIngredient = async(ingrName) => {
        for(let index = 0; index < this.copyArr.length; index++){
            this.copyArr[index] &= this.optimizedRecipeKeys[index].ingredientList.has(ingrName)
        }
        return;
    }

    removeDesiredIngredient = async(ingrName) => {
        console.log("Trying to remove: ", ingrName)
        const newTargetIngrList = this.state.targetIngredientList.filter(ingr => ingr!== ingrName);
        console.log(newTargetIngrList)
        for(let index = 0; index < this.copyArr.length; index++){
            let hasAll = true
            newTargetIngrList.forEach(target => {
                hasAll &= this.optimizedRecipeKeys[index].ingredientList.has(target)
            })
            console.log(hasAll)
            this.copyArr[index] |= hasAll
        }
        return;
    }

    addNonDesiredIngredient = async(ingrName) => {
        for(let index = 0; index < this.copyArr.length; index++){
            this.copyArr[index] &= !(this.optimizedRecipeKeys[index].ingredientList.has(ingrName))
        }
        return;
    }

    removeNonDesiredIngredient = async(ingrName) => {
        
        const newAvoidIngrList = this.state.avoidIngredientList.filter(ingr => ingr!== ingrName);
        for(let index = 0; index < this.copyArr.length; index++){
            let hasAll = true
            newAvoidIngrList.forEach(target => {
                hasAll &= (!this.optimizedRecipeKeys[index].ingredientList.has(target))
            })
            this.copyArr[index] |= hasAll
        }
        return;
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
                    avoidedIngredientList = {this.state.avoidIngredientList}
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
                        (<div className='recipe_icon_container' key = {"main_screen_recipe"+index}>
                            
                            <RecipeIcon recipe={item} clickHandler ={() => this.viewRecipeEvent(item)}/>
                        </div>) : (null)
                    ))}
            </div>
        </div>
        );
    }
}
export default MainScreen