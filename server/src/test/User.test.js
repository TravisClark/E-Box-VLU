const request = require('supertest');
const app = require('../index');
const UserModel = require('../app/models/UserModel');

// describe('Unit test of Generate account when entering complete information', () => {
//     test('Status is 200', async () => {
//         const response = await request(app)
//             .post('/api/admin/user/add_user')
//             .send({
//                 username: '197pm77757',
//                 role_name: 'Sinh viên',
//             });

//         expect(response.statusCode).toBe(201);
//     });
//     test('Return format json', async () => {
//         const response = await request(app)
//             .post('/api/admin/user/add_user')
//             .send({
//                 username: '197pm74777',
//                 role_name: 'Sinh viên',
//             });

//         expect(response.type).toEqual('application/json');
//     });
//     test('Return message"Tạo tài khoản thành công"', async () => {
//         const response = await request(app)
//             .post('/api/admin/user/add_user')
//             .send({
//                 username: '197pm77877',
//                 role_name: 'Sinh viên',
//             });

//         expect(response.body).toEqual({ message: 'Tạo tài khoản thành công' });
//     });
// });

describe('Unit test of Generate account when the username data is empty', () => {
    test('Status is 401', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '',
                role_name: 'Sinh viên',
            });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '',
                role_name: 'Sinh viên',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message"Tài khoản không được bỏ trống"', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '',
                role_name: 'Sinh viên',
            });

        expect(response.body).toEqual({
            message: 'Tài khoản không được bỏ trống',
        });
    });
});

describe('Unit test of Generate account when entering the incorrect length of username', () => {
    //Unit test of check if the username length is less than 5
    test('Status is 411 when username is less than 5', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '1234',
                role_name: 'Sinh viên',
            });

        expect(response.statusCode).toBe(411);
    });
    test('Return format json when username is less than 5', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '1234',
                role_name: 'Sinh viên',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Độ dài tài khoản từ 5 đến 20 ký tự" when username is less than 5', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '1234',
                role_name: 'Sinh viên',
            });

        expect(response.body).toEqual({
            message: 'Độ dài tài khoản từ 5 đến 20 ký tự',
        });
    });

    //Unit test check if the new password length is more than 20
    test('Status is 411 when the username length is more than 20', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: 'VLU012345678910111213141516',
                role_name: 'Sinh viên',
            });

        expect(response.statusCode).toBe(411);
    });
    test('Return format json when the username length is more than 20', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: 'VLU012345678910111213141516',
                role_name: 'Sinh viên',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Độ dài tài khoản từ 5 đến 20 ký tự" when the username length is more than 20', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: 'VLU012345678910111213141516',
                role_name: 'Sinh viên',
            });

        expect(response.body).toEqual({
            message: 'Độ dài tài khoản từ 5 đến 20 ký tự',
        });
    });
});

describe('Unit test of Generate account when entering the wrong format of the username', () => {
    //Unit test of check username for correct format
    test('Status is 412', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '1234ac&&',
                role_name: 'Sinh viên',
            });

        expect(response.statusCode).toBe(412);
    });
    test('Return format json', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '1234ac&&',
                role_name: 'Sinh viên',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Tài khoản chỉ chứa định dạng chữ Alphabet và chữ số"', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '1234ac&&',
                role_name: 'Sinh viên',
            });

        expect(response.body).toEqual({
            message: 'Tài khoản chỉ chứa định dạng chữ Alphabet và chữ số',
        });
    });
});

describe('Unit test of Generate account when entering an existing account name', () => {
    //Unit test of check username unique
    test('Status is 405', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '197pm33529',
                role_name: 'Sinh viên',
            });

        expect(response.statusCode).toBe(405);
    });
    test('Return format json', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '197pm33529',
                role_name: 'Sinh viên',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Tài khoản đã tồn tại"', async () => {
        const response = await request(app)
            .post('/api/admin/user/add_user')
            .send({
                username: '197pm33529',
                role_name: 'Sinh viên',
            });

        expect(response.body).toEqual({ message: 'Tài khoản đã tồn tại' });
    });
});

