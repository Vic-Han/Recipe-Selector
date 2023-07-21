const mongoose = require("mongoose");
const {Ingredient,IngredientSchema,Nutrition,NutritionSchema} = require('./ingredient')
const IngrPairSchema = new mongoose.Schema({
    ingr: IngredientSchema,
    weight: Number,
    volume: Number,
    serving: Number,
    nutrition: NutritionSchema,
})
const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [IngrPairSchema],
    instructions: [String],
    nutrition_facts: NutritionSchema,
    flags: [String],
    imagepath : String
})

const IngrPair = mongoose.model("IngrPair", IngrPairSchema)
const Recipe = mongoose.model("Recipe" , RecipeSchema);
async function makeIngrPair(mongoID, quantity)
{
    const i = await Ingredient.findById(mongoID)
    if(quantity.unit === "ml"){
        return new IngrPair({ingr: i, volume: quantity.number})
    }
    else if(quantity.unit = "g"){
        return new IngrPair({ingr: i, weight: quantity.number})
    }
    else{

       return new IngrPair({ingr: i, serving: quantity.number})
    }
}
async function newRecipe(name, ingredients, instructions, path){

    let ingredient_list = []
    ingredients.foreach(ingredient => {
        ingredient_list.push(makeIngrPair(ingredient.id, ingredient.quanity))
    })
    const new_recipe = new Recipe({name,ingredients: ingredient_list,instructions, imagepath: "images/recipes/default.png"});
    await new_recipe.save();
}
async function deleteRecipe(mongoID){
    const recipe = await Recipe.findById(mongoID)
    const path = recipe.picture_path;
    await recipe.delete()
    return path;
}
async function computeNutrition(mongoID){
    
}
module.exports = {
    Recipe,
    newRecipe,
    deleteRecipe,
}