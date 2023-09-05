class Info {
      constructor() {
      this.userEmail = ""
      this.permission = 0
      this.favorites = []
      this.observers = []
      this.firstName = ""
      this.lastName = ""
      this.imagePath = ""
      this.userID = null;
      this.dietary_flags = ["vegan","gluten-free","dairy-free","peanut-free","vegetarian","halal"]
      this.ingredientList = []
      this.recipeList = []
      const localPath = 'http://localhost:3001/';
      fetch(`${localPath}getallingredients/`)
        .then(response => response.json())
        .then(data => {     
          this.ingredientList = data
        })
        .catch(error => {
          console.log(error);
        });
      
      fetch(`${localPath}getallrecipes/`)
        .then(response => response.json())
        .then(data => {     
          this.recipeList = data
        })
        .catch(error => {
          console.log(error);
        });
        //fetch(`${localPath}test`).then(res => console.log("fetched"))
    }
    resetUser(){
      this.userEmail = ""
      this.permission = 0
      this.favorites = []
      this.observers = []
      this.firstName = ""
      this.lastName = ""
      this.imagePath = ""
      this.userID = null
    }
    getEmail() {
      return this.userEmail;
    }
    setUser(user){
      if(user.email === ""){
        this.resetUser()
        return;
      }
      console.log(user, user.favorites)
      this.userEmail = user.email;
      this.setPermission(user.permission)
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.favourites = user.favorites;
      this.imagePath = user.imagePath;
      this.userID = user._id;
    }
    getImagePath(){
      return this.imagePath;
    }
    getPermission()
    {
      return this.permission;
    }
    setPermission(newPermission)
    {
      this.permission = newPermission;
      this.observers.forEach(observer => {observer()})
    }
    addObserver(func)
    {
      this.observers.push(func);
    }
    flagMap(){
      let map = {};
      this.dietary_flags.forEach(item => {map[item] = false})
      return map;
    }
    flagArray(){
      return this.dietary_flags
    }
    getAllIngredients() {
      return this.ingredientList;
    }
    addIngredient(ingr){
      this.ingredientList.push(ingr)
    }
    removeIngredient(mongoID){
      for(let i = 0; i < this.ingredientList.length; i++){
        if (this.ingredientList[i]._id === mongoID ){
          this.ingredientList.splice(i, 1);
          return;
        }
      }
    }
    getAllRecipes(){
      return this.recipeList;
    }
    getFavourites(){
      return this.favorites;
    }
    getUserID(){
      return this.userID
    }
  }
  
  // Create a single instance of the Singleton class
  const instance = new Info();
  
  // Export the instance
  export default instance;