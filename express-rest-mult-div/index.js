var express = require('express');
var app = express();
var morgan = require('morgan')

app.use(morgan('short'))

var multApi = express.Router();

multApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "result": x * y
    });
});

var divApi = express.Router();

divApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "result": x / y
    });
});


app.use('/api/mult', multApi);
app.use('/api/div', divApi);
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(8082, () => {
    console.log('Akshaya you are in');
});