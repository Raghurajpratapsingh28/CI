import { createLogger, format, transports, Logger } from 'winston';
import path from 'path';
import type Transport from 'winston-transport';
import { config } from './config';

const isProduction = config.node_env === 'production';

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
    })
);

const loggerTransports: Transport[] = [
    new transports.Console({
        format: format.combine(
            format.colorize(),
            format.printf(({ timestamp, level, message, stack }) => {
                return `[${timestamp}] ${level}: ${stack || message}`;
            })
        ),
    }),
];

if (isProduction) {
    loggerTransports.push(
        new transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
        }),
        new transports.File({
            filename: path.join('logs', 'combined.log'),
        })
    );
}

const logger: Logger = createLogger({
    level: isProduction ? 'info' : 'debug',
    format: logFormat,
    transports: loggerTransports,
    exitOnError: false,
});

export default logger;
