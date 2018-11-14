let express = require('express');
path = require('path');
const app = express();

// getting port this way
port = process.env.PORT || process.argv[2] || 8080;

// // using app.use to use static files in my public
// // folder for the root level of the site
// app.use('/', express.static('src'));
app.get('/', (req, res) => res.send('Hello World'));
app.listen(port, function () {

  console.log('app up on port: ' + port);

});
