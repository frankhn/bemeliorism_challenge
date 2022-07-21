import { Response } from 'express';
import { BAD_REQUEST } from '../constants';
import { logger } from '../services/logger.service';
import { responseWrapper } from './responseWrapper';

export const asyncWrapper = async (res: Response, fn: () => void) => {
  try {
    await fn();
  } catch (error) {
    logger.error(error.message, error.errors || error.error || error);
    return responseWrapper({
      res,
      status: error.status || BAD_REQUEST,
      message: error.message,
      error: error.errors || error.error || error,
    });
  }
};

export const asyncWrapperNoResponse = async (fn: () => void) => {
  try {
    await fn();
  } catch (error) {
    logger.error(error.message, error);
  }
};
