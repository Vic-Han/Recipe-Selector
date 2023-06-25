const mongoose = require("mongoose");

const NutritionSchema = new mongoose.Schema({
    calories: Number,
    fats : Number,
    protein : Number,
    carbs : Number
})
const IngredientSchema = new mongoose.Schema({

    name : String,
    nutrition_facts : NutritionSchema,
    flags : [String]

});
const Nutrition = mongoose.model("Nutrition", NutritionSchema);
const Ingredient = mongoose.model("Ingredient", IngredientSchema);

async function getAll()
{
    Ingredient.find({}).then( Ingredients => {
        return Ingredients;
    })
}
async function new_Ingredient(name, nutrition, flags){
    const nutrition = await new Nutrition({
        calories: nutrition.calories, 
        fats: nutrition.fats,
        protein: nutriton.protein,
        carbs: nutrition.carbs
    });
    const ingredient = await  new Ingredient ({name, nutrition_facts : nutrition, flags})
    try{
    
        await ingredient.save(); 
        console.log("database success");
        return true
        }
      catch(error){
        console.log("database fail")
        return false;
      }
}
async function delete_Ingredient(){

}
module.exports = {
    getAll,
    new_Ingredient,
}