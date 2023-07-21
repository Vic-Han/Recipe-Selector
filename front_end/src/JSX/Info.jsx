class Info {
    constructor() {
      this.userEmail = ""
      this.permission = 0
      this.observers = []
      this.dietary_flags = ["vegan","gluten-free","dairy-free","peanut-free","vegetarian","halal"]
      this.userID = null;
      this.ingredientList = []


      this.getAllIngredients()
    }
  
    getEmail() {
      return this.userEmail;
    }
    setEmail(newEmail){
      if(newEmail === ""){
        this.userEmail = "";
        this.setPermission(0)
        return;
      }
      this.userEmail = newEmail;
      const localPath = 'http://localhost:3001';
      fetch(`${localPath}/getpermission/${encodeURIComponent(newEmail)}`)
      .then(response => response.json())
      .then(data => {
        this.setPermission(data.result);
          

        } 
      )
      .catch(error => {
        console.log(error);
      });
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
      const localPath = 'http://localhost:3001/';
      fetch(`${localPath}getallingredients/`)
        .then(response => response.json())
        .then(data => {     
          this.ingredientList = data.result
        })
        .catch(error => {
          console.log(error);
        });
    }
    addIngredient(ingr){
      this.ingredientList.push(ingr)
    }
    removeIngredient(mongoID){
      for(let i = 0; i < this.ingredientList.size(); i++){
        if (this.ingredientList[i]._id === mongoID ){
          this.ingredientList.splice(i, 1);
          return;
        }
      }
    }
  }
  
  // Create a single instance of the Singleton class
  const instance = new Info();
  
  // Export the instance
  export default instance;