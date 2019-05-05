const mongoose = require("mongoose");

mongoose.connect('mongodb://pass02:nguyentri1998@ds157735.mlab.com:57735/pass02', {
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.connection
.then(()=>console.log("DB connected"))
.catch(err => console.log(err))