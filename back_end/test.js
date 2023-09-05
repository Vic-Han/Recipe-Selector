const {Recipe,computeNutrition} = require('./recipe')

//computeNutrition('64c6cf71969f5eed90a45150')
//Recipe.findOne({}).then(i => console.log(i))
const i = new   Recipe({name: "test"})
i.save()