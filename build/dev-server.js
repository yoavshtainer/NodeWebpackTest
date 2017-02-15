require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var log = require('minilog')('server')
var bodyParser = require("body-parser");

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
app.use(bodyParser.urlencoded())
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

var db = require("../src/Sensor.dal").sensor;

app.post("/", function(request, response){
  	console.log("POST id: " + request.body.message.id + " name: " + request.body.message.name + " area: " + request.body.message.area);
// var data;
// console.log(data = Object.keys(request));
// var count = 0;
//               data.forEach(function(element) {
//                   // console.log("element number: " + count);
//                   console.log("name: "+ element);
//                   console.log("object: "+  Object.keys(element));
//                   count++;
//               }); 
db.getsensorByid(request.body.message.id,"sensors").then(function(sensor){
			console.log("sensor is: ", sensor);
			if(sensor === null) {
						console.log("not exist");
						var Data = request.body.message;
						db.add(Data,"sensors");
			} else {
						console.log("exist");
						sensor.status != sensor.status;
						db.updatesensor(sensor,"sensors");
      }
							
			response.send(request.body.message);
		},function(error){
			console.log("error is: ", error);
			response.send(error);
		});

});


app.get("/api/actionName/:id", function(request, response){

  	console.log("/api/actionName " + request.params.id);
	
		db.getsensorByid(request.params.id,"sensors").then(function(sensor){
              console.log("sensor is: ", sensor);
							if(sensor === null) {
								response.send('there is no data');								
							} else {
								response.send(sensor);
							}
              // return sensor;
            },function(error){
              console.log("error is: ", error);
							response.send(error);
              // return 0;
            });
		
 
  
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})