// describe('Unit test of login when entering complete information', () => {
//     test('Status is 200', async () => {
//         const response = await request(app).post('/api/user/user/login').send({
//             username: '197pm77757',
//             password: 'VLU77757',
//         });

//         expect(response.statusCode).toBe(200);
//     });
//     test('Return format json', async () => {
//         const response = await request(app).post('/api/user/user/login').send({
//             username: '197pm77757',
//             password: 'VLU77757',
//         });

//         expect(response.type).toEqual('application/json');
//     });
//     test('Return data user', async () => {
//         const response = await request(app).post('/api/user/user/login').send({
//             username: '197pm77757',
//             password: 'VLU77757',
//         });

//         expect(response.text).toMatch('197pm77757');
//     });
// });

describe('Unit test of login when you enter the wrong request', () => {
    //Unit test of check username is null or ''
    test('Status is 401', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '',
            password: 'VLU77757',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '',
            password: 'VLU77757',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message "Tài khoản và mật khẩu không được bỏ trống"', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '',
            password: 'VLU77757',
        });

        expect(response.body).toEqual({
            message: 'Tài khoản và mật khẩu không được bỏ trống',
        });
    });
    //Unit test of check password is null or ''
    test('Status is 401', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm77757',
            password: '',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm77757',
            password: '',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message "Tài khoản và mật khẩu không được bỏ trống"', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm77757',
            password: '',
        });

        expect(response.body).toEqual({
            message: 'Tài khoản và mật khẩu không được bỏ trống',
        });
    });
});

describe('Unit test of login when entering wrong account information', () => {
    test('Status is 401', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm77757',
            password: 'VLU70000',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm77757',
            password: 'VLU70000',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message "Tài khoản hoặc mật khẩu không chính xác"', async () => {
        const response = await request(app).post('/api/user/user/login').send({
            username: '197pm77757',
            password: 'VLU70000',
        });

        expect(response.body).toEqual({
            message: 'Tài khoản hoặc mật khẩu không chính xác',
        });
    });
});

// describe('Unit test of change password when entering complete information', () => {
//     test('Status is 200', async () => {
//         const response = await request(app)
//             .patch('/api/user/user/change_password')
//             .send({
//                 username: '197pm77757',
//                 password: 'VLU77757',
//                 new_password: 'VLU77777',
//                 re_new_password: 'VLU77777',
//             });

//         expect(response.statusCode).toBe(201);
//     });
//     test('Return format json', async () => {
//         const response = await request(app)
//             .patch('/api/user/user/change_password')
//             .send({
//                 username: '197pm77757',
//                 password: 'VLU77777',
//                 new_password: 'VLU77757',
//                 re_new_password: 'VLU77757',
//             });

//         expect(response.type).toEqual('application/json');
//     });
//     test('Return message:"Thay đổi mật khẩu thành công"', async () => {
//         const response = await request(app)
//             .patch('/api/user/user/change_password')
//             .send({
//                 username: '197pm77757',
//                 password: 'VLU77757',
//                 new_password: 'VLU77777',
//                 re_new_password: 'VLU77777',
//             });

//         expect(response.body).toEqual({
//             message: 'Thay đổi mật khẩu thành công',
//         });
//     });
// });

describe('Unit test of change password when entering the wrong request of the old password', () => {
    jest.setTimeout(10000);
    //Unit test of check password is null or ''
    test('Status is 401 when password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: '',
                new_password: 'VLU77777',
                re_new_password: 'VLU77777',
            });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: '',
                new_password: 'VLU77777',
                re_new_password: 'VLU77777',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Mật khẩu cũ không được bỏ trống" when password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: '',
                new_password: 'VLU77777',
                re_new_password: 'VLU77777',
            });

        expect(response.body).toEqual({
            message: 'Mật khẩu cũ không được bỏ trống',
        });
    });

    //Unit test check if the password is correct or not
    test('Status is 412 when the password is correct or not', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'dsadsad',
                new_password: 'VLU77777',
                re_new_password: 'VLU77777',
            });

        expect(response.statusCode).toBe(412);
    });
    test('Return format json when the password is correct or not', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'dsadsad',
                new_password: 'VLU77777',
                re_new_password: 'VLU77777',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Mật khẩu cũ không chính xác" when the password is correct or not', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'dsadsad',
                new_password: 'VLU77777',
                re_new_password: 'VLU77777',
            });

        expect(response.body).toEqual({
            message: 'Mật khẩu cũ không chính xác',
        });
    });
});

