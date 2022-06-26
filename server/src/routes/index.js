const userRoute = require('./userRoute');
const roleRoute = require('./roleRoute');
const {checkLogin} = require('../middleware/Auth');

function route(app) {
    // app.use(checkLogin);
    app.use('/api/user', userRoute);
    app.use('/api/role', roleRoute);
}

module.exports = route;
