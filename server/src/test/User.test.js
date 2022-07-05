const request = require('supertest');
const app = require('../index');

describe('Unit test of login when entering complete information', () => {
    test('Status is 200', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm11111',
            password: 'VLU11111',
        });

        expect(response.statusCode).toBe(200);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm11111',
            password: 'VLU11111',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return data user', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm11111',
            password: 'VLU11111',
        });

        expect(response.text).toMatch('197pm11111');
    });
});

describe('Unit test of login when you enter the wrong request', () => {
    test('Status is 401', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '',
            password: 'VLU11111',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '',
            password: 'VLU11111',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return err "Tài khoản và mật khẩu không được bỏ trống"', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '',
            password: 'VLU11111',
        });

        expect(response.text).toMatch(
            'Tài khoản và mật khẩu không được bỏ trống',
        );
    });
});

describe('Unit test of login when entering wrong account information', () => {
    test('Status is 401', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm11111',
            password: 'VLU11110',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm11111',
            password: 'VLU11110',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return err "Tài khoản hoặc mật khẩu không chính xác"', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm11111',
            password: 'VLU11110',
        });

        expect(response.text).toMatch(
            'Tài khoản hoặc mật khẩu không chính xác',
        );
    });
});

describe('Unit test of change password when entering complete information', () => {
    test('Status is 200', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return Message"Thay đổi mật khẩu thành công"', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU22222',
                new_password: 'VLU11111',
                re_new_password: 'VLU11111',
            });

        expect(response.text).toMatch('Thay đổi mật khẩu thành công');
    });
});

describe('Unit test of change password when entering the wrong request of the old password', () => {
    //Unit test of check password is null or ''
    test('Status is 401 when password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: '',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: '',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Mật khẩu cũ không được bỏ trống" when password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: '',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.text).toMatch('Mật khẩu cũ không được bỏ trống');
    });

    //Unit test check if the password is correct or not
    test('Status is 412 when the password is correct or not', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU12345',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.statusCode).toBe(412);
    });
    test('Return format json when the password is correct or not', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU12345',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Mật khẩu cũ không chính xác" when the password is correct or not', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU12345',
                new_password: 'VLU22222',
                re_new_password: 'VLU22222',
            });

        expect(response.text).toMatch('Mật khẩu cũ không chính xác');
    });
});

describe('Unit test of change password when new password data or re-enter password is empty when new password data or re-enter password is empty ', () => {
    //Unit test of check if the new password is null or ''
    test('Status is 401 when new password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: '',
                re_new_password: 'VLU22222',
            });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when new password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: '',
                re_new_password: 'VLU22222',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Mật khẩu mới không được bỏ trống" when new password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: '',
                re_new_password: 'VLU22222',
            });

        expect(response.text).toMatch('Mật khẩu mới không được bỏ trống');
    });

    //Unit test check if the re_new_password is null or ''
    test('Status is 401 when re_new_password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: '',
            });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when re_new_password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: '',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Xác nhận mật khẩu mới không được bỏ trống" when re_new_password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: '',
            });

        expect(response.text).toMatch(
            'Xác nhận mật khẩu mới không được bỏ trống',
        );
    });
});

describe('Unit test of change password when entering the incorrect length of new password', () => {
    //Unit test of check if the new password length is less than 5
    test('Status is 411 when new password is less than 5', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU1',
                re_new_password: 'VLU22222',
            });

        expect(response.statusCode).toBe(411);
    });
    test('Return format json when new password is less than 5', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU1',
                re_new_password: 'VLU22222',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự" when new password is less than 5', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU1',
                re_new_password: 'VLU22222',
            });

        expect(response.text).toMatch(
            'Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự',
        );
    });

    //Unit test check if the new password length is more than 20
    test('Status is 411 when the new password length is more than 20', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU012345678910111213141516',
                re_new_password: 'VLU22222',
            });

        expect(response.statusCode).toBe(411);
    });
    test('Return format json when the new password length is more than 20', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU012345678910111213141516',
                re_new_password: 'VLU22222',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự" when the new password length is more than 20', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU012345678910111213141516',
                re_new_password: 'VLU22222',
            });

        expect(response.text).toMatch(
            'Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự',
        );
    });
});

describe('Unit test of change password when the new password is not in the correct format', () => {
    //Unit test of check the new password for correct format
    test('Status is 405 when the new password for correct format', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU1***12',
                re_new_password: 'VLU22222',
            });

        expect(response.statusCode).toBe(405);
    });
    test('Return format json when the new password for correct format', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU1***12',
                re_new_password: 'VLU22222',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Mật khẩu mới chỉ chứa định dạng chữ Alphabet và chữ số" when the new password for correct format', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU1***12',
                re_new_password: 'VLU22222',
            });

        expect(response.text).toMatch(
            'Mật khẩu mới chỉ chứa định dạng chữ Alphabet và chữ số',
        );
    });
});

describe('Unit test of change password when the new password and re-entering the password do not match', () => {
    //Unit test of check if new password matches re-enter password
    test('Status is 405 when new password not matches re-enter password', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: 'VLU22220',
            });

        expect(response.statusCode).toBe(405);
    });
    test('Return format json when new password not matches re-enter password', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: 'VLU22220',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return err:"Mật khẩu mới và xác minh mật khẩu không trùng khớp. Vui lòng kiểm tra lại" when new password not matches re-enter password', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm11111',
                password: 'VLU11111',
                new_password: 'VLU22222',
                re_new_password: 'VLU22220',
            });

        expect(response.text).toMatch(
            'Mật khẩu mới và xác minh mật khẩu không trùng khớp. Vui lòng kiểm tra lại',
        );
    });
});
