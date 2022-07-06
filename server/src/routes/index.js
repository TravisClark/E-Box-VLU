const admin_roleRoute = require('./admin_roleRoute');
const admin_userRoute = require('./admin_userRoute');
const user_userRoute = require('./user_userRoute');
const admin_mailboxRoute = require('./admin_mailboxRoute');
const user_mailboxRoute = require('./user_mailboxRoute');
const admin_typeRoute = require('./admin_typeRoute');
const user_typeRoute = require('./user_typeRoute');

const { checkLogin } = require('../middleware/Auth');

function route(app) {
    // app.use(checkLogin);
    //routes in admin
    app.use('/api/admin/role', admin_roleRoute);
    app.use('/api/admin/user', admin_userRoute);
    app.use('/api/admin/mailbox', admin_mailboxRoute);
    app.use('/api/admin/type', admin_typeRoute);

    //routes in user
    app.use('/api/user/user', user_userRoute);
    app.use('/api/user/mailbox', user_mailboxRoute);
    app.use('/api/user/type', user_typeRoute);
}

module.exports = route;
