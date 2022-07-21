import { NextFunction } from 'express';
import { Request, Response } from '../../../../types/express';
import { BAD_REQUEST, OK } from '../../../constants';
import { Preference } from '../../../database/models/preference';
import { asyncWrapper, responseWrapper } from '../../../helpers';
import { MainController } from '../../../helpers/crudController';


export class PreferenceController extends MainController {
    constructor() {
        super(Preference, 'id', {});
    }

    public getMany(req: Request, res: Response) {
        const { currentUser } = req
        return asyncWrapper(res, async () => {
            const user = await Preference.findAll({ where: { userId: currentUser.id } })
            if (!user) {
                return responseWrapper({
                    res,
                    status: BAD_REQUEST,
                    message: 'Invalid Request',
                });
            }
            return responseWrapper({
                res,
                status: OK,
                data: Preference,
            });
        });
    }
}

export default new PreferenceController();
