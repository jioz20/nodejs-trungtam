function veHinh(h,fn){
    for(let d = 1; d<=h; d++){
        let s = ''
        for(let c = 1; c<=h; c++){
            const dk = fn(h,d,c)  //bool
            if(dk) s+='*'
            else 
                s+=' '
        }
        console.log(s)
    }
}

veHinh(5,(h,d,c)=>{
    return c == h || d == h || c == h - d+1;
})