const Mongoose = require('mongoose');
const User = require("./user");

const localPath = `http://localhost:3001`

fetch(localPath+`/createuser/${"sdfsdf"}/${"sdf"}/${"kjsdhakjshdakj"}/${"23df2"}`)
      .then(response => response.json())
      .then(data => {
        console.log("success")
      })
      .catch(error => {
        console.log("fail")
      });