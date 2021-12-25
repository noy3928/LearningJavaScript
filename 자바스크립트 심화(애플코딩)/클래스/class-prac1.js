class Dog {
    constructor(type, color){
        this.type = type;
        this.color = color;
    }

    한살먹기(){
        if(this instanceof Cat){
            return this.age + 1
        }
    }
}

const 강아지1 = new Dog('똥개', 'black');


class Cat extends Dog{
    constructor(type, color, age){
        super(type, color);
        this.age = age;
    }
}

const 고양이1 = new Cat('러시안블루', 'white', 2);



// 게임형 유닛 만들어보기. 

class Unit {
    constructor(공격력 = 5, 체력 = 100) {
        this.공격력 = 공격력
        this.체력 = 체력
    }

    get battlePoint (){
        return this.공격력 + this.체력
    }

    set heal(healPoint){
        return this.체력 = this.체력 + healPoint
    }
}

const sonic = new Unit();

console.log(sonic.battlePoint)