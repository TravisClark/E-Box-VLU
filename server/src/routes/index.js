const userRoute = require('./userRoute');
const roleRoute = require('./roleRoute');

function route(app) {
    app.use('/user', userRoute);
    app.use('/role', roleRoute);
}

module.exports = route;
