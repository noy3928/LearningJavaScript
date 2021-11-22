/* 화살표 함수는 실행 컨텍스트 생성 시 this를 바인딩하는 과정이 제외됐습니다. 즉 이 함수 내부에는 this가 아예 없으며, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근하게 됩니다. */

var obj = {
    outer: function(){
        console.log(this);
        var innerFunc = () => {
            console.log(this);
        };
        innerFunc();
    }
}
obj.outer();

