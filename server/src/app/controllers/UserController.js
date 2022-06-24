const UserModel = require('../models/UserModel');

class UserController{
    //[GET] /user/
    index = async (req, res) => {
        try{
            const users = await UserModel.find();
            res.json(users);
        }catch(err){
            console.log(err);
        }
        
    };

    //[POST] /user/api/add_user
    add_user = async (req, res, next) => {
        const formData = req.body;
        var username = formData.username;
        formData.password = `VLU${username.trim().slice(-5)}`;

        const user = new UserModel(formData);
        await user.save()
            .then(() => {
                res.send({Message: 'Tao tk thanh cong'})
            })
            .catch(next);

    }

    //[POST] /user/api/check_account
    check_account = async (req, res, next) => {    
        try{
            const formData = req.body;
            var username = formData.username;
            var password = formData.password;
            UserModel.findOne({
                username: username,
                password: password,
            })
                .then(data => {
                    if(data){
                        res.json('Dang nhap thanh cong');
                    }else{
                        res.json({err: 'Tai khoan hoac mat khau khong chinh xac'});
                    }
                });
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new UserController();