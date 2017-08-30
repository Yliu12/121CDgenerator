var $ = require('jquery')(require("jsdom").jsdom().defaultView);
const fs = require("fs");
const http = require('http');
const request = require('request');


const htmlParser = require("./HTMLParser.js");


// var tmphuaqiaoMajorList = [
//   ["a2e9cc10-c807-4398-b18d-d5c56f6f2dea", "计算机科学与技术/Computer Science"]
// ];

/*

var huaqiaoMajorIDlist = [];
var huaqiaoMajorPairlist = [];

tmphuaqiaoMajorList.forEach(function (element) {
    if (element[0] != "") {

        var major = {
            name: element[1],
            id: element[0]
        };
        huaqiaoMajorIDlist.push(major.id);
        huaqiaoMajorPairlist.push(major)

    }
});
console.log(huaqiaoMajorIDlist);
*/


//==================================Start HTTP request===========================
/*
 *
 * Raw Request
 http://courses.cciee121.com/SelectSys/CourseListView?majorID=1c92536e-407a-4b00-9a01-7e1339abc14f&_=1486500942022
 http://courses.cciee121.com/SelectSys/CourseListView?majorID=1c92536e-407a-4b00-9a01-7e1339abc14f&_=1486500942022&pageNum=1&numPerPage=50&orderField=Academic&orderDirection=ASC&searchAcademic=&searchCourseCodeC=&searchCourseCodeA=&searchCourseNameC=&searchCourseNameA=

 */
var getCourseInfoandCDlink = (majorId, callback) => {

    var result;
    var httpRequest = "http://courses.cciee121.com/SelectSys/CourseListView?majorID=" + majorId + "&cora=C&numPerPage=50";


    console.log("==================================Start HTTP request, Major: " + majorId + "===========================\n", httpRequest);

    request(httpRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            $("body").empty()
            $("body").append('<head><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script></head>');
            $("body").append(body);

            console.log("________________MajorCourseBody__________________");
            var body = $("body").html();

            console.log(body);

            getFullCourseInfo(body, callback);

            console.log("_________________MajorCourseBody_________________");


        }
    })

};

module.exports = {
    getCourseInfoandCDlink
};
