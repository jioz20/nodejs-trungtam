const {verify} = require("./jwt");

function checkLogin(req, res, next){
    const token = req.cookies.rememberme;
    if(!token)
    {
        req.flash('error_message', "Login First 1");
        return res.redirect("/user/login");
    }
    //check token
    verify(token)
    .then(user => {
        res.locals.userId = user.id;
        next();

    })
    .catch(()=>{
        req.flash('error_message', "Login First 2");
        return res.redirect("/user/login");
    })
}

function redirectIfloggedIn(req, res, next)
{
    const token = req.cookies.rememberme;
    if(token)
    {
        return res.redirect("/");
    }
    next();
}

module.exports = {checkLogin, redirectIfloggedIn};