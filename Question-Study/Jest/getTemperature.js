const getJSON = require("./getJSON.js")

/**
 * getTemperature()는 도시 이름을 받고 그 도시의 현재 기온을 화씨 단위로
 * 나타낸 값으로 해석되는 프로미스를 반환한다. 이 함수는 세계 기온을 섭씨 단위로
 * 제공하는 가상의 웹서비스를 사용하여 만들었다.
 */
module.exports = async function getTemperature(city) {
  //웹서비스에서 기온을 섭씨 단위로 가져온다.
  let c = await getJSON(
    `https://globaltemps.example.com/api/city/${city.toLowerCase()}`
  )
  //화씨 단위로 변환해서 반환한다.
  return (c * 5) / 9 + 32 // TODO : 공식확인
}
