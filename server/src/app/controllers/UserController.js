const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
    //[GET] http://localhost:5000/api/admin/user/list_users?username=???
    list_users = async (req, res) => {
        try {
            if (req.query.hasOwnProperty('username')) {
                //Lấy dang sách user
                const users = await UserModel.find({});
                //Tạo 2 biến để sử lý mảng
                const list_users = [];
                //Lọc các username theo ký tự được nhận
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username.indexOf(req.query.username) !== -1) {
                        list_users[i] = users[i];
                    }
                }
                //Xóa các mảng bị null
                var dem = 0;
                for (var i = 0; i < list_users.length; i++) {
                    if (list_users[i] === null || list_users[i] === undefined) {
                        await list_users.splice(i - dem, 1);
                        dem = dem + 1;
                    }
                }
                res.status(201).json(list_users);
            } else {
                const users = await UserModel.find({});
                res.status(200).json(users);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[GET] http://localhost:5000/api/user/user/user/account_info
    account_info = async (req, res) => {
        try {
            //Search user by token
            const user = await UserModel.findOne({
                username: req.user.username,
            });
            //Return user info
            res.status(200).json({
                username: user.username,
                role_name: user.role_name,
            });
        } catch (err) {
            console.log(err);
        }
    };

    //[GET] http://localhost:5000/api/admin/user/details_user?username=abc
    details_user = async (req, res, next) => {
        try {
            const information = await UserModel.findOne({
                username: req.query.username,
            });
            res.status(200).json(information);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/admin/user/add_user
    add_user = async (req, res, next) => {
        try {
            //Get data from client
            const formData = req.body;
            var data_username = formData.username;
            //format data_username
            var username = data_username.replace(/\s+/g, '');
            const format = /[a-z || A-Z || 0-9]/g;
            //Search and check username unique
            const user = await UserModel.findOne({ username });
            if (username == null || username === '') {
                //check username is null or ''
                return next(
                    res.status(401).json({
                        message: 'Tài khoản không được bỏ trống',
                    }),
                );
            } else if (username.length < 5 || username.length > 20) {
                //check length of username
                return next(
                    res.status(411).json({
                        message: 'Độ dài tài khoản từ 5 đến 20 ký tự',
                    }),
                );
            } else if (username.match(format).length != username.length) {
                //check username for correct format
                return next(
                    res.status(412).json({
                        message:
                            'Tài khoản chỉ chứa định dạng chữ Alphabet và chữ số',
                    }),
                );
            } else if (user) {
                //check username unique
                return next(
                    res.status(405).json({
                        message: 'Tài khoản đã tồn tại',
                    }),
                );
            } else {
                //format password by username
                formData.password = `VLU${username.trim().slice(-5)}`;
                //Get data add new user
                const user = new UserModel(formData);
                await user
                    .save()
                    .then(() => {
                        res.status(201).json({
                            message: 'Tạo tài khoản thành công',
                        });
                    })
                    .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/user/user/login
    login = async (req, res, next) => {
        try {
            //Get data from client
            const formData = req.body;
            var data_username = formData.username;
            var data_password = formData.password;
            //format data_username and password
            var username = data_username.replace(/\s+/g, '');
            var password = data_password.replace(/\s+/g, '');
            if (
                username == null ||
                username === '' ||
                password == null ||
                password === ''
            ) {
                //check username and password is null or ''
                return next(
                    res.status(401).json({
                        message: 'Tài khoản và mật khẩu không được bỏ trống',
                    }),
                );
            } else {
                //Search user by username and password
                const user = await UserModel.findOne({
                    username,
                    password,
                });

                if (!user || user.status === 'Không hoạt động') {
                    //Check if the user is found
                    return next(
                        res.status(401).json({
                            message: 'Tài khoản hoặc mật khẩu không chính xác',
                        }),
                    );
                } else {
                    //Return user info and generate token
                    res.status(200).json({
                        username: user.username,
                        role_name: user.role_name,
                        token: generateToken(user.username, user.role_name),
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/user/user/change_password
    change_password = async (req, res, next) => {
        try {
            const formData = req.body;
            const username = formData.username;
            //Search user by username
            const user = await UserModel.findOne({ username });
            //Get password of user
            var password_real = user.password;
            //Get data from client
            var data_password = formData.password;
            var data_new_password = formData.new_password;
            var data_re_new_password = formData.re_new_password;
            //format password, new password and re_new_password
            var password = data_password.replace(/\s+/g, '');
            var new_password = data_new_password.replace(/\s+/g, '');
            var re_new_password = data_re_new_password.replace(/\s+/g, '');
            const format = /[a-z || A-Z || 0-9]/g;
            if (password == null || password === '') {
                //Check password is null or ''
                return next(
                    res.status(401).json({
                        message: 'Mật khẩu cũ không được bỏ trống',
                    }),
                );
            } else if (!(password === password_real)) {
                //Check if the password is correct or not
                return next(
                    res.status(412).json({
                        message: 'Mật khẩu cũ không chính xác',
                    }),
                );
            } else if (new_password == null || new_password === '') {
                //Check if the new password is null or ''
                return next(
                    res.status(401).json({
                        message: 'Mật khẩu mới không được bỏ trống',
                    }),
                );
            } else if (re_new_password == null || re_new_password === '') {
                //Check if the re_new_password is null or ''
                return next(
                    res.status(401).json({
                        message: 'Xác nhận mật khẩu mới không được bỏ trống',
                    }),
                );
            } else if (new_password.length < 5 || new_password.length > 20) {
                //Check if the new password length is more than 5 and less than 20
                return next(
                    res.status(411).json({
                        message:
                            'Độ dài của mật khẩu mới phải từ 5 đến 20 ký tự',
                    }),
                );
            } else if (
                new_password.match(format).length != new_password.length
            ) {
                //Check the new password for correct format
                return next(
                    res.status(405).json({
                        message:
                            'Mật khẩu mới chỉ chứa định dạng chữ Alphabet và chữ số',
                    }),
                );
            } else if (!(new_password === re_new_password)) {
                //check if new password matches re-enter password
                res.status(405).json({
                    message:
                        'Mật khẩu mới và xác minh mật khẩu không trùng khớp. Vui lòng kiểm tra lại',
                });
            } else {
                // Search and change_password by username
                UserModel.findOneAndUpdate(
                    { username },
                    { password: new_password },
                )
                    .then(() => {
                        res.status(201).json({
                            message: 'Thay đổi mật khẩu thành công',
                        });
                    })
                    .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[PATCH] http://localhost:5000/api/admin/user/deactivate_user
    deactivate_user = async (req, res, next) => {
        try {
            UserModel.findOneAndUpdate(
                { username: req.body.username },
                { status: 'Không hoạt động' },
            )
                .then(() => {
                    res.status(200).json({
                        message: 'Vô hiệu hóa tài khoản thành công',
                    });
                })
                .catch(next);
        } catch (error) {
            console.log(error);
        }
    };

    //[PATCH] http://localhost:5000/api/admin/user/change_user_information
    change_user_information = async (req, res, next) => {
        try {
            UserModel.findOneAndUpdate(
                { username: req.body.username },
                { password: req.body.password, role_name: req.body.role_name },
            )
                .then(() => {
                    res.status(200).json({
                        message: 'Chỉnh sửa thông tin tài khoản thành công',
                    });
                })
                .catch(next);
        } catch (error) {
            console.log(error);
        }
    };
}

const generateToken = (username, role_name) => {
    return jwt.sign({ username, role_name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};

module.exports = new UserController();
