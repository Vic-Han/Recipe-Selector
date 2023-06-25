const express = require('express');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const { checkUser, createUser, verifyUser, getPermission } = require('./user');


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
// Define a route for adding two numbers
app.get('/add/:num1/:num2', (req, res) => {
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  const sum = num1 + num2;
  res.json({ sum });
});
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
// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});