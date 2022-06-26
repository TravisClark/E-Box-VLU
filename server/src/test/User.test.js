const request = require('supertest');
const UserModel = require('../app/models/UserModel');
const app = require('../index');


describe('list user route', () => {
    test('Status is 200', async () => {
        const response = await request(app).get("/api/user/list_users")

        expect(response.status).toBe(200);
    });

    test('Return format json', async () => {
        const response = await request(app).get("/api/user/list_users")

        expect(response.type).toEqual('application/json');
    });
})

describe('nhập đầy đủ thông tin', () => {
    test('Status is 201', async () => {
        const response = await request(app).post("/api/user/add_user").send({
            username: '197pm38515',
            role_name: 'Trợ lý'
        });

        expect(response.statusCode).toBe(201);
    });
    // test('Return format json', async () => {
    //     const response = await request(app).post("/api/user/add_user").send({
    //         username: '197pm33521',
    //         role: 'Trợ lý'
    //     });

    //     expect(response.type).toEqual('application/json');
    // });
//     // test('Status is 200', async () => {
//     //     const response = await request(app).post("/api/user/add_user").send({
//     //         username: '197pm33521',
//     //         role: 'Trợ lý'
//     //     });

//     //     expect(response.text).toEqual({Message: 'Tao tai khoan thanh cong'});
//     // });
})

// // describe('add user route', () => {
// //     test('Status is 200', async () => {
// //         const response = await request(app).post("/api/user/add_user").send({
// //             username: '197pm33521',
// //             role: 'Trợ lý'
// //         });

// //         expect(response.status).toBe(200);
// //     });

// //     test('Status is 401', async () => {
// //         const response = await request(app).post("/api/user/add_user").send({
            
// //             role: 'Trợ lý'
// //         });

// //         expect(response.status).toBe(401);
// //     });
// // })