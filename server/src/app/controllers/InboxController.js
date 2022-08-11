const InboxModel = require('../models/InboxModel');

class InboxController {
    //[GET] http://localhost:5000/api/user/inbox/list_messages?id_conversation=??
    list_messages = async (req, res, next) => {
        try {
            const list_messages = await InboxModel.find({
                id_conversation: req.query.id_conversation,
            });
            res.status(201).json(list_messages);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/user/inbox/send_message
    send_message = async (req, res, next) => {
        try {
            //get data from client
            const data_id_conversation = req.body.id_conversation;
            const data_message = req.body.message;
            //format data_message
            var message = data_message.replace(/\s+/g, '');
            if (!(data_message === null || message === '' || data_id_conversation === null) && data_id_conversation !== undefined) {
                const new_message = new InboxModel({
                    id_conversation: data_id_conversation,
                    message: data_message,
                    username_sender: req.user.username,
                });
                await new_message.save();
                res.status(200).json(new_message);
            }else{
                return next(res.status(400).send('null'));
            }
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new InboxController();
