import React, { useState } from 'react';
import '../../CSS/RecipeCreate.css'
import UploadImage from '../UploadImage';
import Info from '../Info'
import RecipePopup from './RecipePopup';
import axios from 'axios';
function RecipeCreate(props)
{
    const backEvent = props.backEvent;
    const [recipeName,setName] = useState("")
    const [ingredientList, editIngredientList] = useState([])
    const [instructionList, editInstructions] = useState([])
    const ingredientOptions = Info.getAllIngredients()
    const [image, setImage] = useState(null)
    const [popup, setPopup] = useState(null)
    const localPath = `http://localhost:3001/`
    const newIngr = 
    {
        ingredient: "",
        amount: 0,
        unit: "",
        searchPrefix: "",
        imagePath: "http://localhost:3001/images/general/default.png",
        availibleIngredients: ingredientOptions,

    }
    const nametoKey = {}
    const nametoID = {}
    ingredientOptions.map((item,index)=>{
        nametoKey[item.name] = item.imagePath
        nametoID[item.name] = item._id 
    })
    
    const closePopup = () =>{
        setPopup(null)
    }
    const previewRecipe = () => {
        const ingredientPairs = []
        ingredientList.map((item,index) =>{
            ingredientPairs[index] = {
                name: item.ingredient,
                amount: item.amount.toString() + " " + item.unit
            }
        })
        const recipeInfo = {
            instructions: instructionList,
            ingredients: ingredientPairs,
            name: recipeName,
            image: image

        }
        setPopup( <RecipePopup closePopup = {closePopup} recipeInfo = {recipeInfo} />)
    }
    const saveRecipe = async() => {
        const finalIngredientList = []
        ingredientList.map((item,index) => {
            finalIngredientList[index] = 
            {
                id: nametoID[item.ingredient],
                amount: {
                    unit: item.unit,
                    number: item.amount
                }
            }
        })
        console.log(finalIngredientList)
        const params = {
            name: encodeURIComponent(recipeName),
            instructions: encodeURIComponent(JSON.stringify(instructionList)),
            ingredients:encodeURIComponent(JSON.stringify(finalIngredientList)),
        }
        const queryParams = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    
        const response = await fetch(`${localPath}newrecipe?${queryParams}`)
        const result = await response.json()
        const id = result._id;
        console.log(id)
        if(image !== null){
            const formData = new FormData();
            formData.append('image', image);
            formData.append('id', id)
            await axios.post(localPath+'uploadrecipeimage', formData)
        }
    }
    const cancelEvent = () => {
        backEvent();
    }
    const setIngredient = (index, value) =>{

        const newIngrList = [...ingredientList];
        newIngrList[index].ingredient = value;
        newIngrList[index].imagePath = localPath + nametoKey[value];
        editIngredientList(newIngrList)
    }
    const editSearchPrefix = (index,value) =>{
        const newIngrList = [...ingredientList];
        newIngrList[index].searchPrefix = value;
        editIngredientList(newIngrList)
    }
    const setAmount = (index,value) =>{
        const newIngrList = [...ingredientList];
        newIngrList[index].amount = value;
        editIngredientList(newIngrList)
    }
    const setUnit = (index,value) =>{
        const newIngrList = [...ingredientList];
        newIngrList[index].unit = value;
        editIngredientList(newIngrList)
    }
    const addIngredient = () => {
        
        const newIngrList = [...ingredientList,newIngr]
        editIngredientList(newIngrList)
    }
    const addInstruction = () =>{
        const newInstrList = [...instructionList,""]
        editInstructions(newInstrList)
    }
    const setInstrction = (index,value) =>{
        const newInstrList = [...instructionList]
        newInstrList[index] = value;
        editInstructions(newInstrList)
    }
    return(
        <div>
            <div>{popup }</div>
            <div className='create_recipe_header'>
                <div>
                    <p> Recipe Name</p>
                    <input type='text' value = {recipeName} onChange={e => setName(e.target.value)}></input>
                </div>
                
                <h3 onClick={previewRecipe}> Preview </h3>
                <h3 onClick={saveRecipe}> Save </h3>
                <h3 onClick = {cancelEvent}> Cancel </h3>
            </div>
            <div className='create_recipe_contents'>
                <div className='create_recipe_image'>
                <UploadImage saveEvent = {setImage}/>
                </div>
                <div className='create_recipe_ingredient_list'>
                    <h1 align = "center"> Ingredients: </h1>
                    {ingredientList.map((object,index)=>(
                        <div className='create_recipe_ingredient'>
                            <img src ={object.imagePath} className='ingredient_preview_image'></img>
                            <div className = "ingredient_select">
                                <p className='select_component'> Search: </p>
                                <input className='select_component' type ="text" value = {object.searchPrefix} 
                                onChange={e => {editSearchPrefix(index,e.target.value)}}/>
                                <select className='select_component' size = "1"value= {newIngr.name} onChange={e => {setIngredient(index,e.target.value)}}>
                                <option value={newIngr.name}>
                                            {""}
                                        </option>
                                {ingredientOptions.map((ingr, indice) => ( 
                                    
                                    (ingr.name.toLowerCase().startsWith(object.searchPrefix.toLowerCase()) ) ?
                                        ( <option value={ingr.name}>
                                            {ingr.name}
                                        </option>) : null
                                    

                                ))}
                                </select>
                            </div>
                    
                            <div className='amount_select'>
                                <p className='select_component'> Search: </p>
                                <input className='select_component' type ="number" value = {object.amount} 
                                onChange={e => {setAmount(index,e.target.value)}}/>
                            <select size = "1"value={object.unit} onChange={e => {setUnit(index,e.target.value)}}>

                                <option value={" "}>
                                    {" "}
                                </option>
                                <option value={"ml"}>
                                    {"ml"}
                                </option>
                                <option value={"grams"}>
                                    {"grams"}
                                </option>
                                            

                                        
                            </select>
                            </div>
                        </div>
                    ))}
                    <h1 onClick={addIngredient} className='add_button'> + </h1>
                </div>
                <div className='create_recipe_instruction_list'>
                    {instructionList.map((instruction,index)=>(
                        <div>
                            <h4>{index+1}: </h4>
                            <input type = "text" value = {instruction} onChange = {e =>{setInstrction(index,e.target.value)}}/>
                        </div>
                    ))}
                    <h1 onClick={addInstruction} className='add_button'> + </h1>
                </div>
            </div>
        </div>
    )
}

export default RecipeCreate