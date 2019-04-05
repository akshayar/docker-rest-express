var express = require('express');
var morgan = require('morgan')
var http =require('http')

var app = express();
app.use(morgan('short'))

var port=0;
if(process.env.PORT){
    port=process.env.PORT;
}
var multApi = express.Router();

multApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "product": x * y
    });
});

var divApi = express.Router();

divApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "ratio": x / y
    });
});


app.use('/api/multdiv/mult', multApi);
app.use('/api/multdiv/div', divApi);
app.use((req, res) => {
    res.status(404).send('Page not found');
});

var server=http.createServer(app);
server.listen(port, () => {
    console.log('Multilication division - Akshaya you are in on port %s',server.address().port);
});