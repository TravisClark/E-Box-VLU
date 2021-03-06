const RoleModel = require('../models/RoleModel');

class RoleController {
    //[GET] http://localhost:5000/api/admin/role/list_roles
    list_roles = async (req, res) => {
        try {
            const roles = await RoleModel.find();
            res.json(roles);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/api/admin/role/add_role
    add_role = async (req, res) => {
        try {
            const role = new RoleModel(req.body.role_name);
            await role
                .save()
                .then(() => res.json(`Thêm thành công ${req.body.role_name}`));
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new RoleController();
