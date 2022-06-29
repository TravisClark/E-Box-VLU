const userRoute = require('./userRoute');
const roleRoute = require('./roleRoute');
const mailboxRoute = require('./mailboxRoute');
const { checkLogin } = require('../middleware/Auth');

function route(app) {
    // app.use(checkLogin);
    app.use('/api/user', userRoute);
    app.use('/api/role', roleRoute);
    app.use('/api/mailbox', mailboxRoute);
}

module.exports = route;
