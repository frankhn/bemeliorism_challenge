import { User } from '../../../database/models/user';
import { Preference } from '../../../database/models/preference';
import { MainController } from '../../../helpers/crudController';
import { asyncWrapper, randomString, responseWrapper } from '../../../helpers';
import { BAD_REQUEST, NOT_FOUND, OK } from '../../../constants';
import { Request, Response } from '../../../../types/express';
import JwtToken from '../../../helpers/JWToken';
import Encrypt from '../../../helpers/encryption';


export const USER_INCLUDE_MODELS = () => [
    {
        model: Preference,
        as: 'preferences',
    },
];
export class UserController extends MainController {
    constructor() {
        super(User, 'id', {
            include: USER_INCLUDE_MODELS(),
        });
    }

    public login(req: Request, res: Response) {
        const { body: { email, password } } = req
        return asyncWrapper(res, async () => {
            const user = await User.findOne({ where: { email } })
            if (!user || !Encrypt.decrypt(password, user.password)) {
                return responseWrapper({
                    res,
                    status: BAD_REQUEST,
                    message: 'Invalid credentials',
                });
            }
            if (!user.verified) responseWrapper({
                res,
                status: BAD_REQUEST,
                message: 'Account not verified',
            });
            const token = JwtToken.generateToken({
                id: user.id,
                name: user.name
            });
            return responseWrapper({
                res,
                status: OK,
                message: 'Success',
                data: user,
                token
            });
        });
    }

    public forgotpassword(req: Request, res: Response) {
        const { body: { email } } = req
        return asyncWrapper(res, async () => {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return responseWrapper({
                    res,
                    status: NOT_FOUND,
                    message: 'User not found',
                });
            }
            const verificationCode = randomString()
            user.verificationCode = verificationCode
            await user.save()

            return responseWrapper({
                res,
                status: OK,
                message: 'Success',
                data: {
                    verificationCode
                },
            });
        });
    }

    public resetPassword(req: Request, res: Response) {
        const { body: { email, password, verificationCode } } = req
        return asyncWrapper(res, async () => {
            const user = await User.findOne({ where: { email, verificationCode } })
            if (!user) {
                return responseWrapper({
                    res,
                    status: BAD_REQUEST,
                    message: 'Invalid Request',
                });
            }
            user.password = Encrypt.encrypt(password)
            user.verificationCode = null
            await user.save()
            return responseWrapper({
                res,
                status: OK,
                message: 'Password Update successfully',
                data: user,
            });
        });
    }


    public activateAccount(req: Request, res: Response) {
        const { body: { email } } = req
        return asyncWrapper(res, async () => {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return responseWrapper({
                    res,
                    status: BAD_REQUEST,
                    message: 'Invalid Request',
                });
            }
            user.verified = true
            await user.save()
            return responseWrapper({
                res,
                status: OK,
                message: 'Account verified successfully',
                data: user,
            });
        });
    }
}

export default new UserController();
