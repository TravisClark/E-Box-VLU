const Mailbox = require('../models/MailboxModel');
const Notification = require('../models/NotificationModel');

class MailboxController {
    //[GET] http://localhost:5000/api/mailbox/list_questions
    list_questions = async (req, res, next) => {
        try {
            if (req.query.hasOwnProperty('status')) {
                const mailbox = await Mailbox.find({
                    status: req.query.status,
                }).sort({
                    createdAt: 'asc',
                });
                res.status(200).json(mailbox);
            } else {
                const mailbox = await Mailbox.find({}).sort({
                    createdAt: 'asc',
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
            if (data_question == null || data_question === '') {
                //check question is null or ''
                return next(
                    res.status(401).json({
                        Message: 'Vui lòng nhập câu hỏi',
                    }),
                );
            } else {
                //create mailbox information data
                const info_mailbox = {
                    question: data_question,
                    answer: '',
                    status: 'Chưa được duyệt',
                    type_name: '',
                    username_question: data_username,
                    username_censor: '',
                    username_reply: '',
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
            await Mailbox.findOneAndUpdate(
                { id_question: data_id_question },
                { status: status, username_censor: data_username },
            );
            //create informational data for the notification
            const info_mailbox = await Mailbox.findOne({
                id_question: data_id_question,
            });
            const info_notification = {
                question: info_mailbox.question,
                notification: status,
                username_sender: data_username,
                username_receiver: info_mailbox.username_question,
            };
            //create notifications for students
            const notification = new Notification(info_notification);
            notification
                .save()
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

    //[PATCH] http://localhost:5000/api/mailbox/refuse_question
    refuse_question = async (req, res, next) => {
        try {
            //Get data from client
            const data_username = req.body.username;
            const data_id_question = req.body.id_question;
            //update question status to MongoDB
            var status = 'Đã bị từ chối';
            await Mailbox.findOneAndUpdate(
                { id_question: data_id_question },
                { status: status, username_censor: data_username },
            );
            //create informational data for the notification
            const info_mailbox = await Mailbox.findOne({
                id_question: data_id_question,
            });
            const info_notification = {
                question: info_mailbox.question,
                notification: status,
                username_sender: data_username,
                username_receiver: info_mailbox.username_question,
            };
            //create notifications for students
            const notification = new Notification(info_notification);
            notification
                .save()
                .then(() => {
                    res.status(201).json({
                        Message: 'Từ chối câu hỏi thành công',
                    });
                })
                .catch(next);
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/mailbox/reply_question
    reply_question = async (req, res, next) => {
        try {
            //Get data from client
            const data_username = req.body.username;
            const data_answer = req.body.answer;
            const data_id_question = req.body.id_question;
            const data_type_name = req.body.type_name;
            //format answer
            var answer = data_answer.replace(/\s+/g, '');
            const format = /[a-z || A-Z || 0-9]/g;
            if (data_type_name == null || data_type_name === '') {
                //check type name is null or ''
                return next(
                    res.status(401).json({
                        Message: 'Vui lòng chọn thể loại câu hỏi',
                    }),
                );
            } else if (answer == null || answer === '') {
                //check answer is null or ''
                return next(
                    res.status(401).json({
                        Message: 'Vui lòng nhập câu trả lời',
                    }),
                );
            } else if (answer.match(format).length != answer.length) {
                //check answer is null or ''
                return next(
                    res.status(401).json({
                        Message: 'Vui lòng nhập câu trả lời',
                    }),
                );
            } else {
                //update answer status to MongoDB
                var status = 'Đã được trả lời';
                await Mailbox.findOneAndUpdate(
                    { id_question: data_id_question },
                    {
                        status: status,
                        answer: data_answer,
                        type_name: data_type_name,
                        username_reply: data_username,
                    },
                );
                //create informational data for the notification
                const info_mailbox = await Mailbox.findOne({
                    id_question: data_id_question,
                });
                const info_notification = {
                    question: info_mailbox.question,
                    notification: status,
                    username_sender: data_username,
                    username_receiver: info_mailbox.username_question,
                };
                //create notifications for students
                const notification = new Notification(info_notification);
                notification
                    .save()
                    .then(() => {
                        res.status(201).json({
                            Message: 'Trả lời câu hỏi thành công',
                        });
                    })
                    .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new MailboxController();
