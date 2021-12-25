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
