var $ = require('jquery')(require("jsdom").jsdom().defaultView);

const fs = require('fs');
const URL = require('url');
const http = require('http');
const request = require('request');


fs.readFile('/Users/yliu12/WebstormProjects/121DBCrawler/Testhtml.html', 'utf8', function(err, html) {
  //$("body").append(html);
  parseCourseList(html);
});


var myDataTable = {};
var descriptionURLList = [];
var descList = [];


function parseCourseList(html) {


  $("body").append(html);
  //console.log($("td>a").eq(0).attr("href"));


  var trs = $("tbody:eq(1)>tr");
  trs.each(function() {
    var dataRow = "";
    var tds = $(this).find("td");
    var url;

    tds.each(function() {
      var data = $(this);
      //console.log(data.html());
      //console.log(data.find("a"));

      if (data.find("a").length != 0) {
        url = "http://courses.cciee121.com" + data.find("a").eq(0).attr("href")
        descriptionURLList.push(url);
        /* var myURL =
         URL.parse("http://courses.cciee121.com" + url);

         var majorcourseID = myURL.query;*/
        //console.log(majorcourseID);
      } else {
        //console.log("222232323232-");
        dataRow = dataRow + data.html().trim() + ",";
      }
    });

    //console.log(dataRow);

    myDataTable[url] = dataRow;

    ////ttlskjdflkajsdlkjlaksjfd

  });
  console.log(myDataTable);
  console.log(descriptionURLList);

  crawDescription(descriptionURLList);
}


function crawDescription(descriptionURLList) {


  for (var i = 0; i <= descriptionURLList.length - 1; i++) {


    var httpRequest = descriptionURLList[i];
    console.log("===========================CRAW DESCRIPTION===================================");
    console.log(httpRequest);
    //httpsync.get([options | url])


    request(httpRequest, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.stringify(response, undefined, 2));
        $("body").empty();
        //console.log(body) // Show the HTML for the Google homepage.
        $("body").append(body);
        console.log($("body").html());
        console.log("___________________parse Description Starts_______________");

        var reqUrl = response.request.uri.href;

        parseDescription(reqUrl);

        //console.log($("td").text());
      }
    })

  }

}

function parseDescription(reqUrl) {

  var name = $("[ name ='MajorCoursesEntity.Course.CourseNameC']").val().toString();
  var descrip = '"' + $("[ name ='MajorCoursesEntity.Course.ScheduleA']").val().toString().replace("\n", " ").replace("\t", ' ') + '"';
  //var descriptionLn = "'" + name + "'" + "\t" + "'" + descrip + "\n" + "'";
  myDataTable[reqUrl] = myDataTable[reqUrl] + "," + (descrip);
  console.log(descrip);
  descList.push(descrip);
}


setTimeout(function() {

  console.log("________====================___________Final Result______==========_________");

  //
  // for (var i = 0; i < descList.length; i++) {
  //     console.log(descList[i].toString());
  // }

  $.each(myDataTable, function(key, value) {
    console.log(value);
  });

  // console.log( JSON.stringify(myDataTable));
  console.log("________====================___________Final Result______==========_________");
}, 5000);
