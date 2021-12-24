var 사람 = {
    name: 'Park',
    age: 30,
    nextAge(){
        return this.age + 1 // 함수를 만들어 object 데이터를 다루는 이유 :  1.object 자료가 복잡할 때 좋다 2.object 자료 수정시 좋다. 
    },
    setAge(나이){
        this.age = 나이; // 굳이 이렇게 만들면 좋은 이유는 데이터를 실수로 변경시킬 일이 적다. 
    }
}

사람.nextAge();

//parseInt와 Number의 차이점은 뭘까? 

