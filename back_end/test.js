const {Ingredient,getAllIngredients} = require('./ingredient')

getAllIngredients().then(ingr => console.log(ingr))

//Ingredient.findById('64b4b21f0e8559739a0c7980').then(ingr => {console.log(ingr)})