import React, {useState, useEffect} from 'react'
import '../CSS/Favourites.css'
import Info from './Info'
import RecipeView from './EditIngredient/RecipeView'
import RecipeIcon from './EditIngredient/RecipeIcon'
function Favourites(props){
    
    const [fav_list, updateFavList] = useState([])
    const [filter, setFilter] = useState("")
    useEffect(() => {
        const getFavorites = () => {
            Info.getFavorites().then(list => {
                updateFavList(list);
            });
        }
        getFavorites();
    }, []);
    const viewRecipeEvent = props.viewRecipeEvent;
    return(
        <div className="Favourites">
            <input className = 'filter_input' type = "text" value = {filter} onChange={e => {setFilter(e.target.value)}}/>
            <div className= 'favorite_recipe_list'>
            {fav_list.map((item,index) =>(
            item.name.toLowerCase().includes(filter.toLowerCase())?(
            <div>
                <RecipeIcon recipe={item} clickHandler ={() => viewRecipeEvent(item)}/>
            </div>):null
        ))}</div>
        </div>
    )
    
}
export default Favourites