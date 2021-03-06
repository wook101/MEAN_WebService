process.env.NODE_ENV = process.env.NODE_ENV || 'development';   //process.env.NODE_ENV변수가 없으면 default 'devlopment'
const configureExpress = require('./config/expressServer');
const configureMongoose = require('./config/mongoose');
const configurePassport = require('./config/passport');

const db = configureMongoose();
const app = configureExpress();
const passport = configurePassport();

app.listen(3000);
module.exports = app;

console.log('Server running at 3000 port');