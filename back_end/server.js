const express = require('express');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const { checkUser, createUser, verifyUser, getPermission } = require('./user');
const { getAllIngredients, newIngredient, deleteIngredient} = require('./ingredient');

const crypto = require('crypto');

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
        console.log("Server success");
    res.json({result}); // true or false
  })
  .catch(error => {
    console.log("Server failed");
    res.json({error});
  });
});
app.get('/userexists/:email/', (req,res) => {
    checkUser(req.params.email).then(result => {
        res.json({result});
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
        //console.log(req.params.email)
        //console.log(result)
        res.json({result});
      }
    ).catch(error => {
        res.json({error});
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
  console.log("yay")
  newIngredient(req.query.name, JSON.parse(req.query.nutrition), JSON.parse(req.query.flags))
})
app.get('deleteingredient/:mongoID/', (req,res) => {
  console.log("Hi")
  deleteIngredient(req.mongoID)
})
// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});