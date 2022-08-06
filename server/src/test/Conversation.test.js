const request = require('supertest');
const app = require('../index');
const Conversation = require('../app/models/ConversationModel');

describe('Unit test of list conversations', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app)
            .get('/api/user/conversation/list_conversations')
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA',
            });

        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of messages returned', async () => {
        const response = await request(app)
            .get('/api/user/conversation/list_conversations')
            .set({
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA',
            });

        const list_conversation = await Conversation.find({
            members: { $in: ['197pm33529'] },
        });
        expect(response.body.length).toEqual(list_conversation.length);
    });
});
