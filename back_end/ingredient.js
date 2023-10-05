const mongoose = require("mongoose");
const {IngredientSchema, Ingredient, NutritionSchema, Nutrition} = require('./schemas.js')
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
    const ingredient = await  new Ingredient ({name, nutrition_facts : nutrition, flags, imagePath: "images/ingredients/default.png"})
    try{
        await ingredient.save(); 
        return ingredient;
        }
      catch(error){
        return false;
      }
}
async function editIngredient(id,name,input_nutrition,flags){
    const ingr = await Ingredient.findById(id);
    ingr.name = name;
    ingr.nutrition_facts.calories = input_nutrition.calories;
    ingr.nutrition_facts.fats = input_nutrition.fats;
    ingr.nutrition_facts.protein = input_nutrition.protein;
    ingr.nutrition_facts.carbs = input_nutrition.carbs;
    ingr.nutrition_facts.weightServing = input_nutrition.weightServing;
    ingr.nutrition_facts.volumeServing = input_nutrition.volumeServing;
    ingr.flags = flags;
    await ingr.save()
}
async function deleteIngredient(mongoID){
    await Ingredient.findByIdAndRemove(mongoID)
}
module.exports = {
    Nutrition,
    Ingredient,
    IngredientSchema,
    NutritionSchema,
    editIngredient,
    getAllIngredients,
    newIngredient,
    deleteIngredient
}
