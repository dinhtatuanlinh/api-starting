const express = require("express");
var cors = require('cors')
var http = require('http');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');


global.__base = __dirname + '/';
global.__pathConfig = __base + 'config/';
global.__pathRoutes = __base + 'routes/';
global.__pathControllers = __base + 'controllers/';
global.__pathData = __base + 'data/';

global.__pathServices = __base + 'services/';
global.__pathValidations = __base + 'validations/';
global.__pathIMGS = __base + 'public/imgs/';

const initWebRoutes = require(__pathRoutes + "web");


let app = express();
//cấp phép truy cập api
app.use(cors())
// set cookiePaser
app.use(cookieParser());
// set session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}));

// use midleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);

// truyền app vào route
app.use("/", initWebRoutes(app));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler (khi gọi url ko tồn tại trả về trang 404)
app.use(function(err, req, res, next) {
    res.locals.userInfo = '';
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('404'); ///khi không tìm được trang sẽ trả về trang báo lỗi có thông báo lỗi đầy đủ
    // res.render('error', { title: 'errorPage' });
});
// lấy tham số trong file .env môi trường
let port = process.env.PORT || 6969; // ||hoặc
// PORT === undefined thì gán vào 6969

server.listen(port, () => {
    console.log(`app is running at port: http://localhost:${port}`);
});