class Info {
    constructor() {
      this.userEmail = ""
      this.permission = 0
      this.observers = []
      this.dietary_flags = ["vegan"]
    }
  
    getEmail() {
      return this.userEmail;
    }
    setEmail(newEmail){
      if(newEmail === ""){
        this.userEmail = "";
        return;
      }
      this.userEmail = newEmail;
      const localPath = 'http://localhost:3001';
      fetch(`${localPath}/getpermission/${encodeURIComponent(this.userEmail)}`)
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
  }
  
  // Create a single instance of the Singleton class
  const instance = new Info();
  
  // Export the instance
  export default instance;