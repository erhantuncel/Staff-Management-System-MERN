import "dotenv/config";
import winston from "winston";

const alignedWithColorsAndTime = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss.SSS" }),
    winston.format.align(),
    winston.format.printf((info) => {
        const text = `[${info.timestamp}] ${info.level.toUpperCase()}: ${
            info.message
        }`;
        return info.stack ? text + `\n` + info.stack : text;
    }),
    winston.format.colorize({ all: true })
);

winston.addColors({
    info: "black",
    warn: "green",
    error: "red",
    debug: "bold yellow",
});

const logger = winston.createLogger({
    level: "debug",
    format: alignedWithColorsAndTime,
    exitOnError: false,
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
    rejectionHandlers: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === "production") {
    logger.clear().add(
        new winston.transports.File({
            filename: "error.log",
            level: "info",
        })
    );
    logger.exceptions.handle(
        new winston.transports.File({
            filename: "exceptions.log",
            level: "error",
        })
    );
    logger.rejections.handle(
        new winston.transports.File({
            filename: "rejections.log",
            level: "error",
        })
    );
}

export default logger;
