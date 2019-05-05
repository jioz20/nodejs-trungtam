const express = require("express");
const app = express();
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' + file.originalname);
    }
  })

 var upload = multer({ storage: storage }); 

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res)=>res.render("index"));

app.post('/upload', upload.single('fileName'), (req, res)=>{
    file = req.file; 
    input = req.body;

    res.send(file);
})


let port = process.env.PORT || 3000;
app.listen(port);