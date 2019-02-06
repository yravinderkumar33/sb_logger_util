const log4js = require('log4js');
const fs = require('fs');

let filePath;
let isLoggerEnabled;
let logLevel
let loggerInit = false;
const defaultConfig = {
    dir: '../logs',
    isLoggerEnabled: true,
    logLevel: 'error'
}

const init = (config = defaultConfig) => {
    logLevel = config.logLevel || defaultConfig.logLevel;
    isLoggerEnabled = config.isLoggerEnabled !== undefined ? config.isLoggerEnabled : defaultConfig.isLoggerEnabled;
    filePath = config.dir || defaultConfig.dir;

    if (filePath && !fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
    }

    log4js.configure({
        appenders: {
            console: {
                'type': 'console'
            },
            logs: {
                'type': 'file',
                'maxLogSize': 26214400,
                'filename': `${filePath}/microserviceLogs.log`
            }
        },
        categories: {
            default: { appenders: ['console', 'logs'], level: logLevel }
        }
    });
    loggerInit = true;
}

var processRequestObject = (request) => {
    if (request) {
        return {
            id: request.id,
            path: request.route.path,
            method: request.method
        }
    } else {
        return {}
    }
}

const logger = log4js.getLogger('api');

var info = function (data, request) {
    if (loggerInit && isLoggerEnabled) {
        logger.info(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var debug = function (data, request) {
    if (loggerInit && isLoggerEnabled) {
        logger.debug(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var fatal = function (data, request) {
    if (loggerInit && isLoggerEnabled) {
        logger.fatal(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var mark = function (data, request) {
    if (loggerInit && isLoggerEnabled) {
        logger.mark(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var error = function (data, request) {
    if (loggerInit && isLoggerEnabled) {
        logger.error(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var warn = function (data, request) {
    if (loggerInit && isLoggerEnabled) {
        logger.warn(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

var trace = function (data, request) {
    if (loggerInit && isLoggerEnabled) {
        logger.trace(JSON.stringify({ ...processRequestObject(request), ...data }))
    }
}

module.exports = {
    info, error, warn, trace, debug, mark, fatal, logger, init
}
