class Info {
    constructor() {
      this.userEmail = ""
      this.permission = 0
      this.observers = []
    }
  
    // Define your methods and properties
    // ...
  
    // Example method
    getEmail() {
      return this.userEmail;
    }
    setEmail(newEmail){
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
    addObserver(object)
    {
      this.observers.push(object);
    }
  }
  
  // Create a single instance of the Singleton class
  const instance = new Info();
  
  // Export the instance
  export default instance;