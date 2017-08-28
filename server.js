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

app.get('/api/majorunderchinaU', (req, res) => {

  console.log('get Major List of CUid: ' + JSON.stringify(req.query.cuid));
  request('http://courses.cciee121.com/SelectSys/LianDongGetMajorList?datetime=2017/8/25%2022:47:18&styleCorA=C&type=C&universityid=' + req.query.cuid,
    function(error, response, body) {

      if (error) {
        res.send(err);
      } else if (!error && response.statusCode == 200) {
        //init response
        var respJson = {
          keyValPair: [],
          dict: {}
        }
        var parsed = JSON.parse(body);
        //format response
        for (var i = 1; i < parsed.length; i++) {
          var mId = parsed[i][0];
          var mName = parsed[i][1];
          respJson.keyValPair.push({
            key: mId,
            value: mName
          })
          respJson.dict[mName] = mId;
        }

        //set response
        res.json(respJson);
      }
    });
});


app.listen(8080);
console.log("App listening on port 8080");
