import React, { useState } from 'react';
import '../../CSS/IngredientPopup.css'
import Info from '../Info'
import UploadImage from '../UploadImage';
import axios from 'axios';
function IngredientPopup(props)
{
    
    const localPath = 'http://localhost:3001/';
    const new_ingredient = (props.ingredient === null);
    let id = !new_ingredient ? props.ingredient._id : null
    const imagePath = new_ingredient ? localPath + "images/ingredients/default.png" : (localPath) + (props.ingredient.imagePath)
    const [name, changeName] = useState(!new_ingredient ? props.ingredient.name : null);
    const [calories, changeCalories] = useState(!new_ingredient ? props.ingredient.nutrition_facts.calories : null);
    const [carbs, changeCarbs] = useState(!new_ingredient ? props.ingredient.nutrition_facts.carbs : null);
    const [fats, changeFats] = useState(!new_ingredient ? props.ingredient.nutrition_facts.fats : null);
    const [protein, changeProtein] = useState(!new_ingredient ? props.ingredient.nutrition_facts.protein : null);
    const [volume, changeVol] = useState(!new_ingredient ? props.ingredient.nutrition_facts.volumeServing : null);
    const [weight, changeWeight] = useState(!new_ingredient ? props.ingredient.nutrition_facts.weightServing : null);
    const [flags, setFlags] = useState(!new_ingredient ? props.ingredient.flags: []);
    const [imageFile, setImage] = useState(null);
    const parentClose = props.closePopup;
    const closePopup = () => {
       parentClose()
    }
    const deleteIngredient = () =>{       
        fetch(`${localPath}deleteingredient/${encodeURIComponent(id)}`)
    }
    const saveIngredient = async() =>{
        const nutrition_facts = 
        {
            calories : calories,
            fats : fats,
            protein: protein,
            carbs : carbs,
            volumeServing : volume,
            weightServing : weight
        }
        const params = {
            id: encodeURIComponent(id),
            name : encodeURIComponent(name),
            nutrition : encodeURIComponent(JSON.stringify(nutrition_facts)),
            flags : encodeURIComponent(JSON.stringify(flags)),
        }
        const queryParams = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
        const response = await fetch(`${localPath}editingredient?${queryParams}`)
        response.json(); 
        if(imageFile !== null){
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('id', id)
            await axios.post(localPath+'uploadingrimage', formData)
        }
    }
    const newIngredient = async() => {
        
    const nutrition_facts = 
        {
            calories : calories,
            fats : fats,
            protein: protein,
            carbs : carbs,
            volumeServing : volume,
            weightServing : weight
        }
        const params = {
            name : encodeURIComponent(name),
            nutrition : encodeURIComponent(JSON.stringify(nutrition_facts)),
            flags : encodeURIComponent(JSON.stringify(flags)),
        }
        const queryParams = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    
        const response = await fetch(`${localPath}newingredient?${queryParams}`)
        const result = await response.json()
        id = result;
        if(imageFile !== null){
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('id', id)
            await axios.post(localPath+'uploadingrimage', formData)
        }
    }
    const handleOverlayClick = (event) => {
        // Check if the click event originated from the overlay element
        if (event.target.classList.contains('popup_overlay')) {
          closePopup();
          return;
        }

    };
    const handleCheckboxClick = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setFlags((flags) => [...flags, value]);
        } else {
            setFlags((flags) =>
                flags.filter((item) => item !== value)
            );
        }
    }
    const trySave = () => {
        if(name === null || calories === null || carbs === null || protein === null || (volume === null && weight === null)){
            return;
        }
        if(id === null){
            newIngredient()
            
            closePopup();
            return;
        }
        saveIngredient();
        closePopup()
        return;
        
    }
    return(
  
        <div className='popup_overlay' onClick={handleOverlayClick}>
            <div className='popup_content'>
                <div className= "ingredient_name_field">
                        <label> Name: </label>
                        <input type="text" value={name} onChange={e => changeName(e.target.value)} />
                </div>
                <div className='horizontal_container'>
                    <div className='horizontal_component'>
                        <label> Calories: </label>
                        <input type="number" value={calories} min = {0} onChange={e => changeCalories(e.target.value)} />
                    </div>
                    <div className='horizontal_component'>
                        <label> Fats: </label>
                        <input type="number" value={fats} min = {0} onChange={e => changeFats(e.target.value)} />
                    </div>
                    <div className='horizontal_component'>
                        <label> Carbs: </label>
                        <input type="number" value={carbs} min = {0} onChange={e => changeCarbs(e.target.value)} />
                    </div>
                    <div className='horizontal_component'>
                        <label> Protein: </label>
                        <input type="number" value={protein} min = {0} onChange={e => changeProtein(e.target.value)} />
                    </div>
                </div>
                <div className='horizontal_container'>
                    <div className='horizontal_component'>
                        <label> Serving Size: </label>
                        <input type="number" value={volume} min = {0} onChange={e => changeVol(e.target.value)} />
                        <label>Grams</label>
                    </div>
                    <div className='horizontal_component'>
                        <label> Serving Size: </label>
                        <input type="number" value={weight} min = {0} onChange={e => changeWeight(e.target.value)} />
                        <label> ML </label>
                    </div>
                </div>
                <div> 
                    {Info.flagArray().map((restriction) => (
                    <div key={restriction}>
                    <label>
                    {restriction}
                    </label>
                        <input
                        type="checkbox"
                        value={restriction}
                        checked={flags.includes(restriction)}
                        onChange={handleCheckboxClick}
                        ></input>
                        
                    </div>
                     ))}
                </div>
                <div className='upload_ingredient_image'>
                <UploadImage saveEvent = {setImage} image = { imagePath}/>
                </div>
                <div className='horizontal_container'>
                    <button onClick={() => {closePopup(); deleteIngredient()} }>Delete</button>
                    <button onClick={trySave}>Save</button>
                    <button onClick={closePopup}>Cancel</button>
                </div>
            </div>
            
        </div>

        
   
    )
}
//image = {(localPath) + (props.ingredient.imagePath)}
export default IngredientPopup