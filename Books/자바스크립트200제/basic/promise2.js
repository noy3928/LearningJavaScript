//promise조합하기
//하나의 비동기 계산이 다른 비동기 계산의 결과에 의해 처리되어야 하는 경우가 많습니다. promise가 나오기 이전에는 콜백 패터을 통해 비동기 처리를 하였고, 중첩된 비도기 코드들을 처리하다 보면 콜백 피라미드 형ㅇ태의 코드들이 쉽게 나왔었습니다.

//이런 비동기 코드들의 조합을 promise기반으로 작성하면 명료한 코드를 ㄹ작성할 수 있고 예외 처리를 손쉽게 할 수 있습니다. promise의 then메소드에서 새로운 비동기 코드를 실행하는 promise를 반환할 수 있는데, 다음 then메소드는 새롭게 만들어진 promise코드가 잏애되기 전까지 호출되지 않습니다.

function doJob(name, person) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (person.stamina > 50) {
        //스테미나가 50보다 많으면 약속이 실행됩니다.
        resolve({
          result: `${name} success`,
          loss: 30,
        });
      } else {
        // 스테미나가 50이하이면 약속은 거부됩니다
        reject(new Error(`${name} failed`));
      }
    }, 1000);
  });
}

const harin = { stamina: 100 }; // 스테미나 값 100을 가지는 객체를 정의합니다.

doJob("work", harin)
  .then((v) => {
    //work이름의 일을 수행하는 약속을 생성합니다. 전달될 스테미나의 값이 100이므로 성공적으로 이행되고, then 메소드 전달한 콜백 함수에 차ㅏ감될 스테미나와 결과값이 전달됩니다.
    console.log(v.result);
    harin.stamina -= v.loss;
    return doJob("study", harin);
  })
  .then((v) => {
    console.log(v.result);
    harin.stamina -= v.loss;
    return doJob("work", harin);
  })
  .then((v) => {
    console.log(v.result);
    harin.stamina -= v.loss;
    return doJob("study", harin);
  })
  .catch((e) => console.error(e));
