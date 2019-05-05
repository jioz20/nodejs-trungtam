let arrNumber = [3, 19, 5, 66, 2, 65, 111];

let asc = arrNumber.sort((a,b) => { return a - b; });
// console.log(asc);

let des = asc.sort((a,b) => {return b- a});
// console.log(des);

//lay vi tri cua mot so 

let arrNumber2 = [3, 19, 5, 66, 2, 65, 111];
let LayViTri = arrNumber2.indexOf(2);
console.log(LayViTri);


//lastIndexOf: lay vi tri của số có giá trị cuối cùng