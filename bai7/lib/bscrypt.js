const bcrypt = require("bcrypt");

//ma hoa c1
function hash(password)
{
    return new Promise((resole, reject)=>{
        bcrypt.hash(password, 8)
        .then(hash => {
             resole(hash);
        })
        .catch(err => {
             reject(err);
        })
    })
}

function compare(password, hash)
{
    return new Promise((resole, reject)=>{
        bcrypt.compare(password, hash)
        .then(result => {
             resole(result);
        })
        .catch(err => {
             reject(err);
        })
    })
}

module.exports = {hash, compare};