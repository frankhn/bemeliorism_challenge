import { NextFunction } from 'express';
import { Request, Response } from '../../../../types/express';
import { BAD_REQUEST, OK } from '../../../constants';
import { Preference } from '../../../database/models/preference';
import { asyncWrapper, responseWrapper } from '../../../helpers';
import { MainController } from '../../../helpers/crudController';


export class PreferenceController extends MainController {
    constructor() {
        super(Preference, 'id');
    }

    public getMany(req: Request, res: Response) {
        const { currentUser } = req
        return asyncWrapper(res, async () => {
            const preferences = await Preference.findAll({ where: { userId: currentUser.id } })
            return responseWrapper({
                res,
                status: OK,
                data: preferences,
            });
        });
    }
}

export default new PreferenceController();
