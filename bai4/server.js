const express = require('express');
const app = express();

app.get('/:so_a/:pheptinh/:so_b',(req,res)=>{
    const {so_a , pheptinh, so_b} = req.params
    const t = new Tinh(so_a,so_b,pheptinh)
    const result = t.getResult()
    res.send({
        so_a,
        so_b,
        pheptinh,
        result
    })
})


class Tinh{
    constructor(number_a,number_b,tenpheptinh){
        this.number_a = number_a;
        this.number_b = number_b;
        this.tenpheptinh = tenpheptinh
    }
    get pheptinh(){
        if(this.tenpheptinh==='cong') return '+'
        else if(this.tenpheptinh==='tru') return '-'
        else if(this.tenpheptinh==='nhan') return '*'
        return '/'
    }
    getResult(){
        const string = `${this.number_a} ${this.pheptinh} ${this.number_b}`
        return `${eval(string)}` 
    }
}

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('Server started on port '+port)
})