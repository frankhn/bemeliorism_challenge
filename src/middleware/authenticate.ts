import { NextFunction } from 'express';
import { Request, Response } from '../../types/express';
import asyncHandler from './asyncHandler';
import translate from '../locales';

import { CustomError, responseWrapper } from '../helpers';
import { User } from '../database/models/user';
import { UNAUTHORIZED } from '../constants';
import { Preference } from '../database/models/preference';
import JwtToken from '../helpers/JWToken';

interface IDecoded {
  id: string;
  email: string
}

export const checkAuth = () =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { authorization, language }: any = req.headers;
    try {
      if (!authorization) {
        throw new CustomError(`${translate('UnAuthorizedAccess', language)}`, UNAUTHORIZED);
      }
      // // Validate token
      const tokenElements = authorization?.split(' ');
      const decoded: IDecoded = JwtToken.verifyToken(tokenElements[tokenElements?.length - 1]);

      if (!decoded.id) {
        throw new CustomError('Invalid or expired token', UNAUTHORIZED);
      }
      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
        include: [
          {
            model: Preference,
            as: "preferences"
          }
        ]
      });
      req.currentUser = user;
      req.body.userId = user.id
      next();
    } catch (error) {
      return responseWrapper({
        res,
        status: error.status || UNAUTHORIZED,
        message: error.message,
      });
    }
  });
