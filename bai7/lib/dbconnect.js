const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://teslog:nguyentri1998@cluster0-3vqgl.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.connection
.then(()=>console.log("DB connected"))
.catch(err => console.log(err))