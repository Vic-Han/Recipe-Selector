const express = require('express');
const cors = require("cors");
const app = express();

const path = require("path")
app.use(express.json());
app.use(cors());

const multer = require('multer');
const { User, checkUser, createUser, verifyUser, getPermission,getImage } = require('./user');
const { getAllIngredients, newIngredient, deleteIngredient, Ingredient} = require('./ingredient');
const {Recipe,} = require('./recipe')
app.use(express.static(__dirname + '/public'))
// Multer configuration
let userImageName = null;
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
        user.imagePath = `images/users/${userImageName}`;
        user.save();
      }
    });
  res.json({ message: 'File uploaded successfully' });
});



const crypto = require('crypto');
const { newRecipe } = require('./recipe');

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

app.get('/createuser/:email/:password/:firstName/:lastName', (req,res) =>{
    const hashedPassword = hashStringToInt(req.params.password);
    createUser(req.params.firstName,req.params.lastName, hashedPassword, req.params.email).then(result => {
    res.json(result); // true or false
  })
  .catch(error => {
    res.json({error});
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
      res.json({ result });
    })
    .catch((error) => {
      res.json({ error });
    });
});

app.get('/newingredient' , (req, res) => {
  newIngredient(req.query.name, JSON.parse(req.query.nutrition), JSON.parse(req.query.flags))
})

app.get('/deleteingredient/:mongoID', (req,res) =>{
  
  deleteIngredient(req.params.mongoID)
})

app.get('/newrecipe',(req,res) => {
  newRecipe(req.query.name, JSON.parse(req.query.ingredients), JSON.parse(req.query.instructions))
})
// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});