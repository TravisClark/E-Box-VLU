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

describe('Unit test of publish question when leave the question type or question blank', () => {
    //Unit test of check type_name is null or ''
    test('Status is 401 when type name is back', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: '',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when type name is back', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: '',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return data user when type name is back', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: '',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        });

        expect(response.text).toMatch('Vui lòng chọn loại câu hỏi');
    });
    //Unit test of check question is null or ''
    test('Status is 401 when question is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: '',
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when question is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: '',
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return data user when question is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            question: '',
        });

        expect(response.text).toMatch('Vui lòng nhập câu hỏi');
    });
});

describe('Unit test of view questions list function', () => {
    test('Status is 200', async () => {
        const response = await request(app).get('/api/admin/mailbox/list_questions_admin')

        expect(response.statusCode).toBe(200);
    });
    test('Return format json', async () => {
        const response = await request(app).get('/api/admin/mailbox/list_questions_admin')

        expect(response.type).toEqual('application/json');
    });
});

describe('Unit Tests of Approve question function', () => {
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
});

describe('Unit Tests of Reply question function when entering complete information', () => {
    jest.setTimeout(30000);
    test('Status is 201', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            answer: 'Có nha em',
            id_question: 18,
        });
        expect(response.statusCode).toBe(201);
    });
    test('Return format json', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            answer: 'Có nha em',
            id_question: 18,
        });
        
        expect(response.type).toEqual('application/json');
    });
    test('Return message "Trả lời câu hỏi thành công"', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            type_name: 'Môn học',
            answer: 'Có nha em',
            id_question: 18,
        });
        expect(response.body).toEqual({message: 'Trả lời câu hỏi thành công'});
    });
});

describe('Unit Tests of Reply question function when when leaving type name or answer blank', () => {
    //Unit test of check type name is null or ''
    test('Status is 401 when type name is blank', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            type_name: '',
            answer: 'Có nha em',
            id_question: 10,
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when type name is blank', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            answer: 'Có nha em',
            type_name: '',
            id_question: 10,
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message "Vui lòng chọn thể loại câu hỏi" when type name is blank', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            answer: 'Có nha em',
            type_name: '',
            id_question: 10,
        });

        expect(response.body).toEqual({message: 'Vui lòng chọn thể loại câu hỏi'});
    });
    //Unit test of check answer is null or ''
    test('Status is 401 when answer is blank', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            type_name: 'Lịch Học',
            answer: '',
            id_question: 10,
        });

        expect(response.statusCode).toBe(401);
    });
    test('Return format json when answer is blank', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            type_name: 'Lịch Học',
            answer: '',
            id_question: 10,
        });

        expect(response.type).toEqual('application/json');
    });
    test('Return message "Vui lòng nhập câu trả lời" when answer is blank', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm11111',
            type_name: 'Lịch Học',
            answer: '',
            id_question: 10,
        });

        expect(response.body).toEqual({message: 'Vui lòng nhập câu trả lời'});
    });
});

describe('Unit Tests of View approval question list function', () => {
    test('Status is 200', async () => {
        const response = await request(app).get('/api/admin/mailbox/list_questions_admin').query({status: 'Đã được duyệt'})

        expect(response.statusCode).toBe(200);
    });
    test('Return format json', async () => {
        const response = await request(app).get('/api/admin/mailbox/list_questions_admin').query({status: 'Đã được duyệt'})

        expect(response.type).toEqual('application/json');
    });
});