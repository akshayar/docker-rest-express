var express = require('express');
var morgan = require('morgan')

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

app.listen(port, () => {
    console.log('Akshaya you are in on port %s',app.address().port);
});
