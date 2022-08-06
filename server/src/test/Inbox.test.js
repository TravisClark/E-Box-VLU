const request = require('supertest');
const app = require('../index');
const InboxModel = require('../app/models/InboxModel');

describe('Unit test of list messages', () => {
    test('Status is 201 and format json', async () => {
        const response = await request(app).get('/api/user/inbox/list_messages')
        .query({id_conversation: 1})
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        expect(response.statusCode).toBe(201);
        expect(response.type).toEqual('application/json');
    });
    test('Number of messages returned', async () => {
        const response = await request(app).get('/api/user/inbox/list_messages')
        .query({id_conversation: 1})
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        const list_messages = await InboxModel.find({id_conversation: 1});
        expect(response.body.length).toEqual(list_messages.length);
    });
});
/*
describe('Unit test of send message', () => {
    test('Status is 200, format json and return message', async () => {
        const response = await request(app).post('/api/user/inbox/send_message')
        .send({id_conversation: 1,
                message: 'Unit Test'})
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        expect(response.text).toMatch('Unit Test');
    });
});
*/