describe('Unit test of change password when new password data or re-enter password is empty', () => {
    //Unit test of check if the new password is null or ''
    test('Status is 401 when new password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: '',
                re_new_password: 'VLU77770',
            });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when new password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: '',
                re_new_password: 'VLU77770',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Mật khẩu mới không được bỏ trống" when new password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: '',
                re_new_password: 'VLU77770',
            });

        expect(response.body).toEqual({
            message: 'Mật khẩu mới không được bỏ trống',
        });
    });

    //Unit test check if the re_new_password is null or ''
    test('Status is 401 when re_new_password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU77770',
                re_new_password: '',
            });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when re_new_password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU77770',
                re_new_password: '',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Xác nhận mật khẩu mới không được bỏ trống" when re_new_password is null', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU77770',
                re_new_password: '',
            });

        expect(response.body).toEqual({
            message: 'Xác nhận mật khẩu mới không được bỏ trống',
        });
    });
});

describe('Unit test of change password when entering the incorrect length of new password', () => {
    //Unit test of check if the new password length is less than 5
    test('Status is 411 when new password is less than 5', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU7',
                re_new_password: 'VLU77757',
            });

        expect(response.statusCode).toBe(411);
    });
    test('Return format json when new password is less than 5', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU7',
                re_new_password: 'VLU77757',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự" when new password is less than 5', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU7',
                re_new_password: 'VLU77757',
            });

        expect(response.body).toEqual({
            message: 'Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự',
        });
    });

    //Unit test check if the new password length is more than 20
    test('Status is 411 when the new password length is more than 20', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU012345678910111213141516',
                re_new_password: 'VLU77757',
            });

        expect(response.statusCode).toBe(411);
    });
    test('Return format json when the new password length is more than 20', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU012345678910111213141516',
                re_new_password: 'VLU77757',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự" when the new password length is more than 20', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU012345678910111213141516',
                re_new_password: 'VLU77757',
            });

        expect(response.body).toEqual({
            message: 'Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự',
        });
    });
});

describe('Unit test of change password when the new password is not in the correct format', () => {
    //Unit test of check the new password for correct format
    test('Status is 405 when the new password for correct format', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU7**77',
                re_new_password: 'VLU77777',
            });

        expect(response.statusCode).toBe(405);
    });
    test('Return format json when the new password for correct format', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU7**77',
                re_new_password: 'VLU77777',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Mật khẩu mới chỉ chứa định dạng chữ Alphabet và chữ số" when the new password for correct format', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU7**77',
                re_new_password: 'VLU77777',
            });

        expect(response.body).toEqual({
            message: 'Mật khẩu mới chỉ chứa định dạng chữ Alphabet và chữ số',
        });
    });
});

describe('Unit test of change password when the new password and re-entering the password do not match', () => {
    //Unit test of check if new password matches re-enter password
    test('Status is 405 when new password not matches re-enter password', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU77777',
                re_new_password: 'VLU11111',
            });

        expect(response.statusCode).toBe(405);
    });
    test('Return format json when new password not matches re-enter password', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU77777',
                re_new_password: 'VLU11111',
            });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Mật khẩu mới và xác minh mật khẩu không trùng khớp. Vui lòng kiểm tra lại" when new password not matches re-enter password', async () => {
        const response = await request(app)
            .patch('/api/user/user/change_password')
            .send({
                username: '197pm33529',
                password: 'VLU33529',
                new_password: 'VLU77777',
                re_new_password: 'VLU11111',
            });

        expect(response.body).toEqual({
            message:
                'Mật khẩu mới và xác minh mật khẩu không trùng khớp. Vui lòng kiểm tra lại',
        });
    });
});

