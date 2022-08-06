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
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
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
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
        ).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app).get(
            '/api/admin/mailbox/list_questions_admin',
        ).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
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
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
        }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
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
            }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
            }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
            }).set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/list_questions_admin')
            .query({ status_question: 'Đã được duyệt' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});;
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
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app)
            .get('/api/user/mailbox/list_questions_user')
            .query({ type_name: 'Học phần' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
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
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
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
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

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
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of questions returned', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/list_questions_admin')
            .query({ status_question: 'Đã bị từ chối' })
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

        const mailbox = await Mailbox.find({
            status_question: 'Đã bị từ chối',
        }).sort({
            createdAt: 'asc',
        });
        expect(response.body.length).toEqual(mailbox.length);
    });
});

describe('Unit Tests of View question details function', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app)
            .get('/api/user/mailbox/details_question')
            .query({ id_question: 1 })
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA',
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
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA',
            });

        const mailbox = await Mailbox.findOne({
            id_question: 1,
        });
        expect(response.body.question).toEqual(mailbox.question);
    });
});

describe('Unit Tests of view rejection notice function', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/statistical')
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA',
            });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Return count status and type of question and charts', async () => {
        const response = await request(app)
            .get('/api/admin/mailbox/statistical')
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA',
            });

        var count_unchecked = await Mailbox.count({status_question: 'Chưa được duyệt'});
        var count_approved = await Mailbox.count({status_question: 'Đã được duyệt'});
        var count_answered = await Mailbox.count({status_question: 'Đã được trả lời'});
        var count_refused = await Mailbox.count({status_question: 'Đã bị từ chối'});
        var count_type1 = await Mailbox.count({type_name: 'Học phần'});
        var count_type2 = await Mailbox.count({type_name: 'Học phí'});
        var count_type3 = await Mailbox.count({type_name: 'Học bổng'});
        var count_type4 = await Mailbox.count({type_name: 'Chương trình đào tạo'});
        var count_type5 = await Mailbox.count({type_name: 'Hướng nghiệp'});
        var count_type6 = await Mailbox.count({type_name: 'Câu hỏi khác'});
        const list_questions = await Mailbox.find({status_question: 'Đã được trả lời'});
        await list_questions.sort(function(a, b){
            if(a.members_star != null && b.members_star != null){
                if(a.members_star.length > b.members_star.length){
                    return -1;
                }else{
                    return 1;
                }
            }
            return 0;
        });
        let check = {
            unchecked: count_unchecked,
            approved: count_approved,
            answered: count_answered,
            refused: count_refused,
            HocPhan: count_type1,
            HocPhi: count_type2,
            HocBong: count_type3,
            CTDT: count_type4,
            HuongNghiep: count_type5,
            CauHoiKhac: count_type6,
            charts: list_questions,
        };
        expect(response.body.unchecked).toEqual(check.unchecked);
        expect(response.body.approved).toEqual(check.approved);
        expect(response.body.answered).toEqual(check.answered);
        expect(response.body.refused).toEqual(check.refused);
        expect(response.body.HocPhan).toEqual(check.HocPhan);
        expect(response.body.HocPhi).toEqual(check.HocPhi);
        expect(response.body.HocBong).toEqual(check.HocBong);
        expect(response.body.CTDT).toEqual(check.CTDT);
        expect(response.body.HuongNghiep).toEqual(check.HuongNghiep);
        expect(response.body.CauHoiKhac).toEqual(check.CauHoiKhac);
    });
});
*/
describe('Unit Tests of question recovery function', () => {
    test('Status is 201, format json and return message "Khôi phục câu hỏi thành công"', async () => {
        const response = await request(app)
            .patch('/api/admin/mailbox/restore_question')
            .send({ username: '197pm33529',
                    id_question: 3,})
            .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});

        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
        expect(response.body).toEqual({message: 'Khôi phục câu hỏi thành công'});
    });
});