function fibovacci(num){
    if(num <= 1){
        return 1;
    }
    return fibovacci(num - 1) + fibovacci(num - 2);
}

onmessage = function(e) {
    //이벤트를 인자로 전달받으면 이벤트의 data속성을 통해 전달한 메시지에 접근할 수 있습니다.num상수는 메인 스크립트의 24라인에서 전달한 객체의 num속성 값입니다. 이 값은 피보나치 수열의 특정 위치를 나타냅니다.
    const num = e.data.num;
    console.log('메인 스크립트에서 전달 받은 메시지', e.data);
    if(num == null || num === ""){
        throw new Error('숫자를 전달하지 않았습니다');
    }
    const result = fibovacci(num);
    this.postMessage(result)
}