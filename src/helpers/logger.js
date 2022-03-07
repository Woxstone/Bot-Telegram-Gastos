import  winston  from 'winston';
import 'dotenv/config';


const logger = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: process.env.DATA_FILE_LOGGER})
    ]
  });

export { logger } 