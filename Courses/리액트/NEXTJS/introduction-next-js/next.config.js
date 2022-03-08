// const dotenvLoad = require('next-env')
// const {default : next} = require('next')

// //자동으로 env 정보를 load하고 inject해준다. 
// dotenvLoad()

// const withEnv = next()
// /* 
// 내부의 모습 : 
// env : {
//   HELP_APP_URL : http://frontendmasters.com
// }
// */
// module.default = withEnv()

module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
  }
  return nextConfig
}