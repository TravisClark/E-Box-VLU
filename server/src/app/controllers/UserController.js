const UserModel = require('../models/UserModel');

class UserController {
    //[GET] http://localhost:5000/user/api/list_users
    list_users = async (req, res) => {
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/user/api/add_user
    add_user = async (req, res, next) => {
        try {
            const formData = req.body;
            var data_username = formData.username;
            var username = data_username.replace(/\s+/g, '');
            const format = /[a-z || A-Z || 0-9]/g;
            if (username == null || username === '') {
                return next(
                    res.status(401).json({
                        err: 'username khong duoc bo trong',
                    }),
                );
            } else if (username.length < 5 || username.length > 20) {
                return next(
                    res.status(411).json({
                        err: 'do dai cua username chi tu 5 den 20 ky tu',
                    }),
                );
            } else if (username.match(format).length != username.length) {
                return next(
                    res.status(411).json({
                        err: 'Sai format',
                    }),
                );
            } else {
                formData.password = `VLU${username.trim().slice(-5)}`;

                const user = new UserModel(formData);
                await user
                    .save()
                    .then(() => {
                        res.status(200).json({
                            Message: 'Tao tai khoan thanh cong',
                        });
                    })
                    .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/user/api/login
    login = async (req, res, next) => {
        try {
            const formData = req.body;
            var data_username = formData.username;
            var data_password = formData.password;
            var username = data_username.replace(/\s+/g, '');
            var password = data_password.replace(/\s+/g, '');
            if((username == null || username === '') || (password == null || password === '')) {
                return next(
                    res.status(401).json({
                        err: 'username va password khong duoc bo trong',
                    }),
                );
            }
            else{
                UserModel.findOne({
                    username,
                    password,
                }).then((data) => {
                    if (data) {
                        res.status(200).json('Dang nhap thanh cong');
                    } else {
                        return next(
                            res.status(404).json({
                                err: 'Tai khoan hoac mat khau khong chinh xac',
                            }),
                        );
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/user/api/check_account
    change_password = async (req, res, next) => {
        try {
            const formData = req.body;
            if (!formData.password) {
                res.json({ err: 'Vui long nhap password' });
            } else if (!formData.new_password === formData.re_new_password) {
                res.json({
                    err: 'Vui long kiem tra lai password va re-enter password',
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new UserController();
