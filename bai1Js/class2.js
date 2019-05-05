let file = require("./pointline");

let point = file.Point;
let line = file.Line;

class Triangle{
    constructor(pointA, pointB, pointC)
    {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
    }

    getPerimeter(){
        let AB = new line(this.pointA, this.pointB);
        let BC = new line(this.pointB, this.pointC);
        let AC = new line(this.pointC, this.pointA);

        return AB.getLength() + AC.getLength() + BC.getLength();
    }
}

class NewLine extends line{
    smallChain(d1, d2)
    {
        return d1.getLength() < d2.getLength() ? 'd1 nho hon' : 'd2 nho hon';
    }
}


let A = new point(2,3);
let B = new point(2,4);
let C = new point(6,5);


let ChuVi = new Triangle(A, B, C);
// console.log(ChuVi.getPerimeter());



let AB = new NewLine(A, B);
let BC = new NewLine(B, C);

let SS = new NewLine();

console.log(AB.getLength());
console.log(BC.getLength());

console.log(SS.smallChain(AB, BC));
console.log(NewLine.compare(AB, BC));



