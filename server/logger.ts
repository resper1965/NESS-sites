import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

const logsDir = path.resolve(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const loggerTransports = [new transports.Console({ level: 'info' })];

if (process.env.LOG_TO_FILE === 'true') {
  loggerTransports.push(
    new transports.File({ filename: path.join(logsDir, 'app.log'), level: 'info' })
  );
}

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
  ),
  transports: loggerTransports,
});

export default logger;