describe('Unit Tests of View and search accounts function when the user does not pass the query', () => {
    test('Status is 200', async () => {
        const response = await request(app).get('/api/admin/user/list_users');

        expect(response.statusCode).toBe(200);
    });
    test('Return format json', async () => {
        const response = await request(app).get('/api/admin/user/list_users');

        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app).get('/api/admin/user/list_users');
        const users = await UserModel.find({});
        expect(response.body.length).toEqual(users.length);
    });
});

describe('Unit Tests of View and search accounts function when the user passes the query', () => {
    test('Status is 201', async () => {
        const response = await request(app)
            .get('/api/admin/user/list_users')
            .query({ username: '197' });

        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app)
            .get('/api/admin/user/list_users')
            .query({ username: '197' });

        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app)
            .get('/api/admin/user/list_users')
            .query({ username: '197' });

        const users = await UserModel.find({});
        //Tạo 2 biến để sử lý mảng
        const list_users = [];
        //Lọc các username theo ký tự được nhận
        for (var i = 0; i < users.length; i++) {
            if (users[i].username.indexOf('197') !== -1) {
                list_users[i] = users[i];
            }
        }
        //Xóa các mảng bị null
        var dem = 0;
        for (var i = 0; i < list_users.length; i++) {
            if (list_users[i] === null || list_users[i] === undefined) {
                await list_users.splice(i - dem, 1);
                dem = dem + 1;
            }
        }
        expect(response.body.length).toEqual(list_users.length);
    });
});

describe('Unit Tests of View account detail function', () => {
    test('Status is 200', async () => {
        const response = await request(app)
            .get('/api/admin/user/details_user')
            .query({ username: '197pm33529' });

        expect(response.statusCode).toBe(200);
    });
    test('Return format json', async () => {
        const response = await request(app)
            .get('/api/admin/user/details_user')
            .query({ username: '197pm33529' });

        expect(response.type).toEqual('application/json');
    });
    test('Return selected username', async () => {
        const response = await request(app)
            .get('/api/admin/user/details_user')
            .query({ username: '197pm33529' });

        const information = await UserModel.findOne({
            username: '197pm33529',
        });
        expect(response.body.username).toEqual(information.username);
    });
});

// describe('Unit Tests of Deactivate account function', () => {
//     test('Status is 200', async () => {
//         const response = await request(app)
//             .patch('/api/admin/user/deactivate_user')
//             .send({ username: '197pm33529' });

//         expect(response.statusCode).toBe(200);
//     });
//     test('Return format json', async () => {
//         const response = await request(app)
//             .patch('/api/admin/user/deactivate_user')
//             .send({ username: '197pm33529' });

//         expect(response.type).toEqual('application/json');
//     });
//     test('Return message:"Vô hiệu hóa tài khoản thành công"', async () => {
//         const response = await request(app)
//             .patch('/api/admin/user/deactivate_user')
//             .send({ username: '197pm33529' });

//         expect(response.body).toEqual({message: 'Vô hiệu hóa tài khoản thành công'});
//     });
// });

describe('Unit Tests of change account information function', () => {
    test('Status is 200', async () => {
        const response = await request(app)
            .patch('/api/admin/user/change_user_information')
            .send({ username: '197pm33529', password: 'VLU33529', role: 'Sinh viên' });

        expect(response.statusCode).toBe(200);
    });
    test('Return format json', async () => {
        const response = await request(app)
            .patch('/api/admin/user/change_user_information')
            .send({ username: '197pm33529', password: 'VLU33529', role: 'Sinh viên' });

        expect(response.type).toEqual('application/json');
    });
    test('Return message:"Chỉnh sửa thông tin tài khoản thành công"', async () => {
        const response = await request(app)
            .patch('/api/admin/user/change_user_information')
            .send({ username: '197pm33529', password: 'VLU33529', role: 'Sinh viên' });

        expect(response.body).toEqual({message: 'Chỉnh sửa thông tin tài khoản thành công'});
    });
});