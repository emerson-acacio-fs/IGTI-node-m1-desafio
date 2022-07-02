import winston from 'winston'
import 'winston-daily-rotate-file'

const myLoggerFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
  },
)
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.DailyRotateFile({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
  format: winston.format.combine(
    winston.format.label({ label: 'my-app' }),
    winston.format.timestamp(),
    myLoggerFormat,
  ),
})
