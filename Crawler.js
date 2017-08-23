const $ = require('jquery')(require("jsdom").jsdom().defaultView);
const fs = require("fs");
const http = require('http');
const request = require('request');


//const htmlParser = require("./HTMLParser.js");


var tmphuaqiaoMajorList = [["a2e9cc10-c807-4398-b18d-d5c56f6f2dea", "计算机科学与技术/Computer Science"]];
//Huaqiao    [ ["eade46c9-5110-4eb5-82dd-06e762338639", "中美联合培养班经管类/Experimental Class(Business Administration & Economics)"], ["66def414-fecc-4c90-b830-1c7b4e4097b3", "国际商务（全英文教学）/International Business(English-taught Program)"], ["e8eddfb9-17a8-4fd2-9302-31d2be943e8e", "中美联合培养班（国际经济与贸易）/International Economics and Trade(English-taught Program)"], ["cda63c86-4766-46c2-8ac2-7517e5e2ecb8", "工商管理类（旅游管理）/Tourism Management(English-taught Program)"], ["1c92536e-407a-4b00-9a01-7e1339abc14f", "工商管理类（会计学）/Accounting(English-taught Program)"], ["449e4564-01f3-4dc2-956d-a8f1a101b9d1", "经济学/Economics"], ["b3d1565f-8cf5-4323-a367-ccab9a4dd214", "市场营销/Marketing"], ["2a54e7aa-bc5c-4d5f-9224-d050516dc0c1", "中美联合培养班（计算机类软件工程）/Computer Science"]];
//Chongqing Normal [["a2e9cc10-c807-4398-b18d-d5c56f6f2dea", "计算机科学与技术/Computer Science"]]
//SuZhou WenZheng [["3f309023-42a3-425c-98bd-a77168127985", "Fiance and banking/Business Administration"]]


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


//==================================Start HTTP request===========================
/*
 *
 * Raw Request
 http://courses.cciee121.com/SelectSys/CourseListView?majorID=1c92536e-407a-4b00-9a01-7e1339abc14f&_=1486500942022
 http://courses.cciee121.com/SelectSys/CourseListView?majorID=1c92536e-407a-4b00-9a01-7e1339abc14f&_=1486500942022&pageNum=1&numPerPage=50&orderField=Academic&orderDirection=ASC&searchAcademic=&searchCourseCodeC=&searchCourseCodeA=&searchCourseNameC=&searchCourseNameA=

 */


var httpRequest = "http://courses.cciee121.com/SelectSys/CourseListView?majorID=" + huaqiaoMajorPairlist[0].id + "&numPerPage=50";


console.log("==================================Start HTTP request, Major: " + huaqiaoMajorPairlist[0].name + "===========================\n", httpRequest);


request(httpRequest, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body) // Show the HTML for the Google homepage.

        $("body").append('<head><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script></head>');
        $("body").append(body);

        console.log("__________________________________");
        //fs.open("test.txt", "w");
        console.log($("body").html());
        console.log("__________________________________");
        var body = $("body").html();

        fs.writeFile("/Users/yliu12/WebstormProjects/121DBCrawler/Testhtml.html", $("body").html(), function (e) {//会先清空原先的内容
            if (e) throw e;
        });


        //console.log($("td").text());
    }
})
