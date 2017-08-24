const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');


var app = express();
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
  'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/selectschool.html');
  //res.render('selectschool.html');
});

app.get('/api/initbsu', (req, res) => {

  request('http://courses.cciee121.com/SelectSys/LianDongGetMajorList?datetime=2017/8/25%200:52:36&styleCorA=C&type=A&universityid=0ca53485-93b6-49a3-9824-327963bc2cc5',
    function(error, response, body) {

      if (error) {
        res.send(err);
      } else if (!error && response.statusCode == 200) {
        res.json(body);

      }
    });
});

// app.get('*', function(req, res) {
//        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//    });
app.listen(8881);
console.log("App listening on port 8881");
