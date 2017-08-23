
var geoData =
    [
        {"University":"Anhui University of Science and Technology ","index":"1"},
        {"University":"Anhui University of Technology ","index":"1"},
        {"University":"Beihua University ","index":"1"},
        {"University":"Beijing Institute of Graphic Communication ","index":"1"},
        {"University":"Beijing Jiaotong University ","index":"1"},
        {"University":"Beijing Language and Cultural University ","index":"1"},
        {"University":"Central South Forestry University ","index":"1"},
        {"University":"Chang’an University ","index":"1"},
        {"University":"Chengdu University ","index":"1"},
        {"University":"Chengdu University of Information Technology ","index":"1"},
        {"University":"China Pharmaceutical University ","index":"1"},
        {"University":"Chongqing Normal University ","index":"1"},
        {"University":"Chongqing University ","index":"1"},
        {"University":"Chongqing University of Posts & Telecommunications ","index":"1"},
        {"University":"Communication University of China ","index":"1"},
        {"University":"Fujian University of Technology ","index":"1"},
        {"University":"GanSu Agricultural University ","index":"1"},
        {"University":"Guangdong University of Business Studies ","index":"1"},
        {"University":"Guangzhou University ","index":"1"},
        {"University":"Hainan University ","index":"1"},
        {"University":"Hebei Normal University of Science & Technology ","index":"1"},
        {"University":"Hefei University of Technology ","index":"1"},
        {"University":"Henan University ","index":"1"},
        {"University":"Henan University of Technology ","index":"1"},
        {"University":"Huadong Jiaotong University ","index":"1"},
        {"University":"Hubei University ","index":"1"},
        {"University":"Inner Mongolia University of Technology ","index":"1"},
        {"University":"Jiangsu University ","index":"1"},
        {"University":"Kunming University of Science and Technology ","index":"1"},
        {"University":"Lanzhou University ","index":"1"},
        {"University":"Lanzhou University of Finance & Economics ","index":"1"},
        {"University":"Lanzhou University of Technology ","index":"1"},
        {"University":"Liaoning Shihua University ","index":"1"},
        {"University":"Liaoning University ","index":"1"},
        {"University":"Nanjing Agricultural University ","index":"1"},
        {"University":"Nanjing Arts Institute ","index":"1"},
        {"University":"Nanjing Normal University ","index":"1"},
        {"University":"Nanjing University ","index":"1"},
        {"University":"Nanjing University of Information Science & Technology ","index":"1"},
        {"University":"Ningbo University of Technology ","index":"1"},
        {"University":"North China University of Water Resources and Electric Power ","index":"1"},
        {"University":"North University of China ","index":"1"},
        {"University":"North University of China ","index":"1"},
        {"University":"Qingdao University ","index":"1"},
        {"University":"Qinghai University ","index":"1"},
        {"University":"Shaanxi Normal University ","index":"1"},
        {"University":"Shandong University ","index":"1"},
        {"University":"Shandong University (Weihai) ","index":"1"},
        {"University":"Shanghai Normal University ","index":"1"},
        {"University":"Shanxi Normal University ","index":"1"},
        {"University":"Shaoguan University ","index":"1"},
        {"University":"Soochow University ","index":"1"},
        {"University":"Southwest Jiaotong University ","index":"1"},
        {"University":"Southwest Petroleum University ","index":"1"},
        {"University":"Tianjin University ","index":"1"},
        {"University":"Tianjin University of Science & Technology ","index":"1"},
        {"University":"University of Jinan ","index":"1"},
        {"University":"Wuhan University of Technology ","index":"1"},
        {"University":"Xi’an Institute of Posts & Telecommunications ","index":"1"},
        {"University":"Xi’an International Studies University ","index":"1"},
        {"University":"Xi’an Shiyou University ","index":"1"},
        {"University":"Xi’an University of Science & Technology ","index":"1"},
        {"University":"Xi'an Posts and Telecommunications University of China ","index":"1"},
        {"University":"Xi'an University of Science & Technology ","index":"1"},
        {"University":"Xihua University ","index":"1"},
        {"University":"Yangtze Normal University ","index":"1"},
        {"University":"Yangzhou University ","index":"1"},
        {"University":"Yunnan Normal University ","index":"1"},
        {"University":"Yunnan University ","index":"1"},
        {"University":"Yunnan University Of Nationalities ","index":"1"},
    ]
var resultset = {};




var request = require('request');
var async = require('async');

exports.handler = function(req, res) {
    async.parallel([
            /*
             * First external endpoint
             */
            function(callback) {
                var url = "http://external1.com/api/some_endpoint";
                request(url, function(err, response, body) {
                    // JSON body
                    if(err) { console.log(err); callback(true); return; }
                    obj = JSON.parse(body);
                    callback(false, obj);
                });
            },
            /*
             * Second external endpoint
             */
            function(callback) {
                var url = "http://external2.com/api/some_endpoint";
                request(url, function(err, response, body) {
                    // JSON body
                    if(err) { console.log(err); callback(true); return; }
                    obj = JSON.parse(body);
                    callback(false, obj);
                });
            },
        ],
        /*
         * Collate results
         */
        function(err, results) {
            if(err) { console.log(err); res.send(500,"Server Error"); return; }
            res.send({api1:results[0], api2:results[1]});
        }
    );
};



/*
function crawDescription(geoData) {

    var http = require('http');

    var request = require('request');


    for (var i = 0; i < geoData.length; i++) {


       // var httpRequest = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoData[i].University;
        console.log("===========================CRAW DESCRIPTION===================================");
        console.log(httpRequest);
        //httpsync.get([options | url])

        const options = {
            hostname: 'https://maps.googleapis.com',
           // port: 80,
            path: '/maps/api/geocode/',
            method: 'POST',
            headers: {
                'address': 'application/x-www-form-urlencoded',
            }
        };



        request(httpRequest  , function (error, response, body) {
            if (!error && response.statusCode == 200) {

                console.log(response);
                var result = JSON.parse(response.body).results[0];
                console.log(result);

                console.log("___________________add back to geoData Starts_______________");


                resultset[""]

                geoData[i].lat = result.geometry.location.lat;
                geoData[i].lng = result.geometry.location.lng;
                geoData[i].city = result.address_components[3].long_name;
                console.log(geoData);

                //parseDescription();

                //console.log($("td").text());
            }
        })

    }
        console.log(geoData);
}

crawDescription(geoData);*/
