var $ = require('jquery')(require("jsdom").jsdom().defaultView);

const fs = require('fs');
const URL = require('url');
const http = require('http');
const request = require('request');

var myDataTable = {};
var descriptionURLList = [];
var descList = [];

readCourseListFromFile = function (fileName) {

    fs.readFile('./' + fileName, 'utf8', function (err, html) {
        //$("body").append(html);
        parseCourseList(html);
    });

};


parseCourseList = function (html, thiscallback) {
debugger;

    $("body").append(html);
    //console.log($("td>a").eq(0).attr("href"));

    var myDataTable = {};
    var trs = $("tbody:eq(1)>tr");
    trs.each(function () {
        var dataRow = [];
        var tds = $(this).find("td");
        var url;


        tds.each(function () {
            var data = $(this);
            //console.log(data.html());
            //console.log(data.find("a"));

            if (data.find("a").length != 0) {
                url = "http://courses.cciee121.com" + data.find("a").eq(0).attr("href");

                // descriptionURLList.push(url);


            }
            else {
                //console.log("222232323232-");
                dataRow.push(data.html().trim());
            }
        });

        //console.log(dataRow);

        myDataTable[url] = dataRow;
        acallback = function (myDataTable, url, descriptions) {
            //debugger;
            myDataTable[url].push(descriptions);
        };
        crawDescription(url, acallback, myDataTable);

        ////ttlskjdflkajsdlkjlaksjfd

    });

    console.log(myDataTable);

    setTimeout(function () {
        thiscallback(myDataTable)
    }, 10000)

};


crawDescription = function (httpRequest, callback, myDataTable) {


    console.log("===========================CRAW DESCRIPTION===================================");
    console.log(httpRequest);
    //httpsync.get([options | url])


    request(httpRequest, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(JSON.stringify(response, undefined, 2));
            $("body").empty();
            //console.log(body) // Show the HTML for the Google homepage.
            $("body").append(body);
          //  console.log($("body").html());
            console.log("___________________parse Description Starts_______________");

            var reqUrl = response.request.uri.href;

            var description = parseDescription(reqUrl);
            callback(myDataTable, reqUrl, description);

            //console.log($("td").text());
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

    // setTimeout(function () {
    //
    //     console.log("________====================___________Final Result______==========_________");
    //
    //     //
    //     // for (var i = 0; i < descList.length; i++) {
    //     //     console.log(descList[i].toString());
    //     // }
    //
    //     $.each(myDataTable, function (key, value) {
    //         console.log(value);
    //     });
    //
    //     // console.log( JSON.stringify(myDataTable));
    //     console.log("________====================___________Final Result______==========_________");
    // }, 5000);
};


module.exports = {
    getFullCourseInfo: getFullCourseInfo
};
