const TypeModel = require('../models/TypeModel');

class RoleController {
    //[GET] http://localhost:5000/api/admin/type/list_types_admin
    list_types_admin = async (req, res) => {
        try {
            const types = await TypeModel.find({});
            res.json(types);
        } catch (err) {
            console.log(err);
        }
    };

    //[GET] http://localhost:5000/api/user/type/list_types_user
    list_types_user = async (req, res) => {
        try {
            const types = await TypeModel.find();
            res.json(types);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/admin/type/add_type
    add_type = async (req, res, next) => {
        try {
            const type_name = req.body.type_name;
            if (type_name == null || type_name === '') {
                return next(
                    res.status(401).json({
                        message: 'Loại câu hỏi không được bỏ trống',
                    }),
                );
            } else {
                const type = new TypeModel(req.body);
                await type
                    .save()
                    .then(() =>
                        res
                            .status(201)
                            .json(
                                `Thêm thành công loại câu hỏi: ${req.body.type_name}`,
                            ),
                    );
            }
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new RoleController();
