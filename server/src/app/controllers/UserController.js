const UserModel = require('../models/UserModel');

class UserController {
    //[GET] /user/
    index = async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] /user/api/add_user
    add_user = async (req, res, next) => {
        try {
            const formData = req.body;
            var username = formData.username;

            formData.password = `VLU${username.trim().slice(-5)}`;

            const user = new UserModel(formData);
            await user
                .save()
                .then(() => {
                    res.send({ Message: 'Tao tk thanh cong' });
                })
                .catch(next);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] /user/api/login
    login = async (req, res, next) => {
        try {
            const formData = req.body;
            var username = formData.username;
            var password = formData.password;
            UserModel.findOne({
                username,
                password,
            }).then((data) => {
                if (data) {
                    res.status(200).json('Dang nhap thanh cong');
                } else {
                    return next(res.status(404).json({
                        err: 'Tai khoan hoac mat khau khong chinh xac',
                    })); 
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] /user/api/check_account
    change_password = async (req, res, next) => {
        try {
            const formData = req.body;
            if(!formData.password){
                res.json({err: 'Vui long nhap password'});
            }
            else if(!formData.new_password === formData.re_new_password) {
                res.json({ err: 'Vui long kiem tra lai password va re-enter password'})
            } else{

            }

        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new UserController();
