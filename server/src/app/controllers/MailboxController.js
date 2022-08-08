const Mailbox = require('../models/MailboxModel');
const Notification = require('../models/NotificationModel');
const InboxModel = require('../models/InboxModel');
const Conversation = require('../models/ConversationModel');

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
    //[GET] http://localhost:5000/api/admin/mailbox/statistical
    statistical = async (req, res) => {
        try {
            var count_unchecked = await Mailbox.count({
                status_question: 'Chưa được duyệt',
            });
            var count_approved = await Mailbox.count({
                status_question: 'Đã được duyệt',
            });
            var count_answered = await Mailbox.count({
                status_question: 'Đã được trả lời',
            });
            var count_refused = await Mailbox.count({
                status_question: 'Đã bị từ chối',
            });
            var count_type1 = await Mailbox.count({ type_name: 'Học phần' });
            var count_type2 = await Mailbox.count({ type_name: 'Học phí' });
            var count_type3 = await Mailbox.count({ type_name: 'Học bổng' });
            var count_type4 = await Mailbox.count({
                type_name: 'Chương trình đào tạo',
            });
            var count_type5 = await Mailbox.count({
                type_name: 'Hướng nghiệp',
            });
            var count_type6 = await Mailbox.count({
                type_name: 'Câu hỏi khác',
            });
            const list_questions = await Mailbox.find({
                status_question: 'Đã được trả lời',
            });
            await list_questions.sort(function (a, b) {
                if (a.members_star != null && b.members_star != null) {
                    if (a.members_star.length > b.members_star.length) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
                return 0;
            });
            res.status(200).json({
                unchecked: count_unchecked,
                approved: count_approved,
                answered: count_answered,
                refused: count_refused,
                HocPhan: count_type1,
                HocPhi: count_type2,
                HocBong: count_type3,
                CTDT: count_type4,
                HuongNghiep: count_type5,
                CauHoiKhac: count_type6,
                charts: list_questions,
            });
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
            const list_questions = await Mailbox.find({username_questioner: req.user.username});
            let count_question = 0;
            var realtime = new Date();
            for (let i = 0; i < list_questions.length; i++) {
                const createdAt = new Date(list_questions[i].createdAt);
                if(createdAt.getFullYear() === realtime.getFullYear() && 
                    createdAt.getMonth() === realtime.getMonth() &&
                    createdAt.getDate() === realtime.getDate()){
                        count_question = count_question + 1;
                }
            }
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
            }else if (count_question >= 3) {
                //check the number of times asked
                return next(
                    res.status(400).json({
                        message:
                            'Mỗi ngày chỉ được hỏi 3 câu hỏi',
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

    //[PUT] http://localhost:5000/api/user/mailbox/like
    like = async (req, res, next) => {
        try {
            const info_mailbox = await Mailbox.findOne({
                id_question: req.body.id_question,
            });

            let list_users_like = [];
            if (info_mailbox.members_star !== null) {
                list_users_like = info_mailbox.members_star;
            }
            if (
                !list_users_like.find(
                    (user) => user.username === req.user.username,
                )
            ) {
                (await list_users_like) ===
                    list_users_like.push({ username: req.user.username });
                Mailbox.findOneAndUpdate(
                    { id_question: req.body.id_question },
                    { members_star: list_users_like },
                )
                    .then(() => {
                        res.status(201).json({ message: 'Thả sao thành công' });
                    })
                    .catch(next);
            } else {
                list_users_like = list_users_like.filter(
                    (user) => user.username !== req.user.username,
                );
                Mailbox.findOneAndUpdate(
                    { id_question: req.body.id_question },
                    { members_star: list_users_like },
                )
                    .then(() => {
                        res.status(201).json({
                            message: 'Bỏ thả sao thành công',
                        });
                    })
                    .catch(next);
            }
        } catch (error) {
            console.log(error);
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
                //check Conversation exist or not
                const checkConversation = await Conversation.findOne({
                    members: [data_username, info_mailbox.username_questioner],
                });
                if (!checkConversation) {
                    //create data Conversation
                    const newConversation = new Conversation({
                        members: [
                            data_username,
                            info_mailbox.username_questioner,
                        ],
                    });
                    await newConversation.save();
                }
                //get id of conversation
                const info_Conversation = await Conversation.findOne({
                    members: [data_username, info_mailbox.username_questioner],
                });
                //create data message
                const info_inbox = {
                    id_conversation: info_Conversation.id_conversation,
                    message: data_message,
                    username_sender: data_username,
                };
                const inbox = new InboxModel(info_inbox);
                //Send Message to student
                inbox.save();

                //create data notification
                const info_notification = {
                    id_question: data_id_question,
                    status_notification: status_question,
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
                    status_notification: status_question,
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
