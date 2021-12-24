var 사람 = {
    name: 'Park',
    age: 30,
    nextAge(){
        return this.age + 1 // 함수를 만들어 object 데이터를 다루는 이유 :  1.object 자료가 복잡할 때 좋다 2.object 자료 수정시 좋다. 
    },
    set setAge(나이){
        this.age = 나이; // 굳이 이렇게 만들면 좋은 이유는 데이터를 실수로 변경시킬 일이 적다. 
    }
}

사람.nextAge();

사람.setAge = '20'; // set 키워드를 사용하면 왼쪽처럼 소활호를 사용하지 않고도 함수를 사용할 수 있다. 

//parseInt와 Number의 차이점은 뭘까? 

