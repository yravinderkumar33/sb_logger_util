const express = require('express');
const app = express();
const log4js = require('log4js');
const bodyParser = require('body-parser');
const { firstMiddleware, secondMiddleware } = require('./middlewares/firstMiddleware');
const { logger } = require('logger');
const uuidV1 = require('uuid/v1');

app.listen(6000, () => {
    console.log("server is running at port 6000");
})

app.use(bodyParser.json());

// middleware to add the id to the request
app.use((req, res, next) => {
    req.body.params = req.body.params ? req.body.params : {}
    req.id = req.headers['msgid'] || req.body.params.msgid || uuidV1();
    next();
})

app.use(log4js.connectLogger(logger, {
    level: 'auto',
    // include the Express request ID in the logs
    format: (req, res, format) => format(`":method :url  Status/:status" Id: ${req.id}`)
}));


app.get('/', function (req, res) {
    res.send('GET request to the homepage')
})

app.post('/', firstMiddleware, function (req, res) {
    res.send('POST request to the homepage')
})

app.post('/test', firstMiddleware, secondMiddleware, (req, res) => {
    res.send("second route with errors")
})




// Object.defineProperty(global, '__stack', {
    //     get: function () {
    //         var orig = Error.prepareStackTrace;
    //         Error.prepareStackTrace = function (_, stack) {
    //             return stack;
    //         };
    //         var err = new Error;
    //         Error.captureStackTrace(err, arguments.callee);
    //         var stack = err.stack;
    //         Error.prepareStackTrace = orig;
    //         return stack;
    //     }
    // });
    
    // Object.defineProperty(global, '__line', {
    //     get: function () {
    //         return __stack[1].getLineNumber();
    //     }
    // });
    
    // Object.defineProperty(global, '__function', {
    //     get: function () {
    //         return __stack[1].getFunctionName();
    //     }
    // });