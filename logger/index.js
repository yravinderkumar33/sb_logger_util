const log4js = require('log4js');
const fs = require('fs');
let dir = '../logs';
let isLoggerEnabled = true;
let logLevel = 'error';
let logInit = false;

const init = (level, status, directory) => {
    logLevel = level ? level : logLevel;
    isLoggerEnabled = status ? status : isLoggerEnabled;
    dir = directory ? directory : dir;

    if (dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    log4js.configure({
        appenders: {
            console: {
                'type': 'console'
            },
            everything: {
                'type': 'file',
                'maxLogSize': 26214400,
                'filename': `${dir}/microserviceLogs.log`
            },
            errors: {
                'type': 'file',
                'maxLogSize': 26214400,
                'filename': `${dir}/errors.log`
            },
            all_errors: {
                'type': 'logLevelFilter',
                'appender': 'errors',
                'level': 'error'
            }
        },
        categories: {
            default: { appenders: ['console', 'all_errors', 'everything'], level: logLevel }
        }
    });

    logInit = true;
}

var processRequest = (request) => {
    return {
        id: request.id,
        path: request.route.path,
        method: request.method
    }
}

const logger = log4js.getLogger('api');

var info = function (data, request) {
    if (logInit && isLoggerEnabled) {
        logger.info(JSON.stringify({ ...processRequest(request), ...data }))
    }
}

var debug = function (data, request) {
    if (logInit && isLoggerEnabled) {
        logger.debug(JSON.stringify({ ...processRequest(request), ...data }))
    }
}

var fatal = function (data, request) {
    if (logInit && isLoggerEnabled) {
        logger.fatal(JSON.stringify({ ...processRequest(request), ...data }))
    }
}

var mark = function (data, request) {
    if (logInit && isLoggerEnabled) {
        logger.mark(JSON.stringify({ ...processRequest(request), ...data }))
    }
}

var error = function (data, request) {
    if (logInit && isLoggerEnabled) {
        logger.error(JSON.stringify({ ...processRequest(request), ...data }))
    }
}

var warn = function (data, request) {
    if (logInit && isLoggerEnabled) {
        logger.warn(JSON.stringify({ ...processRequest(request), ...data }))
    }
}

var trace = function (data, request) {
    if (logInit && isLoggerEnabled) {
        logger.trace(JSON.stringify({ ...processRequest(request), ...data }))
    }
}

module.exports = {
    info, error, warn, trace, debug, mark, fatal, logger, init
}
