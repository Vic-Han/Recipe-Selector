const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
    calories: Number,
    fats : Number,
    protein : Number,
    carbs : Number,
    weightServing : Number,
    volumeServing : Number,
})
const IngredientSchema = new mongoose.Schema({

    name : String,
    nutrition_facts : NutritionSchema,
    flags : [String]

});
const Nutrition = mongoose.model("Nutrition", NutritionSchema);
const Ingredient = mongoose.model("Ingredient", IngredientSchema);

async function getAllIngredients()
{
    const Ingredients = await Ingredient.find({})
    return Ingredients;
}
async function newIngredient(name, input_nutrition, flags){
    const nutrition = await new Nutrition({
        calories: input_nutrition.calories, 
        fats: input_nutrition.fats,
        protein: input_nutrition.protein,
        carbs: input_nutrition.carbs,
        weightServing : input_nutrition.weightServing,
        volumeServing : input_nutrition.volumeServing,
    });
    const ingredient = await  new Ingredient ({name, nutrition_facts : nutrition, flags})
    try{
        await ingredient.save(); 
        return true
        }
      catch(error){
        return false;
      }
}
async function deleteIngredient(mongoID){
    await Ingredient.findByIdAndRemove(mongoID)
}
module.exports = {
    Nutrition,
    Ingredient,
    getAllIngredients,
    newIngredient,
    deleteIngredient
}