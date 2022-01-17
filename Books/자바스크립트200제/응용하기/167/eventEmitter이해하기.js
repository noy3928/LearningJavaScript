class Emitter {
    constructor(){
        this.events = {};    
    }

    //메소드 on은 매개변수로 type과 listner를 받습니다. events에 키로 type을 지정하고, 해당 키 값에 listener를 추가합니다. 이는 어떤 종류의 이벤트인 경우, 해당 이벤트의 listener들을 모아 놓는 형태로 보면 됩니다. 
    on(type, listener){
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    }

    //메소드 emit은 매개변수로 type을 받습니다. 따라서 events에 type으로 저장된 값이 있는지 확인하고, 값이 유효한 경우 해당 이벤트의 listener들을 forEach로 순차적으로 돌아가면서 실행합니다. 
    emit(type){
        if(this.events[type]){
            this.events[type].forEach((listener) => {
                listener();
            })
        }
    }
}

module.exports = Emitter;

