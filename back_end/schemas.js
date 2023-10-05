const mongoose = require('mongoose')

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
    flags : [String],
    imagePath: String,

});
const Nutrition = mongoose.model("Nutrition", NutritionSchema);

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: Number,
    email: String,
    permission: Number,
    favorites: [mongoose.SchemaTypes.ObjectId],
    imagePath: String,
  });
  
const User = mongoose.model("User", UserSchema);

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
    imagePath : String,
    authorName: String,
    authorID: mongoose.SchemaTypes.ObjectId,
    numberFavorites: Number,
})

const IngrPair = mongoose.model("IngrPair", IngrPairSchema)
const Recipe = mongoose.model("Recipe" , RecipeSchema);
module.exports = {
    User,
    UserSchema,
    NutritionSchema,
    Nutrition,
    IngredientSchema,
    Ingredient,
    RecipeSchema,
    Recipe,
    IngrPair,
    IngrPairSchema,
}