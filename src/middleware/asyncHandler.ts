import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from '../constants';
import { responseWrapper } from '../helpers';

export default (cb: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      await cb(req, res, next);
    } catch (err) {
      return responseWrapper({
        res,
        status: err.statusCodes || BAD_REQUEST,
        error: {
          message: err.message,
          ...err,
        },
      });
    }
  };
