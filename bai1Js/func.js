function inSo(n, dk) 
{
    {
        for(let i = 0; i < n; i++)
        {
            const check = dk(i);
            if(check)
                console.log(`${check} == ${i}`);
        }
    
    
    }
};

inSo(100, function(n){
    if(n % 2 === 1)
        return -1;
    else if(n % 2 === 0)
        return 1;
});


a = [1,23,4,15,123,57,55];

a.forEach(element => {
    console.log(element);
});


// i = 1; j =5;
// i = 2; j = 5; j = 4;
// i = 3; j = 5; j =3 ;
// i = 5; j= 1,2,3,4,5



//Function return function
function getData(){
    function sum(a,b){
       console.log(a+b);
    }
    return sum;
}
getData()(2,124);


