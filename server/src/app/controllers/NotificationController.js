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
            }).sort({
                createdAt: 'desc',
            });
            const list_notification = [];
            for (let i = 0; i < notification.length; i++) {
                const info_mailbox = await MailboxModel.findOne({
                    id_question: notification[i].id_question,
                });
                list_notification.push({
                    status_notification: notification[i].status_notification,
                    username_sender: notification[i].username_sender,
                    id_question: notification[i].id_question,
                    question: info_mailbox.question,
                    time: moment(
                        notification[i].createdAt,
                        'YYYY-MM-DDTHH:mm:ss.SSS',
                    ).fromNow(),
                });
            }
            //Return list notification
            res.status(200).json(list_notification);
        } catch (err) {
            console.log(err);
        }
    };
    //[PATCH] http://localhost:5000/api/user/notification/watched
    watched = async (req, res,next) => {
        try {
            NotificationModel.findOneAndUpdate({id_notification: req.body.id_notification}, {watched: true})
            .then(() => {res.status(201).json({message: 'Watched'})
            }).catch(next);
            
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new NotificationController();
