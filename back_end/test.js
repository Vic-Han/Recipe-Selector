const { Ingredient } = require ("./ingredient");

Ingredient.findOne().exec()
.then(igr => {
  const localPath = 'http://localhost:3001';
  const id = igr._id;
  fetch(`${localPath}/deleteingredient/${encodeURIComponent(id)}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
})
.catch(error => {
  console.log(error);
});
