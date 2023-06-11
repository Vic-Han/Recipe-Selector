const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: Number,
  email: String,
  perimision: Number,
  favorites: [mongoose.SchemaTypes.ObjectId]
});

const User = mongoose.model("User", userSchema);
mongoose.connect('mongodb://127.0.0.1:27017/testdb');

async function createUser(firstName,lastName, hashedPassword, email) {
  const new_user = new User({ firstName,lastName, password: hashedPassword, email, perimision: 1, favorites: [] });
  try{
    
    await new_user.save(); 
    console.log("database success");
    return true
    }
  catch(error){
    console.log("database fail")
    return false;
  }
}

async function verifyUser(email, hashedPassword) {
  const user = await User.exists({  email: email , password: hashedPassword });
  return user;
}
async function checkUser(email) {
    const user = await User.exists({  email: email });
    return user;
  }
module.exports = {
    checkUser,
    createUser,
    verifyUser
}