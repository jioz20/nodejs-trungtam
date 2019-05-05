const jwt = require("jsonwebtoken");
const SECRET_KEY = "kislog";

//create token
function sign(obj)
{
    return new Promise((resolve, reject)=>{
        jwt.sign(obj, SECRET_KEY, {expiresIn: 3600}, (err, encoded)=>{
            if(err)
                return reject(err);
            return resolve(encoded);
        });
    })
}

//check token
function verify(token)
{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, SECRET_KEY, {expiresIn: 3600}, (err, obj)=>{
            if(err)
                return reject(err.message);
            delete obj.exp;
            delete obj.iat;
            return resolve(obj);
        })
    })
}

module.exports = { sign, verify}