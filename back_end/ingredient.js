const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
    calories: Number
})
const IngredientSchema = new mongoose.Schema({

    name: String,
    nutrition_facts : NutritionSchema,


});

module.exports = mongoose.model("Ingredient", IngredientSchema);