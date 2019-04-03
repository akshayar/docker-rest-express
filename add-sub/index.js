var express = require('express');
var morgan = require('morgan')

var app = express();
app.use(morgan('short'))
const port=process.env.PORT;

var addApi = express.Router();

addApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "result": x + y
    });
});

var substractApi = express.Router();

substractApi.get('/:x/:y', (req, res) => {
    var x = parseFloat(req.params.x);
    var y = parseFloat(req.params.y);
    res.status(200).json({
        "x": x,
        "y": y,
        "result": x - y
    });
});


app.use('/api/add', addApi);
app.use('/api/sub', substractApi);
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log('Akshaya you are in on port %s',port);
});