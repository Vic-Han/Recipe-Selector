const mongoose = require("mongoose");
const {Ingredient,IngredientSchema,Nutrition,NutritionSchema} = require('./ingredient')
const IngrPairSchema = new mongoose.Schema({
    ingr: mongoose.SchemaTypes.ObjectId,
    name: String,
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
    imagePath : String
})

const IngrPair = mongoose.model("IngrPair", IngrPairSchema)
const Recipe = mongoose.model("Recipe" , RecipeSchema);
async function makeIngrPair(mongoID, amount)
{
    const i = await Ingredient.findById(mongoID)
    const name = i.name;
    const instance = await new IngrPair(
        {ingr:  new mongoose.Types.ObjectId(mongoID), 
        volume: null,
        weight: null,
        serving: null,
        name: name,
        nutrition: null,
    })
    if(amount.unit === "ml"){
        instance.volume = amount.number;
        return instance
    }
    else if(amount.unit = "g"){
        instance.weight = amount.number;
        return instance
    }
    else{
        instance.serving = amount.number
       return instance
    }
}
async function newRecipe(name, ingredients, instructions){
    const ingredient_list = []
    for(let index = 0; index < ingredients.length; index++)
    {
        const pair = await makeIngrPair(ingredients[index].id, ingredients[index].amount)
        ingredient_list[index] = pair
    }
    console.log(ingredient_list)
    const new_recipe = await new Recipe({name,ingredients: ingredient_list,instructions, imagePath: "images/recipes/default.png"});
    await new_recipe.save();
    console.log(new_recipe);
    return new_recipe;
}
async function deleteRecipe(mongoID){
    const recipe = await Recipe.findById(mongoID);
    await recipe.delete()
    return recipe;
}
async function getAllRecipes(){
    const recipes = await Recipe.find({})
    return recipes;
}
async function getNutritionForPair(ingredient_pair){
    const ingr_nutrition = new Nutrition ({weightServing : null, volumeServing : null,})
    const ingredient = await Ingredient.findById(ingredient_pair.ingr) 
    const nutrition = ingredient.nutrition_facts
    let servings = 0;
    if(ingredient_pair.volume !== null){
        servings = (ingredient_pair.volume / nutrition.volumeServing);
    }
    else if(ingredient_pair.weight !== null){
        servings = (ingredient_pair.weight / nutrition.weightServing);
    }
    else{
       servings =  ingredient_pair.serving
    }
    ingr_nutrition.carbs = servings * nutrition.carbs
    ingr_nutrition.fats = servings * nutrition.fats;
    ingr_nutrition.protein = servings * nutrition.protein;
    ingr_nutrition.calories = servings * nutrition.calories;
    return ingr_nutrition
}
async function computeNutrition(mongoID){
    const recipe = await Recipe.findById(mongoID)
    const recipe_nutrition = new Nutrition ({calories: null, fats : 0, protein : 0, carbs : 0, weightServing : null, volumeServing : null,})
    
    for (let index = 0; index < recipe.ingredients.length; index++ ){
        const name_assign = Ingredient.findById(recipe.ingredients[index].ingr).then(i => {
            recipe.ingredients[index].name = i.name;      
        })
        const ingr_calc = getNutritionForPair(recipe.ingredients[index]).then(nutr_ingr => {
            recipe.ingredients[index].nutrition = nutr_ingr;
           
            recipe_nutrition.calories += nutr_ingr.calories;
            recipe_nutrition.fats += nutr_ingr.fats;
            recipe_nutrition.carbs += nutr_ingr.carbs;
            recipe_nutrition.protein += nutr_ingr.protein;
            //console.log(recipe_nutrition)
        })
        await name_assign
        await ingr_calc;
    }

   recipe.nutrition_facts = recipe_nutrition;
   recipe.save();
    //console.log(recipe,recipe_nutrition)
}

module.exports = {
    Recipe,
    newRecipe,
    deleteRecipe,
    getAllRecipes,
    computeNutrition
}