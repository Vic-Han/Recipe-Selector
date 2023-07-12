const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: Number,
  email: String,
  perimission: Number,
  favorites: [mongoose.SchemaTypes.ObjectId],
  imagePath: String,
});

const User = mongoose.model("User", userSchema);
mongoose.connect('mongodb://127.0.0.1:27017/testdb');

async function createUser(firstName,lastName, hashedPassword, email) {
  const new_user = new User({ firstName,lastName, password: hashedPassword, email, perimission: 1, favorites: [],imagePath: "images/users/default.png" });
  try{
    await new_user.save(); 
    return new_user._id;
    }
  catch(error){
    return false;
  }
}

async function verifyUser(inputemail, hashedPassword) {
  const user = await User.exists({  email: inputemail , password: hashedPassword });
  return (user !== null);
}
async function checkUser(email) {
    const user = await User.exists({  email: email });
    return (user!== null);
}
// called when front end knows user exists
async function getPermission(email) {
    const user = await User.findOne({  email: email });
    return user.perimission;
}
async function getImage(email){
  const user = await User.findOne({  email: email });
  return user.imagePath;
}
module.exports = {
    User,
    checkUser,
    createUser,
    verifyUser,
    getPermission,
    getImage,
}