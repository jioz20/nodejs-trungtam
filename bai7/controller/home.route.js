const express = require("express");
const route = express.Router();
const User = require("../model/User");
const {checkLogin, redirectIfloggedIn} = require("../lib/checklogin");

route.get("/", checkLogin, (req, res)=>{
    let userID = res.locals.userId;
    // console.log(userID); 
    User.findById(userID)
    .then(userInfo => {
        if(!userInfo)
        {
            req.flash('error_message', "Login First 1");
            return res.redirect("/user/login");
        }
        return res.render("home", {name: userInfo.fullname});

    })
    .catch(()=>{
        req.flash('error_message', "Login First 2");
        return res.redirect("/user/login");
    })
});

module.exports = route;