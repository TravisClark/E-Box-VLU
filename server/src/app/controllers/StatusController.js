const StatusModel = require('../models/StatusModel');

class RoleController {
    //[GET] http://localhost:5000/api/admin/status/list_status
    list_status = async (req, res) => {
        try {
            const status = await StatusModel.find({});
            res.json(status);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/admin/status/add_status
    add_status = async (req, res, next) => {
        try {
            const status_name = req.body.status_name;
            if (status_name == null || status_name === '') {
                return next(
                    res.status(401).json({
                        message: 'Loại câu hỏi không được bỏ trống',
                    }),
                );
            } else {
                const status = new StatusModel(req.body);
                await status
                    .save()
                    .then(() =>
                        res
                            .status(201)
                            .json(
                                `Thêm thành công trạng thái tài khoản: ${req.body.status_name}`,
                            ),
                    );
            }
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new RoleController();
