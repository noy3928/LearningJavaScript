


var 사람 = {
    name: 'Park',
    age: 30,
    get nextAge(){
        return this.age + 1 // 함수를 만들어 object 데이터를 다루는 이유 :  1.object 자료가 복잡할 때 좋다 2.object 자료 수정시 좋다. 
    },
    set setAge(나이){
        this.age = 나이; // 굳이 이렇게 만들면 좋은 이유는 데이터를 실수로 변경시킬 일이 적다. 
    }
}

사람.nextAge; // 이런식으로 get 키워드를 붙이면 ()를 붙이지 않고도 사용가능하다. 

사람.setAge = '20'; // set 키워드를 사용하면 왼쪽처럼 소활호를 사용하지 않고도 함수를 사용할 수 있다. 

//parseInt와 Number의 차이점은 뭘까? 

//* 기억하기 *
//set은 데이터를 변경하는 함수에, 
//get은 데이터를 꺼내쓰는 함수에. 

// get & set을 이용하면 property화 해준다. 그래서 소괄호()가 필요없어진다. 



