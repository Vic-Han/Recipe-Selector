class Info {
      constructor() {
      this.userEmail = ""
      this.permission = 0
      this.favorites = []
      this.favorite_ids = []
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
      
      
        //fetch(`${localPath}test`).then(res => console.log("fetched"))
    }
    getUserInfo() {
      return(
        {
          email: this.userEmail,
          firstName: this.firstName,
          lastName: this.lastName,
          imagePath: this.imagePath
        }
      )
    }
    resetUser(){
      this.userEmail = ""
      this.setPermission(0)
      this.favorite_ids = []
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
      this.userEmail = user.email;
      this.setPermission(user.permission)
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.favorite_ids = user.favorites;
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
    addRecipe(recipe){
      this.recipeList.push(recipe)
    }
    removeRecipe(recipeID){
      for(let i = 0; i < this.recipeList.length; i++){
        if (this.recipeList[i]._id === recipeID ){
          this.recipeList.splice(i, 1);
          return;
        }
      }
    }
    async getAllRecipes() {
      if (this.recipeList.length === 0) { // Corrected condition
        const localPath = 'http://localhost:3001/';
        try {
          const response = await fetch(`${localPath}getallrecipes/`);
          const data = await response.json();
          this.recipeList = data;
          return this.recipeList;
        } catch (error) {
          console.log(error);
        }
      }
      return this.recipeList;
    }
    addFavorite(recipe){
      this.favorite_ids.push(recipe._id)
      this.favorites.push(recipe)
    }
    removeFavorite(recipeID){
      this.favorite_ids.splice(this.favorite_ids.indexOf(recipeID),1)
      for(let i = 0; i < this.favorites.length; i++){
        if (this.favorites[i]._id === recipeID ){
          this.favorites.splice(i, 1);
          return;
        }
      }
    }
    async getFavorites(){
      if(this.favorites.length === 0){
        const localPath = 'http://localhost:3001/';
        try {
          const response = await fetch(`${localPath}getfavorites/${encodeURIComponent(this.userID)}`);
          const data = await response.json();
          this.favorites = data;
          return this.favorites;
        } catch (error) {
          console.log(error);
        }
      }
      return this.favorites;
    }
    getFavoriteIDS(){
      return this.favorite_ids;
    }
    getUserID(){
      return this.userID
    }
  }
  
  // Create a single instance of the Singleton class
  const instance = new Info();
  
  // Export the instance
  export default instance;