let request = require("request");

// function TinhToan(soA, phepTinh, soB, fn) {
//     let URL = "http://localhost:3000/";
//     request(URL + soA + '/' + phepTinh + '/' + soB, (error, res, body) => {
//         if (error)
//             throw fn(null, error.message);
//         else {
//             const data = JSON.parse(body);
//             return fn(data.result, null);
//         }
//     });
// }




// TinhToan(2, "cong", 4, (data, error) => {
//     if (error)
//         throw new Error(error);
//     else
//         TinhToan(5, "chia", 2, (result, err) => {
//             if (err)
//                 throw new Error(err);
//             else {
//                 let temp = data * result;
//                 console.log(temp);
//             }
//         });
// });



function Tinh(soA, toantu, soB) {
    return new Promise((resole, reject) => {
        if (isNaN(soA) || isNaN(soB))
            return reject(new Error('Invalid parameters'));
        if (toantu === "chia" && soB === 0)
            return reject(new Error('Invalid parameters'));
        else {
            let URL = "http://localhost:3000/";
            request(URL + soA + '/' + toantu + '/' + soB, (error, res, body) => {
                if (error)
                    return reject(error);
                else
                    return resole(JSON.parse(body).result);
            });
        }
    });
}



//Dien tich hinh thang thuong
// function DienTichHinhThang(dayA, dayB, chieuCao, cb) 
// {
//     Tinh(dayA, "cong", dayB)
//         .then(tong => Tinh(tong, "nhan", chieuCao))
//         .then(thuong => Tinh(thuong, "chia", 2))
//         .then(x => cb(x, null))
//         .catch(err => cb(null,err.message));
// }

// DienTichHinhThang(2, 4, 5, (result, error)=>{
//     if(error)
//         console.log(error);
//     else 
//         console.log(result);
// });


//Dien tich hinh thang thuong
function DienTichHinhThang(dayA, dayB, chieuCao) 
{
    return Tinh(dayA, "cong", dayB)
        .then(tich => Tinh(tich, "nhan", chieuCao))
        .then(thuong => Tinh(thuong, "chia", 2))
}


DienTichHinhThang(2,4,5)
.then(result => console.log(result))
.catch(err => console.log(err.message));


//Dung promise all
function DienTichHinhThang2(dayA, dayB, chieuCao) 
{
        return Promise.all([Tinh(dayA, "cong", dayB),Tinh(chieuCao, "chia", dayA)]).then(x=>Tinh(x[0], "nhan", x[1]));
}
DienTichHinhThang2(2,4,5)
.then(result => console.log(result))
.catch(err => console.log(err.message));



