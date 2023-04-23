const env = process.env
const ADBLOCK = is(env.ADBLOCK)
const CI = is(env.CI)
const COLOR = is(env.npm_config_color)
const DISABLE_OPENCOLLECTIVE = is(env.DISABLE_OPENCOLLECTIVE)
const SILENT = !!~['silent', 'error', 'warn'].indexOf(env.npm_config_loglevel)

function is(it) {
  return !!it && it !== '0' && it !== 'false'
}

function log(it) {
  console.log(COLOR ? it : it.replace(/\u001B\[\d+m/g, ''))
}

if (!ADBLOCK && !CI && !DISABLE_OPENCOLLECTIVE && !SILENT) {
  log('\u001B[96mThank you for using react-modalized (\u001B[94m https://github.com/kddaddy/react-modalized \u001B[96m) for modalizeing yor app!\u001B[0m\n')
  log('\u001B[96mAlso, the author of react-modalizing (\u001B[94m https://github.com/kddaddy \u001B[96m) is looking for a good job -)\u001B[0m\n')
}