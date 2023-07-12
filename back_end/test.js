const express = require('express');
const app = express();
const path = require('path')
app.use(express.static(__dirname + '/public'))

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});