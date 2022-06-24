const userRouter = require('./user');

function route(app) {
    app.use('/user', userRouter);
}

module.exports = route;