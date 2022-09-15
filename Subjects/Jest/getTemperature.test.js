const getTemperature = require("./getTemperature")

jest.mock("./getJSON")
const getJSON = require("./getJSON")
// 모형인 getJSON() 함수가 이행된 값 0으로 이미 해석된 프로미스를 반환하게 만든다.
getJSON.mockResolvedValue(0)

describe("getTemperature()", () => {
  //첫번째 테스트. getTemperature()가 getJSON으로 원하는 URL로 호출하는지 확인
  test("Invokes the correct API", async () => {
    let expectedURL = "https://globaltemps.example.com/api/city/vancouver"
    let t = await getTemperature("Vancouver")
    //제스트 모형은 자신이 어떻게 호출되었는지 기억하고 있다.
    expect(getJSON).toHaveBeenCalledWith(expectedURL)
  })

  //두번째 테스드. getTemperature가 섭씨를 화씨로 정확히 변환하는지 확인.
  test("Converts C to F correctly", async () => {
    getJSON.mockResolvedValue(0)
    expect(await getTemperature("x").toBe(32))

    // 섭씨 100도는 화씨 212도로 변환되어야 한다.
    getJSON.mockResolvedValue(100)
    expect(await getTemperature("x").toBe(212))
  })
})
