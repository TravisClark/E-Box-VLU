const request = require('supertest');
const app = require('../index');
const Mailbox = require('../app/models/MailboxModel');
/*
describe('Unit test of publish question when entering complete information', () => {
    test('Status is 201 and format json and return message "Đặt câu hỏi thành công"', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm33529',
            type_name: 'Học phần',
            question: 'Cho em hỏi cần bao nhiêu điểm để qua môn Lập trình mobile ạ',
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});
        
        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Đặt câu hỏi thành công',
        });
    });
});

describe('Unit test of publish question when leave the question type or question blank', () => {
    //Unit test of check type_name is null or ''
    test('Status is 401, format json and return message "Vui lòng chọn loại câu hỏi" when type name is back', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm33529',
            type_name: '',
            question: 'Cho em hỏi danh sách môn tương đương em có thể xem ở đâu ạ',
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(401);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Vui lòng chọn loại câu hỏi',
        });
    });
    //Unit test of check question is null or ''
    test('Status is 401, format json and return message "Vui lòng nhập câu hỏi" when question is null', async () => {
        const response = await request(app).post('/api/user/mailbox/publish_question').send({
            username: '197pm33529',
            type_name: 'Học phần',
            question: '',
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(401);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Vui lòng nhập câu hỏi',
        });
    });
});

describe('Unit test of view questions list function', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app).get(
            '/api/admin/mailbox/list_questions_admin',
        ).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app).get(
            '/api/admin/mailbox/list_questions_admin',
        ).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});
        
        const mailbox = await Mailbox.find({}).sort({
            createdAt: 'asc',
        });
        expect(response.body.length).toEqual(mailbox.length);
    });
});

describe('Unit Tests of Approve question function', () => {
    test('Status is 201, format json and return message "Duyệt câu hỏi thành công"', async () => {
        const response = await request(app).patch('/api/admin/mailbox/approve_question').send({
            username: '197pm33529',
            type_name: 'Học phần',
            id_question: 1
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Duyệt câu hỏi thành công',
        });
    });
});

describe('Unit Tests of Reply question function when entering complete information', () => {
    test('Status is 201, format json and return message "Trả lời câu hỏi thành công"', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm33529',
            type_name: 'Học phần',
            answer: 'Có nha em',
            id_question: 1,
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});
        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({message: 'Trả lời câu hỏi thành công'});
    });
});

describe('Unit Tests of Reply question function when leaving type name or answer blank', () => {
    //Unit test of check type name is null or ''
    test('Status is 401, format json and message "Vui lòng chọn thể loại câu hỏi" when type name is blank', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/reply_question')
            .send({
                username: '197pm33529',
                type_name: '',
                answer: 'Có nha em',
                id_question: 1,
            }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(401);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Vui lòng chọn thể loại câu hỏi',
        });
    });
    //Unit test of check answer is null or ''
    test('Status is 401, format json and message "Vui lòng nhập câu trả lời" when answer is blank', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/reply_question')
            .send({
                username: '197pm33529',
                type_name: 'Học phần',
                answer: '',
                id_question: 1,
            }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(401);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({ message: 'Vui lòng nhập câu trả lời' });
    });
});

describe('Unit Tests of Reply question function when the user enters the wrong request', () => {
    //Unit test of check answer for correct format
    test('Status is 412, format json, message "Vui lòng nhập thông tin câu trả lời đầy đủ" when answer for incorrect format', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/reply_question')
            .send({
                username: '197pm33529',
                type_name: 'Học phần',
                answer: '.',
                id_question: 1,
            }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(412);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Vui lòng nhập thông tin câu trả lời đầy đủ',
        });
    });
});

describe('Unit Tests of View approval question list function', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/list_questions_admin')
            .query({ status_question: 'Đã được duyệt' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/list_questions_admin')
            .query({ status_question: 'Đã được duyệt' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});;
        const mailbox = await Mailbox.find({
            status_question: 'Đã được duyệt',
        }).sort({
            createdAt: 'asc',
        });
        expect(response.body.length).toEqual(mailbox.length);
    });
});

describe('Unit Tests of View and search for question which has been replied function', () => {
    test('Status is 201 and format json', async () => {
        const response = await request(app)
            .get('/api/user/mailbox/list_questions_user')
            .query({ type_name: 'Học phần' })            
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app)
            .get('/api/user/mailbox/list_questions_user')
            .query({ type_name: 'Học phần' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});
        
        const mailbox = await Mailbox.find({
            type_name: 'Học phần',
            status_question: 'Đã được trả lời',
        }).sort({
            createdAt: 'desc',
        });
        expect(response.body.length).toEqual(mailbox.length);
    });
});

describe('Unit Tests of edit answer function when entering complete information', () => {
    jest.setTimeout(3000);
    test('Status is 201, format json and return message "Trả lời câu hỏi thành công"', async () => {
        const response = await request(app).patch('/api/admin/mailbox/reply_question').send({
            username: '197pm33529',
            type_name: 'Học phần',
            answer: 'Có nha em',
            id_question: 1,
        })            
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});
        
        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({message: 'Trả lời câu hỏi thành công'});
    });
});

describe('Unit Tests of edit answer function when leaving type name or answer blank', () => {
    //Unit test of check type name is null or ''
    test('Status is 401, format json and message "Vui lòng chọn thể loại câu hỏi" when type name is blank', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/reply_question')
            .send({
                username: '197pm33529',
                type_name: '',
                answer: 'Có nha em',
                id_question: 1,
            })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(401);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Vui lòng chọn thể loại câu hỏi',
        });
    });
    //Unit test of check answer is null or ''
    test('Status is 401, format json and message "Vui lòng nhập câu trả lời" when answer is blank', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/reply_question')
            .send({
                username: '197pm33529',
                type_name: 'Học phần',
                answer: '',
                id_question: 1,
            })            
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(401);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({ message: 'Vui lòng nhập câu trả lời' });
    });
});

describe('Unit Tests of refuse question function when entering complete information', () => {
    test('Status is 201, format json and return message "Từ chối câu hỏi thành công"', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/refuse_question')
            .send({ username: '197pm33529',
                    id_question: 3,
                    message: 'Đã được trả lời rồi nha em'})
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({message: 'Từ chối câu hỏi thành công'});
    });
});

describe('Unit Tests of refuse question function when leaving message blank', () => {
    //Unit test of check message is null or ''
    test('Status is 401, format json and message "Vui lòng nhập lý do từ chối" when message is blank', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/refuse_question')
            .send({ username: '197pm33529', id_question: 3, message: '' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(401);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({
            message: 'Vui lòng nhập lý do từ chối',
        });
    });
});

describe('Unit Tests of View rejected questions function', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/list_questions_admin')
            .query({ status_question: 'Đã bị từ chối' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/list_questions_admin')
            .query({ status_question: 'Đã bị từ chối' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA'});

        const mailbox = await Mailbox.find({
            status_question: 'Đã bị từ chối',
        }).sort({
            createdAt: 'asc',
        });
        expect(response.body.length).toEqual(mailbox.length);
    });
});
*/
describe('Unit Tests of View question details function', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app)
            .get('/api/user/mailbox/details_question')
            .query({ id_question: 1 })
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA',
            });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Return selected question', async () => {
        const response = await request(app)
            .get('/api/user/mailbox/details_question')
            .query({ id_question: 1 })
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIHZpw6puIiwiaWF0IjoxNjU5MTAyOTQwLCJleHAiOjE2Njc3NDI5NDB9.p6LBoiOhdJMWu-mg_2h7UDVsOKRHu9puMqXStUXBEmA',
            });

        const mailbox = await Mailbox.findOne({
            id_question: 1,
        });
        expect(response.body.question).toEqual(mailbox.question);
    });
});
