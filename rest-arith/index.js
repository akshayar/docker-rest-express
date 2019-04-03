var express = require('express');
var app = express();
var morgan = require('morgan');
var http = require('http');
const multHost='localhost';
const multPort=8082;

const addhost='localhost';
const addPort=8081;

app.use(morgan('short'));

function callApi(targetHost, targetPort,targetPath,res) { 
    console.log("Calling api call host:%s, port:%s,path:%s",targetHost, targetPort, targetPath)
    var options = {
        host: targetHost,
        port: targetPort,
        method: 'GET',
        path: targetPath
    };

    http.get(options, function (apiResult) {

        var responseBody = "";

        apiResult.on("data", function (chunk) {
            responseBody += chunk;
        });

        apiResult.on("end", function () {
            var parsed = JSON.parse(responseBody);
            parsed.from="API call";
            res.status(200).json(parsed);
        });
    });
} 

var multApi = express.Router();

multApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    console.log("In the multiplication api x=%s , y=%s",x,y);
  
    callApi(multHost,multPort,'/api/mult/' + x + '/' + y,res);
});

var divApi = express.Router();

divApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    console.log("In the division api x=%s , y=%s",x,y);
  
    callApi(multHost,multPort,'/api/div/' + x + '/' + y,res);
});

var addApi = express.Router();

addApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    console.log("In the addition api x=%s , y=%s",x,y);
  
    callApi(addhost,addPort,'/api/add/' + x + '/' + y,res);
});

var subApi = express.Router();

subApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    console.log("In the substract api x=%s , y=%s",x,y);
  
    callApi(addhost,addPort,'/api/sub/' + x + '/' + y,res);
});




app.use('/api/mult', multApi);
app.use('/api/div', divApi);
app.use('/api/add', addApi);
app.use('/api/sub', subApi);

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(8080, () => {
    console.log('Akshaya you are in');
});