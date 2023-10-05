import React, { useEffect, useState } from 'react';
import '../../CSS/RecipeCreate.css'
import UploadImage from '../UploadImage';
import Info from '../Info'
import RecipePopup from './RecipePopup';
import IngredientIcon from './IngredientIcon';
import axios from 'axios';
function RecipeCreate(props)
{
    const backEvent = props.backEvent;

    const [ingredientScreen, setIngredientScreen] = useState(true)
    const [instructionScreen, setInstructionsScreen] = useState(false)
    const [imageScreen, setImageScreen] = useState(false)
    const [recipeName,setName] = useState("")
    const [ingredientList, editIngredientList] = useState([])
    const [instructionList, editInstructions] = useState([])
    const [ingredientOptions, setIngredientOptions]= useState(Info.getAllIngredients())
    const [ingredientFilter, setIngredientFilter] = useState("")
    const [image, setImage] = useState(null)
    const [popup, setPopup] = useState(null)
    const [amount_form_visible, set_amount_form] = useState(null)
    const [selected_ingredient, set_selected_ingredient] = useState(null)
    const [selected_ingredient_quanity, set_quanitity] = useState(null)
    const [selected_ingredient_unit, set_unit] = useState("servings")
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorVisible, setErrorVisible] = useState(false)
    const addIngredient = () => {
        const newIngr = {
            amount: selected_ingredient_quanity,
            unit: selected_ingredient_unit,
            ingredient: selected_ingredient,
        }
        const newIngrList = [...ingredientList,newIngr]
        editIngredientList(newIngrList)
        set_amount_form(false)
        set_selected_ingredient(null)
        set_quanitity(null)
        set_unit("servings")
    }
    const submitForm = () =>{
        if(selected_ingredient_quanity === 0 || selected_ingredient_quanity === null){
            setErrorMessage("Amount cannot be zero")
            setErrorVisible(true)
            setTimeout(() => {setErrorVisible(false)}, 2500)
            return;
        }
        addIngredient()
    }
    const cancelForm = () => {
        setIngredientOptions([...ingredientOptions,selected_ingredient])
        set_amount_form(false)
        set_selected_ingredient(null)
        set_quanitity(null)
        set_unit(null)
    }
    
    const localPath = `http://localhost:3001/`
    const amountClickHandler = e => {
        const amountForm = document.getElementById("amount_form")
        if(amountForm !== null && !amountForm.contains(e.target)){
            e.stopPropagation(); // Prevent further propagation of the click event
            e.preventDefault();
            setErrorMessage("Please select amount or cancel")
            setErrorVisible(true)
            setTimeout(() => {setErrorVisible(false)}, 2500)
        }
    }
    useEffect(()=>{
        if(amount_form_visible === true){
            document.addEventListener('click',amountClickHandler)
        }
        return () =>{
            document.removeEventListener('click',amountClickHandler)
        }
    },[amount_form_visible])
   
    const nametoKey = {}
    const nametoID = {}
    ingredientOptions.map((item,index)=>{
        nametoKey[item.name] = item.imagePath
        nametoID[item.name] = item._id 
    })
    const openInstructionPage = () =>{
        if(ingredientList.length === 0){
            
            return;
        }
        setIngredientScreen(false)
        setInstructionsScreen(true)
        setImageScreen(false)
    }
    const openIngredientPage = () =>{
        setIngredientScreen(true)
        setInstructionsScreen(false)
        setImageScreen(false)
    }
    const openImagePage = () =>{
        if(instructionList.length === 0){
            return;
        }
        setIngredientScreen(false)
        setInstructionsScreen(false)
        setImageScreen(true)
    }
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
                id: item.ingredient._id,
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
            ingredients: encodeURIComponent(JSON.stringify(finalIngredientList)),
            userID: encodeURIComponent(Info.getUserID())
        }
        const queryParams = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    
        const response = await fetch(`${localPath}newrecipe?${queryParams}`)
        const result = await response.json()
        Info.addRecipe(result)
        const id = result._id;
        console.log(id)
        if(image !== null){
            const formData = new FormData();
            formData.append('image', image);
            formData.append('id', id)
            await axios.post(localPath+'uploadrecipeimage', formData)
        }
        backEvent();
    }

    const removeIngredient = (index) =>{
        const newIngrArray = [...ingredientList];
        const newIngrOptions = [...ingredientOptions,ingredientList[index].ingredient]
        newIngrArray.splice(index , 1 );
        setIngredientOptions(newIngrOptions);
        editIngredientList(newIngrArray);
    }
    const addInstruction = (index) => {
        const newInstrList = [...instructionList]
        newInstrList.splice(index, 0, "");
        editInstructions(newInstrList)
    }
    const setInstruction = (index,value) =>{
        const newInstrList = [...instructionList]
        newInstrList[index] = value;
        editInstructions(newInstrList)
    }
    const deleteInstruction = (index) =>{
        if(instructionList.length === 1){
            editInstructions([])
            return;
        }
        const newInstrList = [...instructionList]
        newInstrList.splice(index,1);
        editInstructions(newInstrList)
    }
    const addIngredientForm = (ingr) =>{
        if(amount_form_visible === true){
            return;
        }
        set_amount_form(true)
        set_selected_ingredient(ingr)
        const newingrOptionList = ingredientOptions.filter(i => i !== ingr);
        setIngredientOptions(newingrOptionList);
        
    }
    return(
        <div>
            <div>{popup }</div>
            
            <div className='create_recipe_contents'>
                
                {imageScreen? (<div className='create_recipe_final_page'>
                <div className='recipe_name_input'>
                    <h1> Recipe Name</h1>
                    <input type='text' value = {recipeName} onChange={e => setName(e.target.value)}></input>
                </div>
                <div className='create_recipe_image'> <UploadImage saveEvent = {setImage}/></div>
                {<div className='create_recipe_header'>
               
                
                <h3 onClick={previewRecipe}> Preview </h3>
                <h3 onClick={saveRecipe}> Save </h3>
                <h3 onClick = {openInstructionPage}> Back </h3>
            </div>}
                </div>): null}
                {ingredientScreen?
                (<div className='create_recipe_ingredient_list'>
                    <div className='ingredient_option_container'>
                        <h2 className='ingredient_option_text'> Click an Ingredient to add</h2>
                    <input className = "ingr_option_filter" type = "text" value ={ingredientFilter} onChange={e => {setIngredientFilter(e.target.value)}}/>
                    <div className='ingredient_option_list'> 
                        {ingredientOptions.map((item,index)=>(
                            item.name.toLowerCase().includes(ingredientFilter.toLowerCase())?
                            (<div className='ingredient_option'>
                                <IngredientIcon ingredient={item} clickHandler ={() => {
                                    addIngredientForm(item)
                                }}/>
                            </div>):null
                        ))}
                    </div>
                    </div>
                    <div className='current_ingredient_list'>
                    <h1 className='ingredient_option_text'> List:</h1>   
                        {ingredientList.map((item,index) => (
                            item.unit === "servings"?
                            (<div className='current_ingredient_item'>
                                <h3>{item.amount + " " + item.ingredient.name + "s"}</h3>
                                <h2 className='delete_ingredient_button' onClick={() => {removeIngredient(index)}}>-</h2>
                            </div>):
                            (<div  className='current_ingredient_item'>
                                <h3>{item.ingredient.name + " " + item.unit + " " + item.amount}</h3>
                                <h2 className='delete_ingredient_button' onClick={() => {removeIngredient(index)}}>-</h2>
                                </div>)
                        ))}
                        {selected_ingredient ? (<img className = "selected_ingr_image" src = {localPath+selected_ingredient.imagePath}/>):null}
                        {amount_form_visible?(<div id = "amount_form">
                            <h3>Amount</h3><input type="number" value = {selected_ingredient_quanity} 
                            min={1} max={5000} onChange ={ e => set_quanitity(e.target.value)}/>
                            <select size = "1"  value = {selected_ingredient_unit} onChange={e => set_unit(e.target.value)}>
                                <option value={"servings"}>{"servings"}</option>
                                <option value={"ml"}>{"ml"}</option>
                                <option value={"grams"}>{"grams"}</option>
                                </select>
                                <div className='submit_amount_button_conatiner'><div onClick={submitForm}> Done </div> <div onClick = {cancelForm}>Cancel</div></div>
                                <div className={`error_message ${errorVisible? 'visible_error':''}`}>{errorMessage}</div>
                        </div>):null}
                    </div>
                   <h2 onClick={openInstructionPage}> Next </h2> <h2>Cancel</h2>
                </div>) : null}
                {instructionScreen?
                (<div>
                    <div className='create_recipe_instruction_list'>
                    {instructionList.map((instruction,index)=>(
                        <div className='instruction_item'>
                            <h4>{index+1}: </h4>
                            <input type = "text" value = {instruction} onChange = {e =>{setInstruction(index,e.target.value)}}/>
                            <h4 className='instruction_button' onClick={() => {addInstruction(index)}}> + </h4> <h4 className='instruction_button' onClick={()=>{deleteInstruction(index)}}> - </h4>
                        </div>
                    ))}
                    <h1 onClick={addInstruction} className='add_button'> + </h1>
                    </div>
                    <div><h2 onClick={openImagePage}>Next</h2><h2 onClick={openIngredientPage}>Back</h2></div>
                </div>) : null
                }
            </div>
        </div>
    )
}

export default RecipeCreate