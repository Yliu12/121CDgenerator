var app = angular.module('app', []);

function schoolSelectController($scope, $http) {


    $scope.init = function () {
        debugger;
        $scope.formData = {};
        $scope.ddlChinaU = ChinaUddlObj;
        $scope.chinaUkeyMap = chinaUkeyMap;
        $scope.selectedU = '';
        $scope.selectedcuid = '';
        $scope.courseDataAvaliable = false;
        $scope.courseList = [];

        // {
        //   name: 'courseName',
        //   code: 'courseCode',
        //   description: 'Description',
        //   grade: 'grade',
        //   hours: 54,
        //   credit: 3
        //
        // }

        $http.get('/api/initbsu')
            .success(function (data) {
                debugger;
                console.log(data);
            })
            .error(function (data) {
                debugger;
                console.log('Error: ' + data);
            });

    };

    //Todo add onchange function for input box.
    //Todo check if key valid before http
    //Todo reset flags.
    $scope.getMajors = function () {
        debugger;
        $scope.selectedcuid = chinaUkeyMap[$scope.selectedU];
        $scope.majorDataAvaliable = false;

        $http({
            url: '/api/majorunderchinaU',
            method: "GET",
            params: {
                cuid: $scope.selectedcuid
            }
        }).success(function (data) {
            debugger;
            $scope.ddlCUMajor = data.keyValPair;
            $scope.CUMajorDict = data.dict;
            $scope.majorDataAvaliable = true;

            console.log(data);
        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });
    };

    //Todo add onchange function for input box.
    //Todo check if key valid before http
    //Todo reset flags.
    $scope.getCourses = function () {
        $scope.waitingOnData = true;
        $scope.courseDataAvaliable = false;
        $scope.selectedmajorid = $scope.CUMajorDict[$scope.selectedMajor];
        $http({
            url: '/api/courses',
            method: "GET",
            params: {
                majorid: $scope.selectedmajorid
            }
        }).success(function (data) {
            $scope.waitingOnData = false;
            $scope.courseDataAvaliable = true;
            debugger;
            $scope.courseList = $scope.parseCourses(data);
            console.log($scope.courseList);

        }).error(function (data) {
            debugger;
            console.log('Error: ' + data);
        });

    };

    $scope.parseCourses = function (courseData) {
        debugger;
        var courseList = [];
        var courses = Object.values(courseData);
        for (index in courses) {
            var course = courses[index];
            courseList.push({
                name: course[4],
                code: course[1],
                description: course[8],
                grade: "",
                hours: course[5],
                credit: course[6]
            });
        }
        return courseList;
    };

};
//http://courses.cciee121.com/SelectSys/LianDongGetMajorList?datetime=2017/8/25%200:52:36&styleCorA=C&type=A&universityid=0ca53485-93b6-49a3-9824-327963bc2cc5
//http://courses.cciee121.com/SelectSys/LianDongGetMajorList?datetime=2017/8/24%2022:40:20&styleCorA=C&type=A&universityid=0ca53485-93b6-49a3-9824-327963bc2cc5
// var chinaUList = [];
//
// for (var index in $('#C>option')) {
//   debugger;
//   var option = $('#C>option')[index];
//   chinaUList.push({
//     key: option.value,
//     value: option.innerText
//   })
// }
// console.log(chinaUList);
// var chinaUkeyMap = {};
// for (var index in $('#C>option')) {
//   debugger;
//   var option = $('#C>option')[index];
//   chinaUkeyMap[option.innerText]= option.value;
//
// }
// console.log(JSON.stringify(chinaUkeyMap,null,2));


app.directive('courseInfo', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            course: '=data'
        },
        templateUrl: 'formTemplate.html'
    }
});


