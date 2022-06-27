const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { count } = require('../models/UserModel');
require('dotenv').config();

class UserController {
    //[GET] http://localhost:5000/api/user/list_users
    list_users = async (req, res) => {
        try {
            const users = await UserModel.find({});
            res.status(200).json(users);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/user/add_user
    add_user = async (req, res, next) => {
        try {
            //Get data from client
            const formData = req.body;
            var data_username = formData.username;
            //format data_username
            var username = data_username.replace(/\s+/g, '');
            const format = /[a-z || A-Z || 0-9]/g;
            //Search and check username unique
            const user = await UserModel.findOne({username});
            if (username == null || username === '') { //check username is null or ''
                return next(
                    res.status(401).json({
                        err: 'username khong duoc bo trong',
                    }),
                );
            } else if (username.length < 5 || username.length > 20) { //check length of username
                return next(
                    res.status(411).json({
                        err: 'do dai cua username chi tu 5 den 20 ky tu',
                    }),
                );
            } else if (username.match(format).length != username.length) { //check username for correct format
                return next(
                    res.status(412).json({
                        err: 'Sai format',
                    }),
                );
            }else if (user) { //check username unique
                return next(
                    res.status(500).json({
                        err: 'Username da ton tai', //field
                    }),
                );
            }else {
                //format password by username
                formData.password = `VLU${username.trim().slice(-5)}`;
                //Get data add new user
                const user = new UserModel(formData);
                await user
                    .save()
                    .then(() => {
                        res.status(201).json({
                            Message: 'Tao tai khoan thanh cong',
                        });
                    })
                    .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/user/login
    login = async (req, res, next) => {
        try {
            //Get data from client
            const formData = req.body;
            var data_username = formData.username;
            var data_password = formData.password;
            //format data_username and password
            var username = data_username.replace(/\s+/g, '');
            console.log(username);
            var password = data_password.replace(/\s+/g, '');
            if((username == null || username === '') 
                || (password == null || password === '')) { //check username and password is null or '' 
                return next(
                    res.status(401).json({
                        err: 'username va password khong duoc bo trong',
                    }),
                );
            }
            else{
                //Search user by username and password
                const user = await UserModel.findOne({
                    username,
                    password,
                });
                
                if(!user){ //Check if the user is found
                    return next(
                        res.status(401).json({
                            err: 'Tai khoan hoac mat khau khong chinh xac',
                        }),
                    );
                }else{
                    //Return user info and generate token
                    res.status(201).json({
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

    //[GET] http://localhost:5000/api/user/account_info
    account_info = async (req, res) => {
        try {
            //Search user by token
            // console.log(req.user.username)
            const user = await UserModel.findOne({username: req.user.username});
            //Return user info
            res.status(200).json({
                username: user.username,
                role_name: user.role_name,
            });
        } catch (err) {
            console.log(err);
        }
    };

    //[PUT] http://localhost:5000/api/user/change_password
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
            if (password == null || password === '') { //Check password is null or ''
                return next(
                    res.status(401).json({
                        err: 'password khong duoc bo trong',
                    }),
                );
            }else if (!(password === password_real)) { //Check if the password is correct or not
                return next(
                    res.status(412).json({
                        err: 'Password khong chinh xac',
                    }),
                );
            }else if (   new_password == null || re_new_password == null || 
                        new_password === '' || re_new_password === ''   ){ //Check if the new password and re_new_password is null or ''
                return next(
                    res.status(401).json({
                        err: 'New password va Re-ent Password khong duoc bo trong',
                    }),
                );
            }else if (new_password.length < 5 || new_password.length > 20){ //Check if the new password length is more than 5 and less than 20
                return next(
                    res.status(411).json({
                        err: 'do dai cua username chi tu 5 den 20 ky tu',
                    }),
                );
            }else if (new_password.match(format).length != new_password.length){ //Check the new password for correct format
                return next(
                    res.status(412).json({
                        err: 'Sai format',
                    }),
                );
            }else if (!(new_password === re_new_password)) { //check if new password matches re-enter password
                res.status(412).json({
                    err: 'Vui long kiem tra lai password va re-enter password',
                });
            }
            else{
                // Search and change_password by username
                UserModel.findOneAndUpdate({ username }, {password: new_password})
                    .then(() => {
                        res.status(200).json({
                            Message: 'Thay doi mat khau thanh cong',
                        });
                    })
                    .catch(next);
            }
        } catch (err) {
            console.log(err);
        }
    };
}

const generateToken = (username, role_name) => {
    return jwt.sign({ username, role_name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};

module.exports = new UserController();
