let express = require("express");


let app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));


let port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send(`ok`));
app.get("/app/:id", (req, res) => res.render("index", { _id: req.params.id }));


class Tinh {
    constructor(so1, opt, so2) {
        this.so1 = so1;
        this.opt = opt;
        this.so2 = so2;
    }

    getPhepTinh(opt) {
        switch (opt) {
            case "cong":
                return "+";
                break;
            case "tru":
                return "-";
                break;
            case "nhan":
                return "*";
                break;
            default:
                return "/";
        }
    }
    
    TinhToan() {
        app.get("/:so1/:opt/:so2", (req, res) => {
            let value1 = parseInt(req.params.so1);
            let value2 = parseInt(req.params.so2);
            let result = eval(value1 + this.getPhepTinh(req.params.opt) + value2);
            res.render("index", {value1, value2, opt: this.getPhepTinh(req.params.opt), result});
        });
    }
}


app.get("/show",(req, res)=>{
    res.render("app", {images: "ap.jpg"});
});


let tt = new Tinh();
tt.TinhToan();

app.listen(3000, () => console.log(`Server started`));