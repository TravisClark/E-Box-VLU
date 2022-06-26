const userRoute = require('./userRoute');
const roleRoute = require('./roleRoute');
const {checkLogin} = require('../middleware/Auth');

function route(app) {
    app.use(checkLogin);
    app.use('/user', userRoute);
    app.use('/role', roleRoute);
}

module.exports = route;
