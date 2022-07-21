import { Model } from 'sequelize';
import { Request as RequestType, Response as ResponseType } from 'express';
import { User } from '../../src/database/models/member';

export interface Request extends RequestType {
  currentUser?: User;
  model?: Model;
  idParamValue?: string;
  [index: string]: any;
}

export type Response = ResponseType;
