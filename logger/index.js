const log4js = require('log4js');
const fs = require('fs');
const dir = '../logs';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
}

const checkForLevel = () => {
    return (process.env.sunbird_content_service_logging_level || 'trace')
}

var isLoggerEnabled = function () {
    var loggerEnabled = process.env.sunbird_content_service_enable_logging
    return (loggerEnabled !== undefined && loggerEnabled === 'true')
}

var processLogObject = (data, request) => {
    if (request && data) {
        return {
            id: request.id,
            info: {
                path: request.route.path,
                method: request.method,
                data
            }
        }
    } else {
        return { data }
    }
}

log4js.configure({
    appenders: {
        console: {
            'type': 'console'
        },
        everything: {
            'type': 'file',
            'maxLogSize': 26214400,
            'filename': 'logs/all-logs.log'
        },
        errors: {
            'type': 'file',
            'maxLogSize': 26214400,
            'filename': 'logs/errors.log'
        },
        all_errors: {
            'type': 'logLevelFilter',
            'appender': 'errors',
            'level': 'error'
        }
    },
    categories: {
        default: { appenders: ['console', 'all_errors', 'everything'], level: checkForLevel() }
    }
});

const logger = log4js.getLogger('api');

var info = function (data, request) {
    if (data && isLoggerEnabled()) {
        logger.info(JSON.stringify(processLogObject(data, request)))
    }
}
var debug = function (data, request) {
    if (data && isLoggerEnabled()) {
        logger.debug(JSON.stringify(processLogObject(data, request)))
    }
}

var fatal = function (data, request) {
    if (data && isLoggerEnabled()) {
        logger.fatal(JSON.stringify(processLogObject(data, request)))
    }
}

var mark = function (data, request) {
    if (data && isLoggerEnabled()) {
        logger.mark(JSON.stringify(processLogObject(data, request)))
    }
}

var error = function (data, request) {
    if (data && isLoggerEnabled()) {
        logger.error(JSON.stringify(processLogObject(data, request)))
    }
}

var warn = function (data, request) {
    if (data && isLoggerEnabled()) {
        logger.warn(JSON.stringify(processLogObject(data, request)))
    }
}

var trace = function (data, request) {
    if (data && isLoggerEnabled()) {
        logger.trace(JSON.stringify(processLogObject(data, request)))
    }
}

module.exports = {
    info,
    error,
    warn,
    trace,
    debug,
    mark,
    fatal,
    logger
}




