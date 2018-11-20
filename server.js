const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(path.resolve(__dirname, './build')));
app.get("/*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, './build/index.html'));
  res.send('Hello world');
});

app.listen(PORT);