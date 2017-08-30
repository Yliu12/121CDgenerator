// this require version jsdom": "^3.1.2",
const $ = require('jquery')(require("jsdom").jsdom().defaultView);
const fs = require('fs');
const URL = require('url');
const http = require('http');
const request = require('request');

var myDataTable = {};
var descriptionURLList = [];
var descList = [];


/*
    Test function, read course list from file
 */
readCourseListFromFile = function (fileName) {

    fs.readFile('./' + fileName, 'utf8', function (err, html) {
        //$("body").append(html);
        parseCourseList(html);
    });

};


parseCourseList = function (html, thiscallback) {
    debugger;

    $("body").append(html);

    var myDataTable = {};
    var trs = $("tbody:eq(1)>tr");
    trs.each(function () {
        var dataRow = [];
        var tds = $(this).find("td");
        var url;

        tds.each(function () {
            var data = $(this);


            if (data.find("a").length != 0) {
                url = "http://courses.cciee121.com" + data.find("a").eq(0).attr("href");
            }
            else {
                dataRow.push(data.html().trim());
            }
        });

        myDataTable[url] = dataRow;
        acallback = function (myDataTable, url, descriptions) {
            //debugger;
            myDataTable[url].push(descriptions);
        };
        crawDescription(url, acallback, myDataTable);

    });

    console.log(myDataTable);

    //Todo figure out how to return till all http requests finished
    setTimeout(function () {
        thiscallback(myDataTable)
    }, 5000)

};


crawDescription = function (httpRequest, callback, myDataTable) {


    console.log("===========================CRAW DESCRIPTION===================================");
    console.log(httpRequest);
    //httpsync.get([options | url])


    request(httpRequest, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            $("body").empty();
            $("body").append(body);

            console.log("___________________parse Description Starts_______________");

            var reqUrl = response.request.uri.href;

            var description = parseDescription(reqUrl);
            callback(myDataTable, reqUrl, description);

        }
    })


};

parseDescription = function (reqUrl) {

    var name = $("[ name ='MajorCoursesEntity.Course.CourseNameC']").val().toString();
    var descrip = '"' + $("[ name ='MajorCoursesEntity.Course.ScheduleA']").val().toString().replace("\n", " ").replace("\t", ' ') + '"';
    //var descriptionLn = "'" + name + "'" + "\t" + "'" + descrip + "\n" + "'";
    descList.push(descrip);
    return descrip;
    //console.log(descrip);


};


getFullCourseInfo = function (html, callback) {
    parseCourseList(html, callback);
};


module.exports = {
    getFullCourseInfo: getFullCourseInfo
};
