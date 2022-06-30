const Mailbox = require('../models/MailboxModel');
const Notification = require('../models/NotificationModel');

class MailboxController {

    //[GET] http://localhost:5000/api/mailbox/list_questions
    list_questions = async (req, res, next) => {
        try {
            if(req.query.hasOwnProperty('status')){
                const mailbox = await Mailbox.find({status: req.query.status}).sort({ 
                    createdAt: 'asc'
                });
                res.status(200).json(mailbox);
            }else{
                const mailbox = await Mailbox.find({}).sort({ 
                    createdAt: 'asc'
                });
                res.status(200).json(mailbox);
            } 
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/mailbox/publish_question
    publish_question = async (req, res, next) => {
        try {
            //Get data from client
            const data_username = req.body.username;
            const data_question = req.body.question;
            if(data_question == null || data_question === ''){ //check question is null or ''
                return next(
                    res.status(401).json({
                        err: 'Vui lòng nhập câu hỏi',
                        field: 'question',
                    }),
                );
            } else{
                //create mailbox information data
                const info_mailbox = {
                    question: data_question,
                    answer: '',
                    status: 'Chưa được duyệt',
                    type_name: '',
                    user_name_question: data_username,
                    user_name_censor: '',
                    user_name_answer: '',
                };
                //Add a new mailbox to the database
                const mailbox = new Mailbox(info_mailbox);
                await mailbox
                        .save()
                        .then(() => {
                            res.status(201).json({
                                Message: 'Đặt câu hỏi thành công',
                            });
                        })
                        .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/mailbox/approve_question
    approve_question = async (req, res, next) => {
        try {
            //Get data from client
            const data_username = req.body.username;
            const data_id_question = req.body.id_question;
            //update question status to MongoDB
            var status = 'Đã được duyệt';
            Mailbox.findOneAndUpdate(
                { id_question: data_id_question},
                {status: status,
                user_name_censor: data_username
                })
            //create informational data for the notification
            const info_mailbox = await Mailbox.findOne({id_question: data_id_question});
            const info_notification= {
                question: info_mailbox.question,
                notification: status,
                type_name: '',
                username_sender: data_username,
                username_receiver: info_mailbox.user_name_question,
            };
            //create notifications for students
            const notification = new Notification(info_notification);
            notification.save()
                .then(() => {
                    res.status(201).json({
                        Message: 'Duyệt câu hỏi thành công',
                    });
                })
                .catch(next);

        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new MailboxController();