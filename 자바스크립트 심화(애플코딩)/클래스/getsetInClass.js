class 사람 {
    constructor(){
        this.name = 'Park';
        this.age = 20;
    }

    get nextAge(){
        return this.age + 1
    }
    set setAge(나이){
        this.age = 나이
    }
}

var 사람1 = new 사람();


//데이터의 무결성. 데이터 출력, 수정 함수를 만드는 이유는 데이터의 무결성을 위해서이다. 무작정 데이터를 꺼내겠다는 것이 아니라, 데이터를 결함없이 사용하고 수정하고 싶을 때 사용하는 것. 

