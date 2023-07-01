const mongoose = require("mongoose");
const [Ingredient,Nutrition] = require('./ingredient.js')
const IngrPairSchema = new mongoose.Schema({
    ingr: Ingredient,
    weight: Number,
    volume: Number,
    serving: Number
})
const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [IngrPairSchema],
    instructions: [String],
    nutrition_facts: Nutrition
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
async function newRecipe(name, ingredients, instructions){

}