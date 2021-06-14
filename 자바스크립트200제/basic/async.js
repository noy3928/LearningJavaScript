//async함수는 함수 안의 await 구문과 함께 비동기 작업을 제어합니다. await키워드는 반드시 async함수 안에서만 유효합니다.

const { reject } = require("async");

//async함수의 동작 방식은 다음ㅁ과 같습니다. 처음 async함수가 호출되어 await키워드가 있는 비동기 작업이 실행되면, 해당 비동기 함수는 이벤트 루프를 통해 비동기 작업을 처리합니다. 그 동안 async함수는 이러한 비동기 작업이 완료될 때까지 일시 중지  상태로 비동기 작업의 해결을기다립니다. 이 작업이 완료됨면 async함수가 다시 실행되고 함수 결과르 반홥합니다.

//async함수를 선언하는 방법ㅇ는 함수선언문과 함수 표현식이 있습니다.

function doJob(name, person) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (person.stamina > 50) {
        person.stamina -= 30;
        resolve({
          result: `${name} success`,
        });
      } else {
        reject(new Error(`${name} failed`));
      }
    }, 1000);
  });
}

const harin = { stamina: 100 };

const execute = async function () {
  // execute 함수 내부에 비동기 작업을 제어합니다.
  try {
    // 비동기 로직 앞에 await 키워드를 추가하면, 비동기 작업이 끝날 떄까지 기다렸다가 다음 문장 코드를 처리합니다. 따라서 17-20라인이 순서대로 실행될 것으로 보입니다.
    let v = await doJob("work", harin);
    console.log(v.result);
    v = await doJob("study", harin);
    console.log(v.result);
    v = await doJob("work", harin);
    console.log(v.result);
    v = await doJob("study", harin);
  } catch (e) {
    console.log(e);
  }
};

execute();
