import request from 'supertest';
import faker from 'faker';
import app from '../../../../app';
import { OK } from '../../../../constants';

const randomUser = () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    dateOfBirth: "10/03/1995",
    password: 'Test@123',
});

describe('TC003 - Login', () => {
    let user = randomUser();
    let token = '';

    test('TC001-1 - Users should be able to register', async () => {
        const res = await request(app)
            .post('/api/v1/auth/signup')
            .send(user);
        expect(res.status).toBe(OK);
        expect(res.body?.data.name).toBe(user.name);
    });

    test('TC001-2 - Users should be able to activate there accounts', async () => {
        const res = await request(app)
            .post('/api/v1/auth/verify')
            .send({
                email: user.email
            });
        expect(res.status).toBe(OK);
        expect(res.body?.message).toBeTruthy();
    });

    test('TC001-3 - Users should be able to login', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: user.email,
                password: user.password
            });
        expect(res.status).toBe(OK);
        expect(res.body?.data.name).toBe(user.name);
        expect(res.body?.token).toBeTruthy();
    });

});
