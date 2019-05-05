const mongoose = require('mongoose')
mongoose.connect('mongodb://pass02:nguyentri1998@ds157735.mlab.com:57735/pass02',{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(()=>{
    console.log('DB connected!')
});


