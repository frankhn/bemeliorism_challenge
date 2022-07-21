import jwt from 'jsonwebtoken';
import 'dotenv/config';

export type IUnknownObject = {
    [key: string]: any;
};
const { SECRETKEY } = process.env;
/**
 * @author frank harerimana
 */
export default class JwtToken {
    /**
   * @param {*} email
   * @returns {*} registration token
   */
    public static generateToken(payload: IUnknownObject): string {
        return jwt.sign(payload, `${SECRETKEY}`, { expiresIn: '24h' });
    }

    /**
   *
   * @param token string
   */
    public static verifyToken(token: string): any {
        try {
            const decoded: any = jwt.verify(token, `${SECRETKEY}`);
            return decoded;
        } catch (error) {
            return false;
        }
    }
}
