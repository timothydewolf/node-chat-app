const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;
var app = express();

console.log(__dirname+'/../public');
console.log(publicPath);

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server @ port ${port}`);
});

