var express = require('express');
var morgan = require('morgan');
var http = require('http');

var app = express();
const multHost=process.env.MULT_HOST;
const multPort=process.env.MULT_PORT;

const addhost=process.env.ADD_HOST;
const addPort=process.env.ADD_PORT;

var port=0;
if(process.env.PORT){
    port=process.env.PORT;
}
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
  
    callApi(multHost,multPort,'/api/multdiv/mult/' + x + '/' + y,res);
});

var divApi = express.Router();

divApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    console.log("In the division api x=%s , y=%s",x,y);
  
    callApi(multHost,multPort,'/api/multdiv/div/' + x + '/' + y,res);
});

var addApi = express.Router();

addApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    console.log("In the addition api x=%s , y=%s",x,y);
  
    callApi(addhost,addPort,'/api/addsub/add/' + x + '/' + y,res);
});

var subApi = express.Router();

subApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    console.log("In the substract api x=%s , y=%s",x,y);
  
    callApi(addhost,addPort,'/api/addsub/sub/' + x + '/' + y,res);
});




app.use('/api/calc/mult', multApi);
app.use('/api/calc/div', divApi);
app.use('/api/calc/add', addApi);
app.use('/api/calc/sub', subApi);

app.use((req, res) => {
    res.status(404).send('Page not found');
});

var server=http.createServer(app);
server.listen(port, () => {
    console.log('Akshaya you are in on port %s',server.address().port);
});