const winston = require('winston')

function getLogger(module) {
    let path = module.filename.split('/').slice(-2).join('/')

    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'debug',
                label: path
            }),
            new (winston.transports.File) ({
                filename: 'node.log',
                label: path,
                colorize: true
            })
        ]
    })
}

module.exports = getLogger




// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),
//     defaultMeta: { service: 'user-service' },
//     transports: [
//         //
//         // - Write all logs with level `error` and below to `error.log`
//         // - Write all logs with level `info` and below to `combined.log`
//         //
//         new winston.transports.File({ filename: 'error.log', level: 'error' }),
//         new winston.transports.File({ filename: 'combined.log' }),
//     ],
// })
//
// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (!(process.env.NODE_ENV !== 'production')) {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }))
// }

