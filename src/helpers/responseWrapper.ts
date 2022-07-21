import { Response } from 'express';
import { isEmpty } from 'lodash';

interface IUnknownObject {
  [key: string]: any;
}

interface IJsonResponse {
  res: Response;
  status?: number;
  message?: string;
  data?: IUnknownObject | IUnknownObject[];
  error?: IUnknownObject;
  [index: string]: any
}
/**
 *
 * @param param0
 * @returns
 */

export const responseWrapper = ({
  res,
  status = 200,
  message,
  data,
  error = {},
  ...rest
}: IJsonResponse) => {
  if (isEmpty(error)) {
    return res.status(status).json({
      status,
      message,
      data,
      ...rest
    });
  }
  return res.status(status).json({
    status,
    message,
    error,
  });
};
