const admin_roleRoute = require('./admin_roleRoute');
const admin_userRoute = require('./admin_userRoute');
const user_userRoute = require('./user_userRoute');
const admin_mailboxRoute = require('./admin_mailboxRoute');
const user_mailboxRoute = require('./user_mailboxRoute');
const { checkLogin } = require('../middleware/Auth');

function route(app) {
    // app.use(checkLogin);
    //routes in admin
    app.use('/api/admin/role', admin_roleRoute);
    app.use('/api/admin/user', admin_userRoute);
    app.use('/api/admin/mailbox', admin_mailboxRoute);

    //routes in user
    app.use('/api/user/user', user_userRoute);
    app.use('/api/user/mailbox', user_mailboxRoute);
}

module.exports = route;
