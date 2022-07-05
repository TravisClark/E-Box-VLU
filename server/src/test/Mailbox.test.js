const request = require('supertest');
const app = require('../index');
const Mailbox = require('../app/models/MailboxModel');

/*describe('Unit test of publish question when entering complete information', () => {
    test('Status is 201', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.text).toMatch('Đặt câu hỏi thành công');
    });
});*/

/*describe('Unit test of publish question when leave the question type or question blank', () => {
    //Unit test of check type_name is null or ''
    test('Status is 401 when type_name is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: '',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when type_name is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: '',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return data user when type_name is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: '',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.text).toMatch('Vui lòng chọn loại câu hỏi');
    });
    //Unit test of check question is null or ''
    test('Status is 401 when type_name is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: '',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when type_name is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: '',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return data user when type_name is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: '',
        });

        expect(response.text).toMatch('Vui lòng nhập câu hỏi');
    });
});*/

/*describe('Unit test of view questions list function', () => {
    test('Status is 200', async () => {
        const response = await request(app).get('/api/admin/mailbox/list_questions_admin').query({status: 'Đã được duyệt'})

        expect(response.statusCode).toBe(200);
    });
    test('Return format json', async () => {
        const response = await request(app).get('/api/admin/mailbox/list_questions_admin').query({status: 'Đã được duyệt'})

        expect(response.type).toEqual('application/json');
    });
});*/

/*describe('Unit Tests of Approve question function', () => {
    test('Status is 201', async () => {
        const response = await request(app).patch('/api/admin/mailbox/approve_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            id_question: 9
        });

        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app).patch('/api/admin/mailbox/approve_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            id_question: 9
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message', async () => {
        const response = await request(app).patch('/api/admin/mailbox/approve_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            id_question: 9
        });

        expect(response.text).toMatch('Duyệt câu hỏi thành công');
    });
});*/

describe('Unit Tests of Reply question function when entering complete information', () => {
    test('Status is 201', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.text).toMatch('Đặt câu hỏi thành công');
    });
});
