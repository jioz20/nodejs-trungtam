const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session')
const SingerSchema = require('./models/Singer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg')
        return cb(new Error('File not allow'))
    cb(null, true)
}
const upload = multer({storage,fileFilter, limits:{fileSize:1024*150}}) // 100kb

const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))


app.use(session({
    secret: '7654323gfdssd',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash())
app.use((req,res,next)=>{
    res.locals.error_message = req.flash('error_message')
    res.locals.success_message = req.flash('success_message')
    next();
})
mongoose.connect('mongodb://single:nguyentri1998@ds135514.mlab.com:35514/single',{
    useNewUrlParser:true,
    useCreateIndex:true,
})
mongoose.connection
.then(()=>console.log('Connected'))
.catch(e=>console.log(e))

const Singer = mongoose.model('singer',SingerSchema)

app.get('/',(req,res)=>{
    Singer.find().sort({_id: -1})
    .then(singers=>{
        res.render('list',{singers})
    })
    .catch(e=>console.log(e.message))
})

//Add
app.get('/add',(req,res)=>{
    res.render('add')
})
app.post('/add',(req,res)=>{
    upload.single('avatar')(req,res,err=>{
        if(err){
            return res.send(err.message)
        }
        const { name, link } = req.body
        Singer.create({
            name: name ,
            link: link,
            avatar: req.file ? req.file.filename : 'user-avatar.png'
        })
        .then(()=>{
            req.flash('success_message', "Add Success!");
            res.redirect('/');
        })
        .catch(error => {
            req.flash('error_message', err.message);
            res.redirect('/');
        })
    })
})

//Delete
app.get('/remove/:id',(req,res)=>{
    const _id = req.params.id
    Singer.findByIdAndDelete(_id)
    .then((singer)=>{
        if(!singer){
            req.flash('error_message', 'Singer Not found!')
            res.redirect('/')
        }
        else {
            req.flash('success_message', 'Deleted!')
            res.redirect('/')
        }
    })
    .catch(err=>{
        req.flash('error_message', err.message)
        res.redirect('/')
    })
})


//Update
app.get('/update/:id',(req,res)=>{
    const {id} = req.params;
    Singer.findById(id)
    .then((singer)=>{
        if(!singer){
            req.flash('error_message', 'Singer Not found!')
            res.redirect('/');
        }
        else {
            res.render("update", {singer});
        }
    })
})

// app.post('/update',(req,res)=>{
//     const {id} = req.body;

//     if(req.file == undefined)
//     {
//         Singer.findByIdAndUpdate(id, {
//             name: name,
//             link: link,
//             avatar: req.file.avatar2
//         })
//         .then(()=>{
//             req.flash('success_message', "Udate Success!");
//             res.redirect('/');
//         })
//         .catch(error => {
//             req.flash('error_message', err.message);
//             res.redirect('/');
//         })
       
//     }
//     else 
//     {
//         upload.single('avatar')(req,res,err=>{
//             if(err){
//                 return res.send(err.message)
//             }
//             const { name, link } = req.body
           

//             Singer.findByIdAndUpdate(id, {
//                 name: name ,
//                 link: link,
//                 avatar: req.file.filename
//             })
//             .then(()=>{
//                 req.flash('success_message', "Udate Success!");
//                 res.redirect('/');
//             })
//             .catch(error => {
//                 req.flash('error_message', err.message);
//                 res.redirect('/');
//             })
//         })
//     }

   
// })



app.use((req, res, next)=>{
    res.status(404).render("404");
})

app.listen(3000,()=>console.log('Server start on port 3000'))