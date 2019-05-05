let express = require("express");
let app = express();
let data = require("./model/data");
let bodyParser = require("body-parser");


app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 3000;

app.get("/", (req, res) => res.render("index", { data }));
app.get("/add", (req, res) => res.render("add"));
app.get("/update/:id", (req, res) => {
    let result = data.find(value => value.id === req.params.id);

    res.render("update", { data: result });
});


app.post("/adddata", (req, res) => {
    let idLast = data.length + 1;
    if(req.body.name != "")
    {
        data.push({
            id: idLast,
            name: req.body.name,
            image: req.body.image,
            link: req.body.link
        });
    }
    // console.log(data);
    res.redirect("/");
});

app.get("/api/:id", (req, res) => {
    let result = data.findIndex(value => value.id === req.params.id);
    data.splice(result, 1);
    // console.log(result);

    res.redirect("/");
});

app.post("/api", (req, res) => {
    let result = data.findIndex(value => value.id === req.body.id);
    data[result].name = req.body.name;
    data[result].image = req.body.image;
    data[result].link = req.body.link;
    res.redirect("/");
});


app.listen(port, () => console.log(`Server started with port ${port}`))