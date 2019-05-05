//local storage || catch
//Array.isArray
 let arrName = ['Ti', 'An', 'Minh', 'An'];

//  for(let i =0; i < arrName.length; i++)
//  {
//      console.log(arrName[i]);
//  }

// arrName.map(name => console.log(name));

// let temp = arrName.fill('3'); //Thay đổi tất cả giá trị trong mảng thành một giá trị bất kì
// console.log(temp);

// console.log(arrName.filter(values => values === 'An'));

// var temp = [];
let n = 100;
let tem = [];
for(var i = 0; i < n; i++)
{
    tem.push(i);
}

// console.log(tem.filter(tem => tem % 20 === 0));

// console.log(tem.filter(values => (
//     parseInt(Math.sqrt(values)) === Math.sqrt(values) &&
//     Math.sqrt(values)* Math.sqrt(values) === values
// )))

//pop: lấy ra phần tử cuối cùng


// Lấy phần tử từ một khoảng tới một khoảng
let sss = ['An', 'Binh', 'Cong', 'Dat', 'Hai'];

let newArr = sss.slice(1,3);
// console.log(newArr);

//Remove first : shift
let arrNew = sss.shift();
// console.log(arrNew);

//Add first: unshift
let arrNe = sss.unshift('Hung', 'Hau');
// console.log(arrNe);



// Xoa phan tu bat ki splice
// (ViTri, SoLuongXoa, [PhanTu]);

// Sort
let sortName = arrName.sort();
// console.log(sortName);


let sortDesc = sortName.reverse();
console.log(sortDesc);



//Cong don reduce

let reduceee = sortDesc.reduce((current, produce) => {
    return (current + '<' + produce + '>');
});

console.log(reduceee);



