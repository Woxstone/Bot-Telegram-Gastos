const logger = jest.fn();

logger.info = jest.fn();
logger.error = jest.fn();

export { logger }