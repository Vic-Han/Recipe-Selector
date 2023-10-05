const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/testdb');
const {Recipe, UserSchema, User} = require('./schemas.js')
async function createUser(firstName,lastName, hashedPassword, email) {
  const new_user = new User({ firstName,lastName, password: hashedPassword, email, permission: 1, favorites: [],imagePath: "images/users/default.png" });
  try{
    await new_user.save(); 
    return new_user._id;
    }
  catch(error){
    return false;
  }
}

async function verifyUser(inputemail, hashedPassword) {
  const user = await User.findOne({  email: inputemail , password: hashedPassword });
  return (user !== null) ? user : false; 
}
async function checkUser(email) {
    const user = await User.exists({  email: email });
    return (user!== null);
}
// called when front end knows user exists
async function getPermission(email) {
    const user = await User.findOne({  email: email });
    return user.permission;
}
async function getImage(email){
  const user = await User.findOne({  email: email });
  return user.imagePath;
}
async function updateFav(userID, recipeID){
  const user = await User.findById(userID)
  const recipe = await Recipe.findById(recipeID)
  if(user.favorites.includes(recipeID)){
    //const newFav = user.favorites.filter(item => item !== recipeID)
    //user.favorites = newFav;
    

    user.favorites.splice(user.favorites.indexOf(recipeID),1)
    recipe.numberFavorites = recipe.numberFavorites - 1;
  }
  else{
    recipe.numberFavorites = recipe.numberFavorites + 1;
    user.favorites.push(recipeID)
  }
  await recipe.save();
  await user.save();
}
async function getFavorites(userID){
  const user = await User.findById(userID)
  let recipes = [];
  let promises = [];
  user.favorites.forEach(favorite => {
    promises.push(Recipe.findById(favorite).then(recipe => {
      recipes.push(recipe)
    }))
  })
  await Promise.all(promises);
  return recipes;
}
module.exports = {
    User,
    checkUser,
    createUser,
    verifyUser,
    getPermission,
    getImage,
    updateFav,
    getFavorites,
}