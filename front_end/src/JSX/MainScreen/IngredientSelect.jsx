import React, { useState } from "react";
import '../../CSS/IngredientSelect.css'
import Info from '../Info'
function IngredientSelect(props){
    const ingredientList = Info.getAllIngredients()
    const editIngredients = props.editIngredients
    const [targetIngr, changeTarget] = useState(props.targetIngredientList === [] ? [] : [...props.targetIngredientList])
    const [avoidIngr, changeAvoid] = useState(props.avoidedIngredientList === [] ? [] : [...props.avoidedIngredientList])
    const [addTargetIngr, changeTargetIngr] = useState(false)
    const [addAvoidIngr, changeAvoidIngr] = useState(false)
    const [targetPrefix, setTargetPrefix] = useState("")
    const [avoidPrefix, setAvoidPrefix] = useState("")
    const [availibleIngredients, setAvailibleIngredients] = useState(ingredientList.filter( ingr =>(
        (!targetIngr.includes(ingr) && !avoidIngr.includes(ingr))
    )))
    /*const doubleToggleCheck = (e) =>{
        targetToggle(e)
        avoidToggle(e)
    }*/
    const doubleToggleCheck = () => {
        if (addTargetIngr || addAvoidIngr) {
            changeTargetIngr(false);
            changeAvoidIngr(false);
        }
    };
    const targetToggle = (e) => {
       
        changeTargetIngr(true)
    }
    const avoidToggle = (e) => {
       
        changeAvoidIngr(true)
       
    }
    const addTarget = (ingr) => {
        editIngredients(ingr,'+','')
    }
    const removeTarget = (ingr) => {

    }
    const addAvoid = (ingr) => {

    }
    const removeAvoid = (ingr) => {
        
    }
        return(
            <div onBlur = {doubleToggleCheck} className="ingredient_select">
                <h2>Must Include: </h2>
                <div>
                    {targetIngr.map(ingr =>(
                        <div>
                            {ingr.name}
                        </div>
                    ))}
                </div>
                {addTargetIngr ? <div>
                    <input type= "text" value ={targetPrefix} onChange={e => setTargetPrefix(e.target.value)}/>
                </div> :
                <button className="add_target_button" onClick={targetToggle}> + </button>}
                
                <h2> Must avoid: </h2>
                {addAvoidIngr ? null :<button className="add_avoid_button" onClick={avoidToggle}> + </button>}
            </div>
        );
}
export default IngredientSelect