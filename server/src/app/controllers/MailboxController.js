const Mailbox = require('../models/MailboxModel');

class MailboxController {
    //[POST] http://localhost:5000/api/mailbox/publish_question
    publish_question = async (req, res, next) => {
        try {
            //Get data from client
            const formData = req.body;
            const data_username = formData.username;
            const data_question = formData.question;
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

    //[GET] http://localhost:5000/api/mailbox/list_questions
    list_questions = async (req, res) => {
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
}

module.exports = new MailboxController();