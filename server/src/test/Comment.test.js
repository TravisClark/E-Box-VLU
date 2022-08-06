const request = require('supertest');
const app = require('../index');
const CommentModel = require('../app/models/CommentModel');

describe('Unit test of list comment', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app).get('/api/user/comment/list_comments')
        .query({id_question: 2})
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of comment returned', async () => {
        const response = await request(app).get('/api/user/comment/list_comments')
        .query({id_question: 2})
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        const list_comments = await CommentModel.find({id_question: 2});
        expect(response.body.length).toEqual(list_comments.length);
    });
});

describe('Unit test of send comment', () => {
    test('Status is 200, format json and return message', async () => {
        const response = await request(app).post('/api/user/comment/send_comment')
        .send({id_question: 2,
                comment: 'Unit Test'})
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.text).toMatch('Unit Test');
    });
});
