class Singer {
    constructor(id, name, image, link)
    {
        this.id = id;
        this.name = name;
        this.image = image;
        this.link = link;
    }
}


let data =
    [
         new Singer("1", "Đức Phúc", "image/1.jpg", "localhost:3000/dp"),
         new Singer("2", "Minh An", "image/2.jpg", "localhost:3000/ma")
    ]



    
    module.exports = data