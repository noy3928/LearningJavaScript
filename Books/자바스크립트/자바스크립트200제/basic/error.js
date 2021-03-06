//자바스크립트 코드를 실행하다 에러가 발생하면 그 즉시 중단됩니다. 이를 대비해서 예외처리는반드시 필요합니다. 자바스크립트에서 사용할 수 있는 예외처리 방버에는 throw문과 try-catch문이 있습니다.
//예외처ㅏ리시 에러 종류는 크게 두 가지로 나눕니다. 하나는 예상치 못한 에러, 다른 하나는 개발자가 의도한 에러가 잇습니다. 개발자가 의도한 에러란 ,코드에서 잘못될 가능성을 예상하고 발생시키는 에러를 말합니다. 먼저 후자의 경우 throw문을 사용합니다. throw문은 고의로 에러를 발생시켜 예외상황을 알리는 역할을 합니다.

//숫자형 값 여부를 확인하는 함수를 선언합니다.
function checkNumber(val) {
  //숫자형 값이 아닌 경우, throw문을 통해 함수 블록을 빠져나갑니다.
  if (typeof val !== "number") throw "유효하지 않은 값입니다. ";
  console.log("숫자형 값으로 확인되었습니다. ");
}

checkNumber(100); // '숫자형 값으로 확인되었습니다. '
checkNumber("Wrong type"); //  '유효하지 않은 값입니다. ';
console.log("완료");

//throw문은 예외 상황을 미리 파악하고 에러를 발생시켜 이후 코드가 실행되지 않도록 합니다. 이는 결국 에러를 발생시킨 것이므로, 프로그램이 중단되는 것은 막을 수 없습니다. 이 에러 발생에 대한 대응책이 바로 try-catch-finally문 입니다. 그리고 try-catch-finally문을 통해 앞에서 설명한 예상치 못한 에러와 개발자가 의도한 에러 모두 대응가능합니다.

//try-catch-finally문은 try블록 안에서 발생된 에러를 잡아내고, catch블록으로 제어권을 넘깁니다. try블록에서 발생된 에러 정보는 catch문의 변수로 전달되기 때문에, 개발자는 프로그램 종료 없이 어떤 에러가 발생했는지 확인할 수 있습니다. finally블록은 에러 발생 여부와 상관없이 실행되는 블록입니다. 예를 들어, 이를 활용하면 파일 읽기/ 쓰기를 할 때 에러가 발생하더라도 항상 파일 close구문을 실행할 수 있습니다.

function checkNumbers(val) {
  if (typeof val !== "number") throw "유효하지 않은 값입니다. ";
  console.log("숫자형 값으로 확인되었습니다.");
}

try {
  checkNumbers(100);
  checkNumbers("wrong type"); //이 라인에서 에러가 발생합니다. 그러나 try문의 블록안에 있기 때문에 발생된 에러 정보는 catch블록으로 전달됩니다.
} catch (e) {
  //변수 e에 에러 정보가 전달됩니다. 여기에는 2라인에서 throw문의 문자열 '유효하지 않은 값입니다.'가 대입되어 있습니다. 콘솔로 에러 정보를 출력합니다.
  console.log(`에러가 발생했습니다. >>> ${e}`);
} finally {
  //이 블록은 위의 코드가 모두 처리되고 난 뒤 마지막에 실행됩니다. 에러 여부와 상관없이 항상 실행되기 때문에 '완료'문자열이 출력됩니다.
  console.log("완료");
}
