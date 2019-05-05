const bcrypt = require("bcrypt");

//ma hoa c1
function hash(password)
{
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, 8)
        .then(hash => {
            resolve(hash);
        })
        .catch(err => {
             reject(err);
        })
    })
}


function compare(password, hash)
{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, hash)
        .then(result => {
            resolve(result);
        })
        .catch(err => {
             reject(err);
        })
    })
}

module.exports = {hash, compare};