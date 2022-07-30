const Mailbox = require('../models/MailboxModel');
const Notification = require('../models/NotificationModel');
const InboxModel = require('../models/InboxModel');

class MailboxController {
    //[GET] http://localhost:5000/api/admin/mailbox/list_questions_admin?status_question=???
    list_questions_admin = async (req, res, next) => {
        try {
            if (req.query.hasOwnProperty('status_question')) {
                const mailbox = await Mailbox.find({
                    status_question: req.query.status_question,
                }).sort({
                    approvedAt: 'desc',
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
                const mailbox = await Mailbox.find({
                    type_name: req.query.type_name,
                    status_question: 'Đã được trả lời',
                }).sort({
                    createdAt: 'desc',
                });
                res.status(201).json(mailbox);
            } else {
                const mailbox = await Mailbox.find({
                    status_question: 'Đã được trả lời',
                }).sort({
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
            });
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
            if (data_type_name == null || data_type_name === '') {
                //check type_name is null or ''
                return next(
                    res.status(401).json({
                        message: 'Vui lòng chọn loại câu hỏi',
                    }),
                );
            } else if (data_question == null || data_question === '') {
                //check question is null or ''
                return next(
                    res.status(401).json({
                        message: 'Vui lòng nhập câu hỏi',
                    }),
                );
            } else if (data_question.length > 200) {
                //check length of question
                return next(
                    res.status(411).json({
                        message:
                            'Độ dài của câu hỏi quá dài. Chỉ có phép độ dài từ dưới 200 ký tự',
                    }),
                );
            } else {
                //create mailbox information data
                const info_mailbox = {
                    question: data_question,
                    status_question: 'Chưa được duyệt',
                    type_name: data_type_name,
                    username_questioner: data_username,
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
            //update question status_question to MongoDB
            var status_question = 'Đã được duyệt';
            await Mailbox.findOneAndUpdate(
                { id_question: data_id_question },
                {
                    status_question: status_question,
                    username_approver: data_username,
                    type_name: data_type_name,
                    approvedAt: new Date(),
                },
            )
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
            const data_message = req.body.message;
            //format password, new password and re_new_password
            var message = data_message.replace(/\s+/g, '');
            if (message == null || message === '') {
                //check message is null or ''
                return next(
                    res.status(401).json({
                        message: 'Vui lòng nhập lý do từ chối',
                    }),
                );
            } else {
                //update question status_question to MongoDB
                var status_question = 'Đã bị từ chối';
                await Mailbox.findOneAndUpdate(
                    { id_question: data_id_question },
                    {
                        status_question: status_question,
                        username_approver: data_username,
                        approvedAt: new Date(),
                    },
                );
                //get information of question
                const info_mailbox = await Mailbox.findOne({
                    id_question: data_id_question,
                });

                //create data message
                const info_inbox = {
                    message: data_message,
                    username_sender: data_username,
                    username_receiver: info_mailbox.username_questioner,
                };
                const inbox = new InboxModel(info_inbox);
                //Send Message to student
                inbox.save();

                //create data notification
                const info_notification = {
                    id_question: data_id_question,
                    status_question: status_question,
                    username_sender: data_username,
                    username_receiver: info_mailbox.username_questioner,
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
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/admin/mailbox/restore_question
    restore_question = async (req, res, next) => {
        //Get data from client
        const data_username = req.body.username;
        const data_id_question = req.body.id_question;
        //update question status_question to MongoDB
        var status_question = 'Chưa được duyệt';
        await Mailbox.findOneAndUpdate(
            { id_question: data_id_question },
            {
                status_question: status_question,
                username_approver: data_username,
                approvedAt: new Date(),
            },
        )
            .then(() => {
                res.status(201).json({
                    message: 'Khôi phục câu hỏi thành công',
                });
            })
            .catch(next);
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
            const format = /[a-z || A-Z || 0-9]/g;
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
            } else if (answer.match(format) == null) {
                //check answer for correct format
                return next(
                    res.status(412).json({
                        message: 'Vui lòng nhập thông tin câu trả lời đầy đủ',
                    }),
                );
            } else {
                //update answer status_question to MongoDB
                var status_question = 'Đã được trả lời';
                await Mailbox.findOneAndUpdate(
                    { id_question: data_id_question },
                    {
                        status_question: status_question,
                        answer: data_answer,
                        type_name: data_type_name,
                        username_respondent: data_username,
                        responsedAt: new Date(),
                    },
                );
                //create informational data for the notification
                const info_mailbox = await Mailbox.findOne({
                    id_question: data_id_question,
                });
                const info_notification = {
                    id_question: data_id_question,
                    notification: status_question,
                    username_sender: data_username,
                    username_receiver: info_mailbox.username_questioner,
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
