const getDevConfig = (env) => require('./config/webpack.config.dev')(env.NODE_ENV, env.API)
const getProdConfig = (env) => require('./config/webpack.config.prod')(env.NODE_ENV, env.API)

module.exports = (env) => {
  env.NODE_ENV === 'dev'
    ? console.info('--> ./config/webpack.config.dev.js')
    : console.info('--> ./config/webpack.config.prod.js')

  console.info('Api of ====> ', env.API || 'semenov')
  
  return env.NODE_ENV === 'dev' ? getDevConfig(env) : getProdConfig(env)
}
