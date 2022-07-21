import { isCelebrate, CelebrateInternalError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from '../constants/statusCodes';
import { responseWrapper } from '../helpers';

export default () =>
  (error: CelebrateInternalError, _req: Request, res: Response, next: NextFunction) => {
    if (!isCelebrate(error)) return next(error);
    return responseWrapper({
      res,
      status: BAD_REQUEST,
      message: error.joi.name || 'Validation error',
      error: {
        message: error.joi.name || undefined,
        errors: error.joi.details.map((item) => ({
          ...item,
          ...item.context,
          context: undefined,
        })),
      },
    });
  };
