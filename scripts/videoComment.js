// eslint-disable-next-line
const bot = require('circle-github-bot').create()
const fs = require('fs')

fs.readFile('/tmp/pass', (err) => {
  if (err) {
    return bot.comment(`
  <h3>:x: ${bot.env.commitMessage}</h3>
  :clapper: <strong>${bot.artifactLink('cypress/videos/main.spec.js.mp4', 'cypress test video')}</strong>
`)
  }
  return bot.comment(`
  <h3><a href="https://circleci.com/gh/gt-8133"><img alt="check" src="https://lh3.googleusercontent.com/JlrOjw3RASE75RHF-SPGfqM_webSjGqslRV5WEyZS5usuRIE40Xu_ynUy5-7XxeTjszs04j4bBd671Z7YLIc_cPigFcNLOjWeKXKLppNXNh5m2bps-m7hzFsN_Yaq0ZFmk3pfsjSncNAM4ajYL4RylEqrfSuZBPoXhzhZ-qcx_jOc6Na4w8aTVvz5K7co1-86L2XIl58rj0fJJbbO_4g6HQCbytfnJG8-lGSUI9H6isgLvZQS6hqEJtxzyPNZ4j0Fp0L21HbIUVuhcTfOTBkDgqGgwvbGeGNIkjU9zSXzH09Ji1E3WB1mZiOx9f7PN0XKWIniJi3DaS1KmwQpMTInMLZm266iJGGpeNIeE-M8nVcnj7_0BNn4u7RE23H3TkvP3EzYXzRWJApRCl_-0AfyAok_N_RBFBMkIa_79n79HeAreWr9YSk_wBSeB95Debbh9KUsWg-QtpRWE2s3EmbBjkhgWubS8hAjuitKIb8efhSI-hw0yCtC01P7weNL1ECfVxF0fgM-EmCcDSUkjmaDfrtT732bzWCeEb45MfHMv8Us1am81HfDLG1uQPhQPP1H51FMwa_8ur5ML1aTztCiFEAImRpO3PDbxKi7jm5ivb3gpPGPtJIzVF7OcuQbQ3ZH9CDsuidynox5tEyaBje5TwqLP3tk9nfWrIxB1KAAHv1f5rNViGJsmtF=s32-no"></a> ${bot.env.commitMessage}</h3>
  :clapper: <strong>${bot.artifactLink('cypress/videos/main.spec.js.mp4', 'cypress test video')}</strong>
  `)
})
