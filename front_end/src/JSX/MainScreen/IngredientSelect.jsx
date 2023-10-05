import React, { useEffect, useState } from "react";
import '../../CSS/IngredientSelect.css'
import Info from '../Info'
import IngredientIcon from "../EditIngredient/IngredientIcon";
function IngredientSelect(props){
    const ingredientList = Info.getAllIngredients()
    const editIngredients = props.editIngredients
    const [targetIngr, changeTarget] = useState([...props.targetIngredientList])
    const [avoidIngr, changeAvoid] = useState([...props.avoidedIngredientList])
    const [targetPrefix, setTargetPrefix] = useState("")
    const [avoidPrefix, setAvoidPrefix] = useState("")
    const [availibleIngredients, setAvailibleIngredients] = useState(ingredientList.filter( ingr =>(
        (!targetIngr.includes(ingr) && !avoidIngr.includes(ingr))
    )))
    const clickHandler = e => {
        const avoidDiv = document.getElementById("avoid_list") 
        if(avoidDiv != null && !avoidDiv.contains(e.target)){
            setAvoidPrefix('')
        }
        const targetDiv = document.getElementById("target_list") 
        if(targetDiv != null && !targetDiv.contains(e.target)){
            setTargetPrefix('')
        }
    }
    useEffect(()=>{
        document.addEventListener('click',clickHandler)
        return() =>{
            document.removeEventListener('click', clickHandler)
        }
    },[])

    const addTarget = (ingr) => {
        const newAvailibleIngredients = availibleIngredients.filter(item => ingr !== item)
        setAvailibleIngredients(newAvailibleIngredients);
        const newTargetList = [...targetIngr, ingr]
        changeTarget(newTargetList)
        setTargetPrefix('')
        editIngredients('+',ingr,'target')

    }
    const removeTarget = (ingr) => {
        const newTargetList = targetIngr.filter(item => ingr !== item)
        changeTarget(newTargetList);
        const newAvailibleIngredients = [...availibleIngredients, ingr]
        setAvailibleIngredients(newAvailibleIngredients)
        editIngredients('-',ingr,'target')
    }
    const addAvoid = (ingr) => {
        const newAvailibleIngredients = availibleIngredients.filter(item => ingr !== item)
        setAvailibleIngredients(newAvailibleIngredients);
        const newAvoidList = [...avoidIngr, ingr]
        changeAvoid(newAvoidList)
        setAvoidPrefix('')
        editIngredients('+',ingr,'avoid')
    }
    const removeAvoid = (ingr) => {
        const newAvoidList = avoidIngr.filter(item => ingr !== item)
        changeAvoid(newAvoidList);
        const newAvailibleIngredients = [...availibleIngredients, ingr]
        setAvailibleIngredients(newAvailibleIngredients)
        editIngredients('-',ingr,'avoid')
    }
        return(
            <div className="ingredient_select">
                <div className= "ingredient_select_list" id = "target_list">
                    <h2> Must Include: </h2>
                    <input type = "text" value = {targetPrefix} onChange={e => {setTargetPrefix(e.target.value)}}/>
                    <div className="ingredient_select_options">
                    {   targetPrefix.length > 0 ? (availibleIngredients.map((ingr,index) => ( ingr.name.toLowerCase().includes(targetPrefix.toLowerCase())?
                        <div key = {"target_option" + index}>
                            <IngredientIcon clickHandler = {()=>{addTarget(ingr)}} ingredient = {ingr}/>
                        </div>: null
                    ))) : null

                    }</div>
                    <div>
                        {targetIngr.map((ingr,index) =>(
                            <div key = {"Target" + index}>
                                {ingr.name} <span className = "remove_button" onClick={()=>{removeTarget(ingr)}}> - </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className= "ingredient_select_list" id = "avoid_list">
                    <h2> Must Avoid: </h2>
                    <input type = "text" value = {avoidPrefix} onChange={e => {setAvoidPrefix(e.target.value)}}/>
                    <div className="ingredient_select_options">
                    {   avoidPrefix.length > 0 ? (availibleIngredients.map((ingr,index) => ( ingr.name.toLowerCase().includes(avoidPrefix.toLowerCase())?
                        <div key = {"avoid_option" + index}>
                            <IngredientIcon clickHandler = {()=>{addAvoid(ingr)}} ingredient = {ingr}/>
                        </div>: null
                    ))) : null

                    }</div>
                    <div>
                        {avoidIngr.map((ingr,index) =>(
                            <div key = {"Target" + index}>
                                {ingr.name} <span className = "remove_button" onClick={() => {removeAvoid(ingr)}}> - </span>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        );
}
export default IngredientSelect