const express = require("express");
const { hash, compare } = require("../lib/bscrypt");
const { sign, verify} = require("../lib/jwt");
const {checkLogin, redirectIfloggedIn} = require("../lib/checklogin");

const route = express.Router();
const UserModel = require("../model/User");

route.get("/register", redirectIfloggedIn, (req, res) => {
    res.render("register");
});

route.get("/login", redirectIfloggedIn, (req, res) => {
    res.render("login");
})

route.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                req.flash('error_message', "Cannot find user 1");
                return res.redirect("/user/login");
            }
            else {
                compare(password, user.password)
                    .then(result => {
                        if (result) {
                            // sign token
                            return sign({id: user._id, email: user.email})
                        }
                        else {
                            req.flash('error_message', "Password invalid!");
                            return res.redirect("/user/login");
                        }
                    })
                    .then(token => { 
                        //save cookie-parser

                        res.cookie('rememberme', token, { maxAge: 60*60*1000, httpOnly: true }).redirect("/");

                        res.send(token)
                    })
                    .catch(err => {
                        req.flash('error_message', 'Something wrong')
                        return res.redirect("/user/login")
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            req.flash('error_message', "Cannot find user 2");
            return res.redirect("/user/login");
        })
})

route.post("/register", (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || email == '') {
        req.flash('error_message', 'Please enter email')
        return res.redirect('/user/register')
    }


    if (password != confirmPassword) {
        req.flash('error_message', "Password matching failed!");
        res.redirect("/user/register");
    }

    //save user
    hash(password)
        .then(hash => {
            return UserModel.create({
                email: email,
                password: hash
            })
        })
        .then(() => {
            return res.redirect("/user/login");
        })
        .catch(() => {
            req.flash('error_message', "Cannot register account");
            return res.redirect("/user/register");
        })
})


//jsonwebtoken ko huy duoc
route.get("/logout", checkLogin, (req, res)=>{
    res.clearCookie('rememberme').redirect("/user/login");
})


module.exports = route;