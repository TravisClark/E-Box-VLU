const NotificationModel = require('../models/NotificationModel');
const MailboxModel = require('../models/MailboxModel');
const moment = require('moment');

class NotificationController {
    //[GET] http://localhost:5000/api/user/notification/list_notification
    list_notification = async (req, res) => {
        try {
            //Search notification by username get from token
            const notification = await NotificationModel.find({
                username_receiver: req.user.username,
            });
            const list_notification = [];
            for (let i = 0; i < notification.length; i++) {
                const info_mailbox = await MailboxModel.findOne({
                    id_question: notification[i].id_question,
                });
                list_notification.push({
                    notification: notification[i].notification,
                    username_sender: notification[i].username_sender,
                    id_question: notification[i].id_question,
                    question: info_mailbox.question,
                    time: moment(
                        notification[i].createdAt,
                        'YYYY-MM-DDTHH:mm:ss.SSS',
                    ).fromNow(),
                });
            }
            //Return user info
            res.status(200).json(list_notification);
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new NotificationController();
