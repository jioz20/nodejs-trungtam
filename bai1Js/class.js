const school = {
    name: "KHTN"
}

class Personx{
    constructor(ten, tuoi, truong){
        this.name = ten;
        this.age = tuoi;
        this.school = truong;
    }

    getName(){
        console.log(this.name);
    }

    getSChool()
    {
        console.log(`${this.name} học ở trường ${this.school.name}`);
    }
}
// const viet = new Person("Viet", "40", school);

const viet = new Personx("Viet", "20", {
    name: "Khoa hoc tu nhien"
});
// console.log(viet);

// viet.getName();

viet.name = "nam";
// viet.getName();

// viet.getSChool();


class Person{
    constructor(name, height)
    {
        this.name = name;
        this.height = height;
    }

    get ten()
    {
        return this.name;
    }

    set doiten(tenMoi)
    {
        this.name = tenMoi;
    }
}


const hieu = new Person("Hieu", "198cm");
hieu.doiten = "Truong";
console.log(hieu.ten);

