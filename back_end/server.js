const express = require('express');
const cors = require("cors");
const app = express();
const fs = require("fs")
const path = require("path")
app.use(express.json());
app.use(cors());

const multer = require('multer');
const { User, checkUser, createUser, verifyUser, getPermission,getImage,updateFav } = require('./user');
const { getAllIngredients, newIngredient,editIngredient, deleteIngredient, Ingredient} = require('./ingredient');
const {Recipe, getAllRecipes,} = require('./recipe')
app.use(express.static(__dirname + '/public'))
// Multer configuration
let userImageName = null;
let ingrImageName = null;
let recipeImageName = null;
const userstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directoryPath = 'public/images/users'
    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    const unique_name = Date.now().toString() + path.extname(file.originalname);
    userImageName = unique_name;
    cb(null, unique_name);
  },
});

const uploaduserimage = multer({ storage: userstorage });

// Route for handling file upload
app.post('/uploaduserimage', uploaduserimage.single('image'), (req, res) => {
    User.findById(req.body.id).then(user => {
      if (user) {
        if(user.imagePath !== "images/users/default.png"){
          fs.unlink(user.imagePath);
        }
        user.imagePath = `images/users/${userImageName}`;
        user.save();
      }
    });
  res.json({ message: 'File uploaded successfully' });
});

const ingrstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directoryPath = 'public/images/ingredients'
    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    const unique_name = Date.now().toString() + path.extname(file.originalname);
    ingrImageName = unique_name;
    cb(null, unique_name);
  },
});

const uploadingrimage = multer({ storage: ingrstorage });

// Route for handling file upload
app.post('/uploadingrimage', uploadingrimage.single('image'), (req, res) => {
    Ingredient.findById(req.body.id).then(ingr => {
      if (ingr) {
        if(ingr.imagePath !== "images/ingredients/default.png"){
          fs.unlink(ingr.imagePath);
        }
        ingr.imagePath = `images/ingredients/${ingrImageName}`;
        ingr.save();
      }
    });
  res.json({ message: 'File uploaded successfully' });
});

const recipestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directoryPath = 'public/images/recipes'
    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    const unique_name = Date.now().toString() + path.extname(file.originalname);
    recipeImageName = unique_name;
    cb(null, unique_name);
  },
});

const uploadrecipeimage = multer({ storage: recipestorage });

// Route for handling file upload
app.post('/uploadrecipeimage', uploadrecipeimage.single('image'), (req, res) => {
    Recipe.findById(req.body.id).then(recipe => {
      if (recipe) {
        
        recipe.imagePath = `images/recipes/${recipeImageName}`;
        recipe.save();
      }
    });
  res.json({ message: 'File uploaded successfully' });
});

const crypto = require('crypto');
const { newRecipe,computeNutrition } = require('./recipe');

function hashStringToInt(string) {
  // Create a hash object
  const hash = crypto.createHash('sha256');

  // Update the hash object with the input string
  hash.update(string);

  // Get the hash digest as a hexadecimal string
  const hashHex = hash.digest('hex');

  // Convert the hexadecimal string to an integer
  const hashInt = parseInt(hashHex, 16);

  return hashInt;
}
app.get('/test/', (req, res) => {
  computeNutrition('64c6cf71969f5eed90a45150')
    
  res.json( "result" );
  
});
app.get('/createuser/:email/:password/:firstName/:lastName', (req,res) =>{
    const hashedPassword = hashStringToInt(req.params.password.trim());
    createUser(req.params.firstName.trim(),req.params.lastName.trim(), hashedPassword, req.params.email.trim()).then(result => {
    res.json(result); // objectID
  })
  .catch(error => {
    res.json(error);
  });
});
app.get('/userexists/:email/', (req,res) => {
    checkUser(req.params.email).then(result => {
        res.json(result);
    }).catch(error => {
        res.json({error});
      });
})
app.get('/logincorrect/:email/:password/', (req,res) =>{
    const hashedPassword = hashStringToInt(req.params.password);
    verifyUser(req.params.email, hashedPassword).then(result => {
        res.json({result});
    }).catch(error => {
        res.json({error});
      });
});
app.get('/getpermission/:email',(req,res) => {
    getPermission(req.params.email).then( result =>
       { 
        res.json({result});
      }
    ).catch(error => {
        res.json({error});
    })
})
app.get('/getimagepath/:email',(req,res) => {
  getImage(req.params.email).then(result => {
    res.json(result);
  }).catch(error => {
    res.json(error)
  })
})
app.get('/getallingredients/', (req, res) => {
  getAllIngredients()
    .then((result) => {
      res.json( result );
    })
    .catch((error) => {
      res.json({ error });
    });
});

app.get('/newingredient' , (req, res) => {
  newIngredient(req.query.name, JSON.parse(req.query.nutrition), JSON.parse(req.query.flags))
  .then(result => {
    res.json(result)
  }).catch(error =>{res.json(error)})
})
app.get('/editingredient',(req,res) =>{
  editIngredient(req.query.id, req.query.name, JSON.parse(req.query.nutrition), JSON.parse(req.query.flags))
})
app.get('/deleteingredient/:mongoID', (req,res) =>{
  
  deleteIngredient(req.params.mongoID)
})

app.get('/newrecipe',(req,res) => {

  newRecipe(req.query.name, JSON.parse(req.query.ingredients), JSON.parse(req.query.instructions))
  .then(result => {
    res.json(result)
  }).catch(error =>{res.json(error)})
})
app.get('/getallrecipes',(req,res) => {

  getAllRecipes()
  .then(result => {
    res.json(result)
  }).catch(error =>{res.json(error)})
})
app.get('/updatefavorite/userID/recipeID',(req,res) =>{
  updateFav(req.params.userID,req.params.recipeID).then(result => {res.json(true)})
})
// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});