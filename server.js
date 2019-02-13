// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
process.env.PORT = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  next();
});




// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp/:date_string([a-zA-z0-9-]{0,})", (req, res)=>{

  var date = req.params.date_string;
  
  if(date == ""){
    date = new Date();
    var response = { "unix": date.getTime() , "utc" : date.toUTCString() };
    res.send(JSON.stringify(response, undefined, 2));
  }else{
    if(Date.parse(date)){
      date = new Date(date);
      var response = { "unix": date.getTime(), "utc": date.toUTCString() };
      res.send(JSON.stringify(response, undefined, 2));
    }
    var errorString = { "error": "Invalid Date" };
    res.send(JSON.stringify(errorString, undefined, 2));

  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

