const Mailbox = require('../models/MailboxModel');
const Notification = require('../models/NotificationModel');

class MailboxController {
    //[GET] http://localhost:5000/api/admin/mailbox/list_questions_admin?status=???
    list_questions_admin = async (req, res, next) => {
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

    //[GET] http://localhost:5000/api/user/mailbox/list_questions_user?type_name=???
    list_questions_user = async (req, res, next) => {
        try {
            if (req.query.hasOwnProperty('type_name')) {
                const mailbox = await  Mailbox.find({ 
                    type_name: req.query.type_name,
                    status: 'Đã được trả lời',
                    })
                    .sort({
                        createdAt: 'desc',
                    });
                res.status(201).json(mailbox);
            } else {
                const mailbox = await Mailbox.find({}).sort({
                    createdAt: 'desc',
                });
                res.status(200).json(mailbox);
            }
        
        } catch (err) {
            console.log(err);
        }
    };

    //[GET] http://localhost:5000/api/user/mailbox/details_question?id_question=123
    details_question = async (req, res, next) => {
        try {
            const mailbox = await Mailbox.findOne({ 
                id_question: req.query.id_question,
                })
            res.status(200).json(mailbox);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/user/mailbox/publish_question
    publish_question = async (req, res, next) => {
        try {
            //Get data from client
            const data_username = req.body.username;
            const data_question = req.body.question;
            const data_type_name = req.body.type_name;
            if(data_type_name == null || data_type_name === ''){
                //check type_name is null or ''
                return next(
                    res.status(401).json({
                        message: 'Vui lòng chọn loại câu hỏi',
                    }),
                );
            }else if (data_question == null || data_question === '') {
                //check question is null or ''
                return next(
                    res.status(401).json({
                        message: 'Vui lòng nhập câu hỏi',
                    }),
                );
            }else if (data_question.length > 200) {
                //check length of question
                return next(
                    res.status(411).json({
                        message: 'Độ dài của câu hỏi quá dài. Chỉ có phép độ dài từ dưới 200 ký tự',
                    }),
                );
            } else {
                //create mailbox information data
                const info_mailbox = {
                    question: data_question,
                    answer: '',
                    status: 'Chưa được duyệt',
                    type_name: data_type_name,
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
                            message: 'Đặt câu hỏi thành công',
                        });
                    })
                    .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/admin/mailbox/approve_question
    approve_question = async (req, res, next) => {
        try {
            //Get data from client
            const data_username = req.body.username;
            const data_id_question = req.body.id_question;
            const data_type_name = req.body.type_name;
            //update question status to MongoDB
            var status = 'Đã được duyệt';
            await Mailbox.findOneAndUpdate(
                { id_question: data_id_question },
                { status: status, username_censor: data_username, type_name: data_type_name},
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
                        message: 'Duyệt câu hỏi thành công',
                    });
                })
                .catch(next);
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/admin/mailbox/refuse_question
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
                        message: 'Từ chối câu hỏi thành công',
                    });
                })
                .catch(next);
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/admin/mailbox/reply_question
    reply_question = async (req, res, next) => {
        try {
            //Get data from client
            const data_username = req.body.username;
            const data_answer = req.body.answer;
            const data_id_question = req.body.id_question;
            const data_type_name = req.body.type_name;
            //format answer
            var answer = data_answer.replace(/\s+/g, '');
            if (data_type_name == null || data_type_name === '') {
                //check type name is null or ''
                return next(
                    res.status(401).json({
                        message: 'Vui lòng chọn thể loại câu hỏi',
                    }),
                );
            } else if (answer == null || answer === '') {
                //check answer is null or ''
                return next(
                    res.status(401).json({
                        message: 'Vui lòng nhập câu trả lời',
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
                            message: 'Trả lời câu hỏi thành công',
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
