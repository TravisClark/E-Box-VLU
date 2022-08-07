const CommentModel = require('../models/CommentModel');

class CommentController {
    //[GET] http://localhost:5000/api/user/comment/list_comments?id_question=??
    list_comments = async (req, res, next) => {
        try {
            const list_comments = await CommentModel.find({
                id_question: req.query.id_question,
            });
            res.status(200).json(list_comments);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/user/comment/send_comment
    send_comment = async (req, res, next) => {
        try {
            //get data from client
            const data_comment = req.body.comment;
            const data_id_question = req.body.id_question;
            //format data_comment
            var comment = data_comment.replace(/\s+/g, '');
            if (!(data_comment == null || comment === '')) {
                const new_comment = new CommentModel({
                    id_question: data_id_question,
                    comment: data_comment,
                    username: req.user.username,
                });
                new_comment.save();
                res.status(200).json(new_comment);
            }else{
                res.status(200).send('null');
            }
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new CommentController();
