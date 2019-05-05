let soA : number = 10;
let arr: (string| number)[] = ['a', 213, 213];

interface person {
    name: string,
    age?: number
}

function getName(obj:person) :person
{
    obj.name = '213';
    obj.age = 23;
    return obj;
}

const obj : person = {name: 'nam', age: 20}
const newObj = getName(obj);
console.log(newObj);


class Like {
    private checkLike: boolean= false;
    private totalLike: number = 10
    constructor(checkLike: boolean, totalLike: number)
    {
        this.checkLike = checkLike;
        this.totalLike = totalLike;
    }


    like()
    {
        if(this.checkLike == false)
            this.totalLike -= 1;
        else
            this.totalLike += 1;

        this.checkLike = !this.checkLike;
    }
}


const n1 = new Like(false, 10);
n1.like();
console.log(n1);