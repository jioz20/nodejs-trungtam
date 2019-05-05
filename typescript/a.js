"use strict";
var soA = 10;
var arr = ['a', 213, 213];
function getName(obj) {
    obj.name = '213';
    obj.age = 23;
    return obj;
}
var obj = { name: 'nam', age: 20 };
var newObj = getName(obj);
console.log(newObj);
var Like = /** @class */ (function () {
    function Like(checkLike, totalLike) {
        this.checkLike = false;
        this.totalLike = 10;
        this.checkLike = checkLike;
        this.totalLike = totalLike;
    }
    Like.prototype.like = function () {
        if (this.checkLike == false)
            this.totalLike -= 1;
        else
            this.totalLike += 1;
        this.checkLike = !this.checkLike;
    };
    return Like;
}());
var n1 = new Like(false, 10);
n1.like();
console.log(n1);
