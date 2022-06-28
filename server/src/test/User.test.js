const request = require('supertest');
const UserModel = require('../app/models/UserModel');
const app = require('../index');

describe('Unit test of login when entering complete information', () => {
    test('Status is 201', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '197pm11111',
            password: 'VLU11111'
        });

        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '197pm11111',
            password: 'VLU11111'
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return data user', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '197pm11111',
            password: 'VLU11111'
        });

        expect(response.text).toMatch('197pm11111')
    });
})

describe('Unit test of login when you enter the wrong request', () => {
    test('Status is 401', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '',
            password: 'VLU11111'
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '',
            password: 'VLU11111'
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return err "Tài khoản và mật khẩu không được bỏ trống"', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '',
            password: 'VLU11111'
        });

        expect(response.text).toMatch('Tài khoản và mật khẩu không được bỏ trống')
    });
})

describe('Unit test of login when entering wrong account information', () => {
    test('Status is 401', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '197pm11111',
            password: 'VLU11110'
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '197pm11111',
            password: 'VLU11110'
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return err "Tài khoản hoặc mật khẩu không chính xác"', async () => {
        const response = await request(app).post("/api/user/login").send({
            username: '197pm11111',
            password: 'VLU11110'
        });

        expect(response.text).toMatch('Tài khoản hoặc mật khẩu không chính xác')
    });
})

describe('Unit test of change password when entering complete information', () => {
    test('Status is 200', async () => {
        const response = await request(app).put("/api/user/change_password").send({
            username: '197pm11111',
            password: 'VLU11111',
            new_password: 'VLU22222',
            re_new_password: 'VLU22222',
        });

        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app).put("/api/user/change_password").send({
            username: '197pm11111',
            password: 'VLU11111',
            new_password: 'VLU22222',
            re_new_password: 'VLU22222',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return Message"Thay đổi mật khẩu thành công"', async () => {
        const response = await request(app).put("/api/user/change_password").send({
            username: '197pm11111',
            password: 'VLU22222',
            new_password: 'VLU11111',
            re_new_password: 'VLU11111',
        });

        expect(response.text).toMatch('Thay đổi mật khẩu thành công')
    });
})