var express = require('express');
var morgan = require('morgan')
var http =require('http')
var app = express();
app.use(morgan('short'))

var port=0;
if(process.env.PORT){
    port=process.env.PORT;
}

var addApi = express.Router();

addApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "difference": x + y
    });
});

var substractApi = express.Router();

substractApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "sum": x - y
    });
});


app.use('/api/addsub/add', addApi);
app.use('/api/addsub/sub', substractApi);
app.use((req, res) => {
    res.status(404).send('Page not found');
});

var server=http.createServer(app);
server.listen(port, () => {
    console.log('Add Substract service - Akshaya you are in on port %s',server.address().port);
});