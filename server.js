const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route to serve helloworld.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'helloworld.html'));
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});