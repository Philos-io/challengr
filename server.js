var express = require('express'), app = express();

var path = require('path');

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'www')));

app.listen(port, function(){
  console.log('app is running on port: '+ port);
})
