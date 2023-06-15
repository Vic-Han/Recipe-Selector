const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
    calories: Number
})
const IngredientSchema = new mongoose.Schema({

    name : String,
    nutrition_facts : NutritionSchema,
    flags : [String]

});
const Nutrition
const Ingredient = mongoose.model("Ingredient", IngredientSchema);

async function getAll()
{
    Ingredient.find({}).then( Ingredients => {
        return Ingredients;
    })
}