var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/', function(request, response) {
  // 输出 JSON 格式
  data = {
    'first_name': 'roby',
    'last_name': 'zhou'
  };
  console.log(data);
  //  response.end(JSON.stringify(data));
  response.json(data);
});

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.json({extended: false})

app.post('/post', urlencodedParser, function(request, response) {
  // 输出 JSON 格式
  data = {
    'name': request.body.name,
    'gender': request.body.gender
  };
  console.log(data);
  //  response.end(JSON.stringify(data));
  response.json(data);
});

app.post('/send_message', urlencodedParser, function(request, response) {
  // 输出 JSON 格式
  data = {
    'mobiles': request.body.phone,
    'message': request.body.message
  };
  console.log(data);
  var dev_url = 'http://l-sms1.wap.dev.cn0.qunar.com:8080/mon/req';
  var url = 'http://sms1.f.cn1.qunar.com/mon/req';
  var api_type = 'qunar_tuiguang_wf';
  var groupid = 'ceq_2018_lottert';
  var FormData = require('form-data');
  var form = new FormData();
  fetch(url, {
    method: 'POST',
    body: {
      "type": api_type,
      "mobiles": data.mobiles,
      "message": data.message,
      "groupid": groupid
    }
  }).then(function(res) {
    return res.json();
  }).then(function(json) {
    console.log(json);
  });

  response.json(data);
});

app.get('/roby', function(request, response) {
  var hostName = request.hostname;
  console.log("hostName: %s", hostName);
  response.send("I got you!");
});

var questions = [
  {
    data: 213,
    num: 444,
    age: 12
  }, {
    data: 456,
    num: 678,
    age: 13
  }
];

//写个接口123
app.get('/123', function(req, res) {
  res.status(200),
  res.json(questions)
});

//配置服务端口
var server = app.listen(3000, function() {

  var host = server.address().address;

  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})
