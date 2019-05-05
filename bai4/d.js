let request = require("request");


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


async function DienTichHinhThang(dayA, dayB, chieuCao){
    let tong = await Tinh(dayA, "cong", dayB);
    let tich = await Tinh(tong, "nhan", chieuCao);
    return await Tinh(tich, "chia", 2);
    
}

DienTichHinhThang(2,4,5)
.then(result => console.log(result))
.catch(err => console.log(err.message));

