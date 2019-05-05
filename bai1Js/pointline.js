class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getDistance() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

}

class Line {
    constructor(pointA, pointB) {
        this.pointA = pointA;
        this.pointB = pointB;
    }

    getLength() {
        let A = this.pointA.x - this.pointB.x;
        let B = this.pointA.y - this.pointB.y;

        return Math.sqrt(A * A + B * B);
    }

    static compare(d1, d2) {
        return d1.getLength() > d2.getLength() ? 'd1 lon hon' : 'd2 lon hon';
    }
}



// let A = new Point(2, 1);
// let B = new Point(3, 4);

// let C = new Point(5, 1);
// let D = new Point(1, 0);

// let AB = new Line(A, B);
// let CD = new Line(C, D);


// console.log(Line.compare(AB, CD));

module.exports = {Point, Line};


// Static là dùng Tên class truy cập trực tiếp vào hàm có chứa static, nếu không có thì hàm sẽ bị lỗi
