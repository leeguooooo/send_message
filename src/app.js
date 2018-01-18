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

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.json({extended: false})

app.post('/send_message', urlencodedParser, function(request, response) {

  data = {
    'url': request.body.url,
    'mobiles': request.body.mobiles,
    'message': request.body.message
  };

  console.log(data);

  fetch(dev_url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "type=" + api_type + "&mobiles=" + data.mobiles + "&message=" + data.message + "&groupid=" + groupid
  }).then(function(res) {
    return res.json();
  }).then(function(json) {
    console.log(json);
  });

  response.json(data);
});

//配置服务端口
var server = app.listen(3000, function() {

  var host = server.address().address;

  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})
