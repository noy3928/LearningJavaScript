//비동기 처리를 하기 위해 promise 객체를 소개했습니다. promise는 객체로써 언젠가 완료될 일을 나타냅니다. 완료되면 하나의 값을 결과로 반환하는데 실패하여 정상적인 값 대신 실패의 이유를 반환할 수도 있습니다.

//promise객ㅊ는 다음과 같은 세 가지의 상탤르 가집니다.
//1.대기중: 아직 결과가 없는 상태입니다. 약속을 해지만 아직 약속에 대한 결과가 나오지 않은 상태입니다.
//2.이행됨 : 비동기 처리가 성공적으로 완료되어 약속을이행한상태입니다. 이때 결과로 하나의 값이 전달됩니다.
//3.거부됨 : 비동기 처리가 실패한 상태입니다.약속이 거부되고 그 결과로 거절된 이유를 전달합니다.

//-----promise객체는 두 가지 메소드를 가집니다.
//them: 약속이 완료되었을 때 호출될 함수들을 정의합니다. 이때 첫 번째 인자로 전달되는 함수는 약속이 성공적으로 이행됐을 때 호출되고 두 번째 인자로 전달된 함수는 거부됐을 때 호출됩니다. 두 전달 인자 함수들은 ㅁ개 변수를 가지는데 각각의 결과가 매개 변수를 통해 전달됩니다.
//catch: 약속이 거부됐을 때 호출될 함수 를 등록합니다.

//promise객체는 promise 생성자 함수에 new키워드를 통해 생성할 수 있습니다. 이때 계산될 코드를 담은 함수를 인자로 전달하는데 이 함수에는 resolve와 reject매개변수를 가집니다. resolve는 야속을 성공시킬 수 있는 함수로 호출 시 결과를 인자로 전달합니다. 반면 reject는 실패 처리를 위한 함수로 호출 시 실패 이유를 함께 전달할 수 있습니다. 즉, promise생성자 함수에 전달되는 함수의 본문에는 나중에 계산이 완료되는 일을 작성하게 됩니다.
function promiseForHomework(mustDo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("doing homework");
      //promiseForHomework에서 전달받은 인자 값의 유무에 따라 resolve함수 또는 reject함수가 호출됩니다. resolve함수가 호출되면 이후에 then 메소드에 전달된 첫번째 인자의 함수가 호출되고, 이때 resolve에 전달 인자가 then 메소드의 전달된 함수의 매개변수로 전달됩니다.
      if (mustDo) {
        resolve({
          result: "homwork-result",
        });
      } else {
        reject(new Error("Too lazy!"));
      }
    });
  });
}

//새로운 숙제 promise 객체를 생성합니다. 이때 true를 인잘 전달하여 3초후에 약속이 꼭 이행되게 합니다. 그리고 콘솔에 'promiseA created'를 출력합니다. 4라인의 코드보다 나중에 작성하였어도 4라인은 3초후에 실행되는 비동기코드이기 때문에 콘솔에 'promiseA created'가 먼저 출력됩니다.
const promiseA = promiseForHomework(true);
console.log("promiseA created");

const promiseB = promiseForHomework();
console.log("promiseB created");

//각 promise객체에 resolve와 reject가 되었을 경우 호출될 함수들을 정의합니다. promisea객체는 resolve가 되어 "result"가 콘솔에 출력되고, promiseB객체ㅐ는 reject가 되서 24라인에 전달한 함수는 호출이 안되고 catch메소드에 전달한 함수가 호출되어 거절된 이유닌 에러 객체가 콘솔에 에러로 출력됩니다.
promiseA.then((v) => console.log(v));

promiseB.then((v) => console.log(v)).catch((e) => console.error(e));

// 위 코드를 크롬 콘솔에서 확인하면 다음과 같습니다.
/*
promiseA created
promiseB created
doing homework 
{result: "homework - result"}
doing homework
Error: Too lazy!
*/
