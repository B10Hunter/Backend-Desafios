import winston from 'winston';

const customLevelsOptions = {
    levels:{
        fatal:0,
        error:1,
        warnig:2,
        info:3,
        debug:4,
    }
}
const logger = winston.createLogger({
    level:customLevelsOptions,
    transports:[
        new winston.transports.Console({
            level:"info"
        }),
        new winston.transports.File({filename:'./errors.log',level:'error'}),
        new winston.transports.File({filename:'./warn.log',level:'warnig'})
    ]
})
export const addLogger = (req,res,next) =>{
    req.logger = logger ;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}` )
    next();
}