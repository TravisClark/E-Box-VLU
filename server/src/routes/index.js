const admin_roleRoute = require('./admin_roleRoute');
const admin_userRoute = require('./admin_userRoute');
const user_userRoute = require('./user_userRoute');
const admin_mailboxRoute = require('./admin_mailboxRoute');
const user_mailboxRoute = require('./user_mailboxRoute');
const admin_typeRoute = require('./admin_typeRoute');
const user_typeRoute = require('./user_typeRoute');
const admin_statusRoute = require('./admin_statusRoute');
const user_notificationRoute = require('./user_notificationRoute');
const user_conversationRoute = require('./user_conversationRoute');

const { checkLogin } = require('../middleware/Auth');

function route(app) {
    //routes in admin
    app.use('/api/admin/role', checkLogin, admin_roleRoute);
    app.use('/api/admin/user', checkLogin, admin_userRoute);
    app.use('/api/admin/mailbox', checkLogin, admin_mailboxRoute);
    app.use('/api/admin/type', checkLogin, admin_typeRoute);
    app.use('/api/admin/status', admin_statusRoute);

    //routes in user
    app.use('/api/user/user', user_userRoute);
    app.use('/api/user/mailbox', checkLogin, user_mailboxRoute);
    app.use('/api/user/type', checkLogin, user_typeRoute);
    app.use('/api/user/notification', checkLogin, user_notificationRoute);
    app.use('/api/user/conversation', checkLogin, user_conversationRoute);
}

module.exports = route;
