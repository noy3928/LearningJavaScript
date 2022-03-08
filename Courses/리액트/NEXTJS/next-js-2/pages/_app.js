import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Footer from "../src/component/Footer"
import Top from '../src/component/Top'

/**
 * 
 * @param {이것은 현재 페이지를 의미한다. 페이지가 변경될 시에 이 컴포넌트가 변경된다.} param Component
 * @param {데이터 패칭 메서드를 통해 미리 가져온 데이터이다. } param pageProps
 * @returns 
 */
function MyApp({ Component, pageProps }) {
  return (
  <div>
    <Top/>
    <Component {...pageProps} />
    <Footer/>
  </div>
  )

}

export default MyApp


/*
페이지 전환 시 레이아웃을 유지할 수 있다. 
페이지 전환 시 상태값을 유지할 수 있다. 
커스텀 에러 핸들링을 할 수 있다. 
추가적인 데이터를 페이지로 주입시켜주는 것이 가능하다. 
글로벌 css를 이곳에 선언한다. 
*/