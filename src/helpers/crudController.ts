import { NextFunction, Response } from 'express';
import { Request } from '../../types/express';
import { OK, NO_CONTENT, NOT_FOUND } from '../constants';
import {
  asyncWrapper,
  responseWrapper,
  CustomError,
} from '../helpers';

interface IUnknownObject {
  [key: string]: any;
}
interface ModelProperties extends IUnknownObject {
  searchKeys?: string[];
  include?: IUnknownObject[];
}

export class MainController {
  model: any;
  modelProperties: ModelProperties;
  paramId: string;
  constructor(model, paramId, modelProperties = {}) {
    this.paramId = paramId;
    this.model = model;
    this.modelProperties = modelProperties;
    this.createOne = this.createOne.bind(this);
    this.getMany = this.getMany.bind(this);
    this.getById = this.getById.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.getRecordById = this.getRecordById.bind(this);
    this.checkRecordById = this.checkRecordById.bind(this);
  }
  /**
   * @param param0
   * @returns
   */
  public createOne(req: Request, res: Response) {
    const { body } = req;
    return asyncWrapper(res, async () => {
      const data = await this.model.create(body);
      return responseWrapper({
        res,
        message: 'Success',
        status: OK,
        data,
      });
    });
  }

  /**
   * @param param0
   * @returns
   */
  public getMany(req: Request, res: Response): Promise<Response> {
    return asyncWrapper(res, async () => {
      const data = await this.model.findAndCountAll({
        distinct: true,
        include: this.modelProperties.include || [],
        order: [
          ['id', 'DESC'],
          ['updatedAt', 'ASC'],
        ],
      });
      return responseWrapper({
        res,
        status: OK,
        message: 'Success',
        data,
      });
    });
  }
  /**
   * @param param0
   * @returns
   */
  public getById(req: Request, res: Response): Promise<Response> {
    const { params } = req;
    return asyncWrapper(res, async () => {
      const data = await this.getRecordById(params[this.paramId]);
      return responseWrapper({
        res,
        status: OK,
        message: 'Success',
        data,
      });
    });
  }

  /**
   * @param param0
   * @returns
   */
  public updateOne(req: Request, res: Response): Promise<Response> {
    const { body, params } = req;
    return asyncWrapper(res, async () => {
      const instance = await this.getRecordById(params[this.paramId]);
      await instance.update(body);
      return responseWrapper({
        res,
        status: OK,
        message: `Application:${params[this.paramId]} was successfully updated`,
        data: instance,
      });
    });
  }

  /**
   * @param param0
   * @returns
   */
  public deleteOne(req: Request, res: Response): Promise<Response> {
    const { params } = req;
    return asyncWrapper(res, async () => {
      const instance = await this.getRecordById(params[this.paramId]);
      await instance.destroy();

      return responseWrapper({
        res,
        status: NO_CONTENT,
        message: 'Success',
      });
    });
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public checkRecordById(req: Request, res: Response, next: NextFunction) {
    return asyncWrapper(res, async () => {
      const data = await this.model.findByPk(req.params.id, {
        include: this.modelProperties.include,
      });
      if (!data) {
        throw new CustomError('Record not found', NOT_FOUND);
      }
      req.currentRecord = data;
      return next();
    });
  }
  /**
   * @param id which is uuid
   * @returns model instance e.g: application
   */
  private async getRecordById(id: string) {
    const data = await this.model.findByPk(id, {
      include: this.modelProperties.include || undefined,
    });
    if (!data) {
      throw new CustomError('Record not found', NOT_FOUND);
    }
    return data;
  }

  public checkRecordName(req: any, res: Response, next: NextFunction): Promise<Response> {
    const { name } = req.query;
    return asyncWrapper(res, async () => {
      const data = await this.model.findOne({
        where: {
          name: name,
        },
        include: this.modelProperties.include || undefined,
      });
      if (!data) {
        throw new CustomError('Record not found', NOT_FOUND);
      }
      req.record = data;
      return next();
    });
  }
}
