const Conversation = require('../models/ConversationModel');
const moment = require('moment');

class ConversationController {
    //[GET] http://localhost:5000/api/user/conversation/list_conversations
    list_conversations = async (req, res) => {
        try {
            //Search and get conversation by username get from token
            const list_conversation = await Conversation.find({
                members: { $in: [req.user.username] },
            });

            //Return user info
            res.status(200).json(list_conversation);
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new ConversationController();
