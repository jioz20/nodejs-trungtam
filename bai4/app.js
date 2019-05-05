const request = require("request");
const express = require("express");


function getdata(urldata, fn) 
{
    const URL = 'https://chain.so/api/v2/get_address_balance/BTC/';
        request(URL + urldata, (error, response, body) => 
        {
            if (error) throw fn(null, error.message);
            else 
            {
                const result = JSON.parse(body);
                return fn(result.data.confirmed_balance, null);
            }
        });
}

getdata("18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX", (data, error)=>{
    if(error)
        throw new Error(error);
    else 
        console.log(data);

});


/**
 * 
 * 
 * 1NTxf1H9PoWCUWnKcdfLtFtgGWxRmWWq83
 * 19Li3BpAigvtv2Z9ce4B5WwjXixfwqkgVy
 * 18cBEMRxXHqzWWCxZNtU91F5sbUNKhL5PX
 * 1CK6KHY6MHgYvmRQ4PAafKYDrg1ejbH1cE
 * 1H4o9Mh7HyjPa46z4vtv7J8yzaK5RY4bXR
 */



