const log = require('logger');
const path = require('path');

const filename = path.basename(__filename);
// this middle creates the request body
const firstMiddleware = (req, res, next) => {
    const data = {
        body: req.body && Object.keys(req.body).length > 0 ? req.body : "",
        query: req.query,
        params: req.params,
        headers: req.headers
    }
    log.info({ msg: "test info message", data }, req);
    next();
}

const secondMiddleware = (req, res, next) => {
    log.error({ msg: "error occured" }, req)
    log.warn("hey");
    res.status(400).send("error");
}

module.exports.firstMiddleware = firstMiddleware
module.exports.secondMiddleware = secondMiddleware
