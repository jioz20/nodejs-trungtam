const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./controller/user.route");
const homeRouter = require("./controller/home.route");
const db = require("./lib/dbconnect");
const flash = require('connect-flash'); //1
const session = require('express-session') //4
const cookieParser = require("cookie-parser");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true,
}))

//cookie
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));



app.use(flash()) //2

//3
app.use(function (req, res, next) {
    res.locals.error_message = req.flash('error_message');
    next();
})

app.use("/user", userRouter);
app.use("/", homeRouter);


app.use((req, res, next)=>{
    res.status(404).send(`<h1>Page Not Found</h1>`);
})

let port = process.env.PORT || 3000;
app.listen(port);

