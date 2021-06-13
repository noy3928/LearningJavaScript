//setTimeout은 두개의 인자를 받습니다. 첫 번째 인자에는 일정 시간 후 실행될 함수를 정의합니다. 그리고 두 번째 인자에는 지연시간을 지정합니다.

const timer = {
  run: function () {
    if (this.t) console.log("이미 실행된 타이머가 있습니다");

    this.t = setTimeout(function () {
      console.log("1초 뒤에 실행됩니다.");
    }, 1000);
  },
  cancel: function () {
    if (this.t) clearTimeout(this.t); //this.t의 값이 유효한 상태에서만 clearTimeout을 실행합니다.
    this.t = undefined;
  },
};

timer.run();
timer.cancel();
timer.run();

//-----------------
//이전 setTimeout이 아무리 지연 시간이 0이어도, console.log('200제')코드 다음으로 실행 스택에 쌓입니다. 따라서 '200제' 문자열이 먼저 출력되고, 그 다음에 'JavaScript' 문자열이 콘솔 출력됩니다.
setTimeout(() => {
  console.log("JavaScript");
}, 0);

console.log("200제");
