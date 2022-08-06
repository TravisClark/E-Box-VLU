const request = require('supertest');
const app = require('../index');
const NotificationModel = require('../app/models/NotificationModel');
const MailboxModel = require('../app/models/MailboxModel');
const moment = require('moment');

describe('Unit test of list notification', () => {
    test('Status is 200 and format json', async () => {
        const response = await request(app).get('/api/user/notification/list_notification')
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
    });
    test('Number of notification returned', async () => {
        const response = await request(app).get('/api/user/notification/list_notification')
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5N3BtMzM1MjkiLCJyb2xlX25hbWUiOiJTaW5oIFZpw6puIiwiaWF0IjoxNjU5MTk0MDAzLCJleHAiOjE2Njc4MzQwMDN9.617lpi6MDEZhaJKQq9R7cH-MxQZaznTIt_F35q445BA'});
        
        //Search notification by username get from token
        const notification = await NotificationModel.find({
            username_receiver: '197pm33529',
        }).sort({
            createdAt: 'desc',
        });
        const list_notification = [];
        if(notification !== null) {
            for (let i = 0; i < notification.length; i++) {
                const info_mailbox = await MailboxModel.findOne({
                    id_question: notification[i].id_question,
                });
                list_notification.push({
                    id_notification: notification[i].id_notification,
                    status_notification: notification[i].status_notification,
                    username_sender: notification[i].username_sender,
                    id_question: notification[i].id_question,
                    question: info_mailbox.question,
                    time: moment(
                        notification[i].createdAt,
                        'YYYY-MM-DDTHH:mm:ss.SSS',
                    ).fromNow(),
                    watched: notification[i].watched,
                });
            }
        }
        expect(response.body.length).toEqual(list_notification.length);
    });
});