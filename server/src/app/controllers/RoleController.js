const RoleModel = require('../models/RoleModel');

class RoleController {
    //[GET] http://localhost:5000/role/api/list_roles
    list_roles = async (req, res) => {
        try {
            const roles = await RoleModel.find();
            res.json(roles);
        } catch (err) {
            console.log(err);
        }
    };

    //[POST] http://localhost:5000/role/api/add_role
    add_role = async (req, res) => {
        try {
            const formData = req.body;
            const role = new RoleModel(formData);
            await role.save()
                .then(() => res.json(`them thanh cong ${req.body.role_name}`))
        } catch (err) {
            console.log(err);
        }
    };
}

module.exports = new RoleController();