var chinaUkeyMap = {
    "安徽工业大学/Anhui University of Technology": "076786dc-5bfb-4827-83af-13b08c99b28f",
    "安徽师范大学/Anhui Normal University": "7c7faff1-b5af-4ee2-90b1-eb23ed96c97f",
    "安阳工学院/Anyang Institute Of Technology": "51094985-bbe2-4721-be25-df11bb20fc57",
    "北华大学/Beihua University": "b183c2a7-7543-4276-9a8d-e62f5cec2ca4",
    "北京交通大学/Beijing Jiaotong University": "789df95c-ba64-4999-8fb7-6d7467a65d93",
    "北京交通大学海滨学院/Beijing Jiaotong University Haibin College": "0032618b-4765-45ec-a9b8-9bc714f78678",
    "北京师范大学/Beijing Normal University": "0a13efb6-442b-48ec-a8af-ee7a1730ace5",
    "北京印刷学院/Beijing Institute Of Graphic Communication ": "6bdc2cad-87dd-49cf-8ed2-3cc8e349a6ee",
    "北京语言大学/Beijing Language and Cultural University": "b8a25189-3d62-4a13-b033-7fead70a98e0",
    "常熟理工学院/Changshu Institute of Technology": "aba06bbc-8927-4416-a137-af799195462a",
    "常州工学院/Changzhou Institute Of Technology": "cef072f6-b39b-4ccf-a0ce-a7498a068b67",
    "成都大学/Chengdu University": "a2b07aca-a1cc-4abb-8694-40731cba1b2c",
    "成都信息工程大学/Chengdu University of Information Technology": "d21f1087-efa7-4bff-b0b4-e2d04cebcc10",
    "大理学院/Dali University": "ba777c91-e519-4482-936d-d92c335aacd8",
    "大连交通大学/Dalian Jiaotong University": "f4e573aa-57f5-4791-875b-27ee638f8124",
    "电子科技大学/University of Electronic Science and Technology of China": "10f05440-8059-41bc-8100-fd99522877c8",
    "东北电力大学/Northeast Electric Power University": "fbca78e4-f11f-4ab8-b566-1047d68705d0",
    "东北农业大学/Northeast Agricultural University": "5e499def-c58b-4caf-829e-b3b52498d253",
    "福建工程学院/FuJian Universtiy of Technology": "5373ac40-3d85-450b-9ac6-45c71bac7715",
    "甘肃农业大学/Gansu Agricultural University": "2a7977e8-70a4-4d9c-aab8-da3ed686108d",
    "广东商学院/Guangdong University of Business Studies": "9e8f4802-67dd-4f3e-85dc-55786fbf946c",
    "广西大学/Guangxi University": "658b7892-4d4e-4d62-a21f-9c55ccbfefc4",
    "广州大学/Guangzhou University": "38bace3c-ae71-4cf9-a883-633545f9c4e3",
    "哈尔滨师范大学/Harbin Normal University": "44b46f9a-3fb0-4780-bc19-ee9e5c3893e0",
    "海南大学/Hainan University": "1963373d-8dcb-4160-8eeb-6055e0415ae1",
    "杭州师范大学/Hangzhou Normal University": "4680ae9a-d3af-4e78-8b9f-7d1988966e07",
    "合肥工业大学/Hefei University of Technology": "922353cd-51d7-47ea-9a52-0a1188718859",
    "河北北方学院/Hebei North University": "aa0cad00-7f5e-47e1-a4dc-064cee9d8c46",
    "河北科技师范学院/Hebei Normal University of Science & Technology": "f720cff5-db06-47b6-9b68-f3cc68f01ccb",
    "河北师范大学/Hebei Normal University ": "8473d5c0-2be5-4301-9f6d-8fd964eea0db",
    "河南大学/Henan University": "4ad3fbfe-9e2d-45c6-952e-616569b2cee5",
    "河南工业大学/Henan University of Technology": "36c41e3f-a558-4e31-81ed-ddb7f1355c97",
    "河南理工大学/Henan Polytechnic University": "9119c356-0454-4542-b51e-d7e3be2ef6ce",
    "黑河学院/Heihe University": "356f8da3-8e21-4ef3-9470-1b975870c300",
    "红河学院/Honghe University": "f33da42d-5278-446a-bbad-0ec678f9aecf",
    "湖北大学/Hubei University": "3885bc92-3369-470a-949e-af73ac46a24e",
    "湖州师范学院/Huzhou University": "ac133b04-3ec6-4a50-8656-9aa902d2bdb7",
    "华北水利水电大学/North China University of Water Resources and Electric ": "8cf809ad-a2c1-45a8-9ff8-a9a82fa3d213",
    "华东交通大学/East China Jiaotong University": "4a6d4ba4-421a-4115-bb13-b3cd3bf4769b",
    "华侨大学/Huaqiao University": "46995f3b-4a85-457a-95f5-be13fd683b40",
    "淮阴师范学院/University of Minnesota Duluth": "3a7efd6c-2591-43f0-b739-9b0ab94245bc",
    "黄淮学院/Huanghuai University": "93b59126-68ea-42fc-9215-d0a3af09cf3d",
    "吉林化工学院/Jilin Institute of Chemical Technology": "13eb83fe-0f52-48b2-acc7-a08f2102a944",
    "济南大学/University of Jinan": "12acfe17-4791-4abd-857c-5f75b1e74637",
    "暨南大学/Jinan University": "9ed06abf-8bb5-4ddc-9e81-f1f1b6b387a1",
    "江西财经大学/Jiangxi University of Finance and Economics": "16a5d2fa-5a96-4533-9d82-7b4d42b01e79",
    "昆明理工大学/Kunming University of Science & Technology": "bd983b8b-9731-44ad-9697-bea2b2393360",
    "兰州财经大学/LanZhou University of Finance and Economics": "60d59d40-8ce4-4450-ae35-f1a9fc6d1f4d",
    "兰州交通大学/Lanzhou JiaoTong University": "af495fe1-1346-4b5c-b69b-c9f214e89192",
    "兰州理工大学/Lanzhou University of Technology": "73ab3c41-2f4f-4e35-9a70-456d3cb0bd65",
    "辽宁大学/Liaoning University": "08f7ca33-f53e-4e5e-b175-2f27ac27c3c3",
    "辽宁石油化工大学/Liaoning Shihua University": "daa4cb4b-7562-45c8-8c59-aeae430b8ca2",
    "陇东学院/Longdong University": "be44406e-a174-4d7b-85b5-138c5c71ffc1",
    "南昌航空大学/Nanchang Hangkong University": "ba3909d3-0afb-4171-b557-696aca58f2ae",
    "南京工业大学/Nanjing Tech University": "00dd4762-b5ad-413d-915e-e17939f6df34",
    "南京农业大学/Nanjing Agricultural University": "1f6f5fa3-c84b-4fd5-ac40-2db95793c23a",
    "南京审计学院/Nanjing Audit University": "70d5055d-734f-4da2-8f51-79d22d3d6d9c",
    "南京师范大学/Nanjing Normal University": "0af110e2-8ed1-4959-adf9-0fa9a7d0e15d",
    "南京信息工程大学/Nanjing University of Information Science & Technology": "76ba588f-c6d0-424b-b00d-8512db6f2c2f",
    "南京艺术学院/Nanjing University of the Arts": "86ec2a34-b95a-4d3c-842e-9a82b9d2f7bc",
    "南京邮电大学/Nanjing University Of Posts And Telecommunications": "1d0c0233-a0ad-4b8c-a952-c6bf071811ee",
    "南阳师范学院/Nanyang Normal University": "11e0cdb4-8f6f-4c87-b0cc-1064845e4213",
    "内蒙古大学/Inner Mongolia University": "cdc8fce6-ce23-4e41-8dd6-59b15c3ab4b5",
    "内蒙古工业大学/Inner Mongolia University of Technology": "d793ab39-d5d5-4aaa-9539-c3609306dd7a",
    "宁波工程学院/Ningbo University of Technology": "16f345fc-3d96-44b6-bc78-f221bdfe9bfc",
    "青岛大学/Qingdao University": "bd81ab24-4d8d-427f-9d04-8cb05a6d20e8",
    "青海大学/Qinghai university ": "05ae2b47-9424-4b59-9872-0e3b291241fe",
    "青海民族大学/Qinghai Nationalities University ": "5b99b031-d714-4c74-a304-c7dfad8f7735",
    "三峡大学/China Three Gorges University": "82d1072a-b167-4592-b0a3-c6762e73c39a",
    "山东大学（威海）/Shandong University, Weihai": "547f6894-345a-4c7f-8920-96053b779f06",
    "陕西科技大学/Shaanxi University of Science & Technology": "be5aecfb-b8a0-44ca-8dea-0828f48ad456",
    "陕西师范大学/Shaanxi Normal University": "0ad95510-47dd-405f-b44a-852680230a47",
    "上海师范大学/Shanghai Normal University": "32ca4db5-54c4-4377-b347-d4446af7394b",
    "韶关学院/Shaoguan University": "af9f6f4b-2462-40ba-bd01-9878f94688ba",
    "石河子大学/Shihezi University": "3fb01df0-7e62-4d73-96a2-b6c0b01dd993",
    "四川师范大学/Sichuan Normal University": "7cece555-0ee4-449a-9e52-e868633ca839",
    "苏州大学/Soochow University": "b6cccc80-62be-42f8-86db-d4226f0e6e8d",
    "苏州大学文正学院/WENZHENG COLLEGE OF SOOCHOW UNIVERSITY": "93b16910-db80-4846-a9f1-b7f096c3976d",
    "太原理工大学/Taiyuan University of Technology": "2ef38aac-df5d-4065-8de7-184b8ae4b2db",
    "天津科技大学/Tianjin University of Science & Technology": "ae58d589-ad68-4e16-8c7f-7a98f5ddf66a",
    "天水师范学院/Tianshui Normal University": "0d120a7a-15a4-423b-a1b3-e3d21c587ff2",
    "温州医科大学/Wenzhou Medical College": "8040ccd9-edab-48d2-b361-d2ca0d09e2fa",
    "武汉理工大学/Wuhan University of Technology": "22bfccf3-9d7e-4085-b6c6-cc58d66bddc0",
    "西安建筑科技大学/Xi‘an University of Architecture and Technology": "cd7e7b00-00b6-48aa-beed-3398fe0632dd",
    "西安科技大学/Xi’an University of Science & Technology": "3e33f76a-3bff-4874-95b8-87a97782a7e4",
    "西安石油大学/Xi’an Shiyou University": "afcfd4e4-9951-4b57-bf33-4010edf5d8fe",
    "西安外国语大学/Xi’an International Studies University": "3475aa97-4ad8-4271-8da6-e8802eb9980e",
    "西安邮电大学/Xi’an University of Posts and Telecommunications": "84b696ca-fdcf-4122-aa2b-f7086b579cd5",
    "西华大学/Xihua University": "a6a31be8-260b-432d-93bd-fd6f15002abe",
    "西南交通大学/Southwest Jiaotong University": "631225b0-94c9-4003-a014-3a9bb516815d",
    "西南科技大学/Southwest University of Science and Technology": "2fbc7cf2-bd7e-4d28-9b73-466f9df3a1fb",
    "西南石油大学/Southwest Petroleum University": "2b815c94-3524-4327-b4ed-46a608044dc5",
    "新疆财经大学/Xinjiang university of finance": "33420000-59d6-4ee9-ba2f-958ced236053",
    "新疆师范大学/Xinjiang Normal University": "c10dc842-89de-4900-a48a-a8490352c487",
    "延安大学/Yan'an University": "59f3d115-3dac-4bd6-880d-03eda3e86079",
    "延边大学/Yanbian University": "b69d9040-02d0-46ef-8ac3-c8d544488636",
    "扬州大学/Yangzhou University": "c47dc767-a395-4867-9d9f-db8cb294f213",
    "玉溪师范学院/Yuxi Normal University": "53ee5925-15b0-40cb-b79d-fee6f0df1bb3",
    "云南财经大学/Yunnan University of Finance & Economics": "cba02f06-91b8-483a-847e-37af4a31bdb0",
    "云南大学/Yunnan University": "dad65df2-40b7-409f-b87d-1b5adc59c973",
    "云南大学（旅游文化学院）/Tourism and Culture College of Yunnan University": "29a3a54d-d617-49f6-8d78-363f0c7304d0",
    "云南民族大学/Yunnan University of Nationalities": "c1d72ce2-05c6-452a-a97e-d22a124a1b35",
    "云南农业大学/Yunnan Agricultural University": "e5bd0ffe-d65f-4991-b3cf-7d8bc3d55cf7",
    "云南师范大学/Yunnan Normal University": "2765ad89-b787-4ea6-8421-6aee0b5de94d",
    "长安大学/Chang’an University": "65775aea-6885-4134-b0ca-d5911394b691",
    "长江师范学院/Yangtze Normal University": "b890cacb-6c94-43fb-ab5e-d52ff77560db",
    "浙江师范大学/Zhejiang Normal University": "63a38c0a-8b70-4fb9-ad7d-420a9656cc52",
    "浙江外国语学院/Zhejiang International Studies University": "4de81a4d-5510-4a68-add2-4e8fff63c74a",
    "郑州航空工业管理学院/Zhengzhou Institute of Aeronautical Industry Management": "baa41aad-acfc-4d2e-af26-fa9d424dac20",
    "郑州轻工业学院/Zhengzhou University of Light Industry": "4306a1bf-6833-41e6-9fb4-5f5e21b93496",
    "中北大学/North University of China": "342c2838-fef5-4576-a564-32adaba47cac",
    "中北大学信息商务学院/College of Information and Business, North University of China": "fa9377ae-96a3-4148-96f8-26afc0d1d86a",
    "中国传媒大学/Communication University of China": "40303cde-9d67-4dba-a58b-91f250556ebc",
    "中国农业大学/China Agricultural University": "9a4157ad-28c1-4a1b-8f4a-a02a2ef6e38a",
    "中国药科大学/China Pharmaceutical University": "f5bcecf3-d0f8-4702-9155-da32b4f7c7d5",
    "中华女子学院/China Women’s University": "bac64c22-e0b7-43a4-b9f8-1a48e54cabd9",
    "中南林业科技大学/Central South University of Forestry & Technology": "53b541fb-9e4a-4b1a-baf0-877af2d12205",
    "中原工学院/Zhongyuan University of Technology": "daac1d11-cc9e-486d-8815-3896d9b9cc8b",
    "重庆大学/Chongqing University": "874261f8-0253-4632-b53b-742538d49e5e",
    "重庆理工大学/Chongqing University of Technology": "0530a953-1726-418e-a6a3-a8be3b1784c6",
    "重庆师范大学/Chong Qing Normal University": "da3b9216-cd1f-4e51-8a90-194aedf0e0fd",
    "重庆邮电大学/Chongqing University of Posts & Telecommunications": "c763e730-9572-47b0-a699-9e856c0a8bfa"
};
var ChinaUddlObj = [{
    "key": "076786dc-5bfb-4827-83af-13b08c99b28f",
    "value": "安徽工业大学/Anhui University of Technology"
}, {
    "key": "7c7faff1-b5af-4ee2-90b1-eb23ed96c97f",
    "value": "安徽师范大学/Anhui Normal University"
}, {
    "key": "51094985-bbe2-4721-be25-df11bb20fc57",
    "value": "安阳工学院/Anyang Institute Of Technology"
}, {
    "key": "b183c2a7-7543-4276-9a8d-e62f5cec2ca4",
    "value": "北华大学/Beihua University"
}, {
    "key": "789df95c-ba64-4999-8fb7-6d7467a65d93",
    "value": "北京交通大学/Beijing Jiaotong University"
}, {
    "key": "0032618b-4765-45ec-a9b8-9bc714f78678",
    "value": "北京交通大学海滨学院/Beijing Jiaotong University Haibin College"
}, {
    "key": "0a13efb6-442b-48ec-a8af-ee7a1730ace5",
    "value": "北京师范大学/Beijing Normal University"
}, {
    "key": "6bdc2cad-87dd-49cf-8ed2-3cc8e349a6ee",
    "value": "北京印刷学院/Beijing Institute Of Graphic Communication "
}, {
    "key": "b8a25189-3d62-4a13-b033-7fead70a98e0",
    "value": "北京语言大学/Beijing Language and Cultural University"
}, {
    "key": "aba06bbc-8927-4416-a137-af799195462a",
    "value": "常熟理工学院/Changshu Institute of Technology"
}, {
    "key": "cef072f6-b39b-4ccf-a0ce-a7498a068b67",
    "value": "常州工学院/Changzhou Institute Of Technology"
}, {
    "key": "a2b07aca-a1cc-4abb-8694-40731cba1b2c",
    "value": "成都大学/Chengdu University"
}, {
    "key": "d21f1087-efa7-4bff-b0b4-e2d04cebcc10",
    "value": "成都信息工程大学/Chengdu University of Information Technology"
}, {
    "key": "ba777c91-e519-4482-936d-d92c335aacd8",
    "value": "大理学院/Dali University"
}, {
    "key": "f4e573aa-57f5-4791-875b-27ee638f8124",
    "value": "大连交通大学/Dalian Jiaotong University"
}, {
    "key": "10f05440-8059-41bc-8100-fd99522877c8",
    "value": "电子科技大学/University of Electronic Science and Technology of China"
}, {
    "key": "fbca78e4-f11f-4ab8-b566-1047d68705d0",
    "value": "东北电力大学/Northeast Electric Power University"
}, {
    "key": "5e499def-c58b-4caf-829e-b3b52498d253",
    "value": "东北农业大学/Northeast Agricultural University"
}, {
    "key": "5373ac40-3d85-450b-9ac6-45c71bac7715",
    "value": "福建工程学院/FuJian Universtiy of Technology"
}, {
    "key": "2a7977e8-70a4-4d9c-aab8-da3ed686108d",
    "value": "甘肃农业大学/Gansu Agricultural University"
}, {
    "key": "9e8f4802-67dd-4f3e-85dc-55786fbf946c",
    "value": "广东商学院/Guangdong University of Business Studies"
}, {
    "key": "658b7892-4d4e-4d62-a21f-9c55ccbfefc4",
    "value": "广西大学/Guangxi University"
}, {
    "key": "38bace3c-ae71-4cf9-a883-633545f9c4e3",
    "value": "广州大学/Guangzhou University"
}, {
    "key": "44b46f9a-3fb0-4780-bc19-ee9e5c3893e0",
    "value": "哈尔滨师范大学/Harbin Normal University"
}, {
    "key": "1963373d-8dcb-4160-8eeb-6055e0415ae1",
    "value": "海南大学/Hainan University"
}, {
    "key": "4680ae9a-d3af-4e78-8b9f-7d1988966e07",
    "value": "杭州师范大学/Hangzhou Normal University"
}, {
    "key": "922353cd-51d7-47ea-9a52-0a1188718859",
    "value": "合肥工业大学/Hefei University of Technology"
}, {
    "key": "aa0cad00-7f5e-47e1-a4dc-064cee9d8c46",
    "value": "河北北方学院/Hebei North University"
}, {
    "key": "f720cff5-db06-47b6-9b68-f3cc68f01ccb",
    "value": "河北科技师范学院/Hebei Normal University of Science & Technology"
}, {
    "key": "8473d5c0-2be5-4301-9f6d-8fd964eea0db",
    "value": "河北师范大学/Hebei Normal University "
}, {
    "key": "4ad3fbfe-9e2d-45c6-952e-616569b2cee5",
    "value": "河南大学/Henan University"
}, {
    "key": "36c41e3f-a558-4e31-81ed-ddb7f1355c97",
    "value": "河南工业大学/Henan University of Technology"
}, {
    "key": "9119c356-0454-4542-b51e-d7e3be2ef6ce",
    "value": "河南理工大学/Henan Polytechnic University"
}, {
    "key": "356f8da3-8e21-4ef3-9470-1b975870c300",
    "value": "黑河学院/Heihe University"
}, {
    "key": "f33da42d-5278-446a-bbad-0ec678f9aecf",
    "value": "红河学院/Honghe University"
}, {
    "key": "3885bc92-3369-470a-949e-af73ac46a24e",
    "value": "湖北大学/Hubei University"
}, {
    "key": "2b59b59e-c1a7-436c-b275-55a5fa1fa046",
    "value": "湖州师范学院/Huzhou University"
}, {
    "key": "ac133b04-3ec6-4a50-8656-9aa902d2bdb7",
    "value": "湖州师范学院/Huzhou University"
}, {
    "key": "8cf809ad-a2c1-45a8-9ff8-a9a82fa3d213",
    "value": "华北水利水电大学/North China University of Water Resources and Electric "
}, {
    "key": "4a6d4ba4-421a-4115-bb13-b3cd3bf4769b",
    "value": "华东交通大学/East China Jiaotong University"
}, {
    "key": "46995f3b-4a85-457a-95f5-be13fd683b40",
    "value": "华侨大学/Huaqiao University"
}, {
    "key": "3a7efd6c-2591-43f0-b739-9b0ab94245bc",
    "value": "淮阴师范学院/University of Minnesota Duluth"
}, {
    "key": "93b59126-68ea-42fc-9215-d0a3af09cf3d",
    "value": "黄淮学院/Huanghuai University"
}, {
    "key": "13eb83fe-0f52-48b2-acc7-a08f2102a944",
    "value": "吉林化工学院/Jilin Institute of Chemical Technology"
}, {
    "key": "12acfe17-4791-4abd-857c-5f75b1e74637",
    "value": "济南大学/University of Jinan"
}, {
    "key": "9ed06abf-8bb5-4ddc-9e81-f1f1b6b387a1",
    "value": "暨南大学/Jinan University"
}, {
    "key": "16a5d2fa-5a96-4533-9d82-7b4d42b01e79",
    "value": "江西财经大学/Jiangxi University of Finance and Economics"
}, {
    "key": "bd983b8b-9731-44ad-9697-bea2b2393360",
    "value": "昆明理工大学/Kunming University of Science & Technology"
}, {
    "key": "60d59d40-8ce4-4450-ae35-f1a9fc6d1f4d",
    "value": "兰州财经大学/LanZhou University of Finance and Economics"
}, {
    "key": "af495fe1-1346-4b5c-b69b-c9f214e89192",
    "value": "兰州交通大学/Lanzhou JiaoTong University"
}, {
    "key": "73ab3c41-2f4f-4e35-9a70-456d3cb0bd65",
    "value": "兰州理工大学/Lanzhou University of Technology"
}, {
    "key": "08f7ca33-f53e-4e5e-b175-2f27ac27c3c3",
    "value": "辽宁大学/Liaoning University"
}, {
    "key": "daa4cb4b-7562-45c8-8c59-aeae430b8ca2",
    "value": "辽宁石油化工大学/Liaoning Shihua University"
}, {
    "key": "be44406e-a174-4d7b-85b5-138c5c71ffc1",
    "value": "陇东学院/Longdong University"
}, {
    "key": "ba3909d3-0afb-4171-b557-696aca58f2ae",
    "value": "南昌航空大学/Nanchang Hangkong University"
}, {
    "key": "00dd4762-b5ad-413d-915e-e17939f6df34",
    "value": "南京工业大学/Nanjing Tech University"
}, {
    "key": "1f6f5fa3-c84b-4fd5-ac40-2db95793c23a",
    "value": "南京农业大学/Nanjing Agricultural University"
}, {
    "key": "70d5055d-734f-4da2-8f51-79d22d3d6d9c",
    "value": "南京审计学院/Nanjing Audit University"
}, {
    "key": "0af110e2-8ed1-4959-adf9-0fa9a7d0e15d",
    "value": "南京师范大学/Nanjing Normal University"
}, {
    "key": "76ba588f-c6d0-424b-b00d-8512db6f2c2f",
    "value": "南京信息工程大学/Nanjing University of Information Science & Technology"
}, {
    "key": "86ec2a34-b95a-4d3c-842e-9a82b9d2f7bc",
    "value": "南京艺术学院/Nanjing University of the Arts"
}, {
    "key": "1d0c0233-a0ad-4b8c-a952-c6bf071811ee",
    "value": "南京邮电大学/Nanjing University Of Posts And Telecommunications"
}, {
    "key": "11e0cdb4-8f6f-4c87-b0cc-1064845e4213",
    "value": "南阳师范学院/Nanyang Normal University"
}, {
    "key": "cdc8fce6-ce23-4e41-8dd6-59b15c3ab4b5",
    "value": "内蒙古大学/Inner Mongolia University"
}, {
    "key": "d793ab39-d5d5-4aaa-9539-c3609306dd7a",
    "value": "内蒙古工业大学/Inner Mongolia University of Technology"
}, {
    "key": "16f345fc-3d96-44b6-bc78-f221bdfe9bfc",
    "value": "宁波工程学院/Ningbo University of Technology"
}, {
    "key": "bd81ab24-4d8d-427f-9d04-8cb05a6d20e8",
    "value": "青岛大学/Qingdao University"
}, {
    "key": "05ae2b47-9424-4b59-9872-0e3b291241fe",
    "value": "青海大学/Qinghai university "
}, {
    "key": "5b99b031-d714-4c74-a304-c7dfad8f7735",
    "value": "青海民族大学/Qinghai Nationalities University "
}, {
    "key": "82d1072a-b167-4592-b0a3-c6762e73c39a",
    "value": "三峡大学/China Three Gorges University"
}, {
    "key": "547f6894-345a-4c7f-8920-96053b779f06",
    "value": "山东大学（威海）/Shandong University, Weihai"
}, {
    "key": "be5aecfb-b8a0-44ca-8dea-0828f48ad456",
    "value": "陕西科技大学/Shaanxi University of Science & Technology"
}, {
    "key": "0ad95510-47dd-405f-b44a-852680230a47",
    "value": "陕西师范大学/Shaanxi Normal University"
}, {
    "key": "32ca4db5-54c4-4377-b347-d4446af7394b",
    "value": "上海师范大学/Shanghai Normal University"
}, {
    "key": "af9f6f4b-2462-40ba-bd01-9878f94688ba",
    "value": "韶关学院/Shaoguan University"
}, {
    "key": "3fb01df0-7e62-4d73-96a2-b6c0b01dd993",
    "value": "石河子大学/Shihezi University"
}, {
    "key": "7cece555-0ee4-449a-9e52-e868633ca839",
    "value": "四川师范大学/Sichuan Normal University"
}, {
    "key": "b6cccc80-62be-42f8-86db-d4226f0e6e8d",
    "value": "苏州大学/Soochow University"
}, {
    "key": "93b16910-db80-4846-a9f1-b7f096c3976d",
    "value": "苏州大学文正学院/WENZHENG COLLEGE OF SOOCHOW UNIVERSITY"
}, {
    "key": "2ef38aac-df5d-4065-8de7-184b8ae4b2db",
    "value": "太原理工大学/Taiyuan University of Technology"
}, {
    "key": "ae58d589-ad68-4e16-8c7f-7a98f5ddf66a",
    "value": "天津科技大学/Tianjin University of Science & Technology"
}, {
    "key": "0d120a7a-15a4-423b-a1b3-e3d21c587ff2",
    "value": "天水师范学院/Tianshui Normal University"
}, {
    "key": "8040ccd9-edab-48d2-b361-d2ca0d09e2fa",
    "value": "温州医科大学/Wenzhou Medical College"
}, {
    "key": "22bfccf3-9d7e-4085-b6c6-cc58d66bddc0",
    "value": "武汉理工大学/Wuhan University of Technology"
}, {
    "key": "cd7e7b00-00b6-48aa-beed-3398fe0632dd",
    "value": "西安建筑科技大学/Xi‘an University of Architecture and Technology"
}, {
    "key": "3e33f76a-3bff-4874-95b8-87a97782a7e4",
    "value": "西安科技大学/Xi’an University of Science & Technology"
}, {
    "key": "afcfd4e4-9951-4b57-bf33-4010edf5d8fe",
    "value": "西安石油大学/Xi’an Shiyou University"
}, {
    "key": "3475aa97-4ad8-4271-8da6-e8802eb9980e",
    "value": "西安外国语大学/Xi’an International Studies University"
}, {
    "key": "84b696ca-fdcf-4122-aa2b-f7086b579cd5",
    "value": "西安邮电大学/Xi’an University of Posts and Telecommunications"
}, {
    "key": "a6a31be8-260b-432d-93bd-fd6f15002abe",
    "value": "西华大学/Xihua University"
}, {
    "key": "631225b0-94c9-4003-a014-3a9bb516815d",
    "value": "西南交通大学/Southwest Jiaotong University"
}, {
    "key": "2fbc7cf2-bd7e-4d28-9b73-466f9df3a1fb",
    "value": "西南科技大学/Southwest University of Science and Technology"
}, {
    "key": "2b815c94-3524-4327-b4ed-46a608044dc5",
    "value": "西南石油大学/Southwest Petroleum University"
}, {
    "key": "33420000-59d6-4ee9-ba2f-958ced236053",
    "value": "新疆财经大学/Xinjiang university of finance"
}, {
    "key": "c10dc842-89de-4900-a48a-a8490352c487",
    "value": "新疆师范大学/Xinjiang Normal University"
}, {
    "key": "59f3d115-3dac-4bd6-880d-03eda3e86079",
    "value": "延安大学/Yan'an University"
}, {
    "key": "b69d9040-02d0-46ef-8ac3-c8d544488636",
    "value": "延边大学/Yanbian University"
}, {
    "key": "c47dc767-a395-4867-9d9f-db8cb294f213",
    "value": "扬州大学/Yangzhou University"
}, {
    "key": "53ee5925-15b0-40cb-b79d-fee6f0df1bb3",
    "value": "玉溪师范学院/Yuxi Normal University"
}, {
    "key": "cba02f06-91b8-483a-847e-37af4a31bdb0",
    "value": "云南财经大学/Yunnan University of Finance & Economics"
}, {
    "key": "dad65df2-40b7-409f-b87d-1b5adc59c973",
    "value": "云南大学/Yunnan University"
}, {
    "key": "29a3a54d-d617-49f6-8d78-363f0c7304d0",
    "value": "云南大学（旅游文化学院）/Tourism and Culture College of Yunnan University"
}, {
    "key": "c1d72ce2-05c6-452a-a97e-d22a124a1b35",
    "value": "云南民族大学/Yunnan University of Nationalities"
}, {
    "key": "e5bd0ffe-d65f-4991-b3cf-7d8bc3d55cf7",
    "value": "云南农业大学/Yunnan Agricultural University"
}, {
    "key": "2765ad89-b787-4ea6-8421-6aee0b5de94d",
    "value": "云南师范大学/Yunnan Normal University"
}, {
    "key": "65775aea-6885-4134-b0ca-d5911394b691",
    "value": "长安大学/Chang’an University"
}, {
    "key": "b890cacb-6c94-43fb-ab5e-d52ff77560db",
    "value": "长江师范学院/Yangtze Normal University"
}, {
    "key": "63a38c0a-8b70-4fb9-ad7d-420a9656cc52",
    "value": "浙江师范大学/Zhejiang Normal University"
}, {
    "key": "4de81a4d-5510-4a68-add2-4e8fff63c74a",
    "value": "浙江外国语学院/Zhejiang International Studies University"
}, {
    "key": "baa41aad-acfc-4d2e-af26-fa9d424dac20",
    "value": "郑州航空工业管理学院/Zhengzhou Institute of Aeronautical Industry Management"
}, {
    "key": "4306a1bf-6833-41e6-9fb4-5f5e21b93496",
    "value": "郑州轻工业学院/Zhengzhou University of Light Industry"
}, {
    "key": "342c2838-fef5-4576-a564-32adaba47cac",
    "value": "中北大学/North University of China"
}, {
    "key": "fa9377ae-96a3-4148-96f8-26afc0d1d86a",
    "value": "中北大学信息商务学院/College of Information and Business, North University of China"
}, {
    "key": "40303cde-9d67-4dba-a58b-91f250556ebc",
    "value": "中国传媒大学/Communication University of China"
}, {
    "key": "9a4157ad-28c1-4a1b-8f4a-a02a2ef6e38a",
    "value": "中国农业大学/China Agricultural University"
}, {
    "key": "f5bcecf3-d0f8-4702-9155-da32b4f7c7d5",
    "value": "中国药科大学/China Pharmaceutical University"
}, {
    "key": "bac64c22-e0b7-43a4-b9f8-1a48e54cabd9",
    "value": "中华女子学院/China Women’s University"
}, {
    "key": "53b541fb-9e4a-4b1a-baf0-877af2d12205",
    "value": "中南林业科技大学/Central South University of Forestry & Technology"
}, {
    "key": "daac1d11-cc9e-486d-8815-3896d9b9cc8b",
    "value": "中原工学院/Zhongyuan University of Technology"
}, {
    "key": "874261f8-0253-4632-b53b-742538d49e5e",
    "value": "重庆大学/Chongqing University"
}, {
    "key": "0530a953-1726-418e-a6a3-a8be3b1784c6",
    "value": "重庆理工大学/Chongqing University of Technology"
}, {
    "key": "da3b9216-cd1f-4e51-8a90-194aedf0e0fd",
    "value": "重庆师范大学/Chong Qing Normal University"
}, {
    "key": "c763e730-9572-47b0-a699-9e856c0a8bfa",
    "value": "重庆邮电大学/Chongqing University of Posts & Telecommunications"
}];
