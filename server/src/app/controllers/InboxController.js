const InboxModel = require('../models/InboxModel');

class InboxController {
    //[GET] http://localhost:5000/api/admin/mailbox/list_questions_admin?status=???
    list_messages = async (req, res, next) => {
        try {
            if (req.query.hasOwnProperty('status')) {
                const mailbox = await Mailbox.find({
                    status: req.query.status,
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
}

module.exports = new InboxController();
