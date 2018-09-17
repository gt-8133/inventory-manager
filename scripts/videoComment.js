// eslint-disable-next-line
const bot = require('circle-github-bot').create()
const fs = require('fs')

fs.readFile('/tmp/pass', (err) => {
  if (err) {
    return bot.comment(`
  <h3>${bot.env.commitMessage}</h3>
  :x: :clapper: <strong>${bot.artifactLink('cypress/videos/main.spec.js.mp4', 'cypress test video')}</strong>
`)
  }
  return bot.comment(`
  <h3>${bot.env.commitMessage}</h3>
  :white_check_mark: :clapper: <strong>${bot.artifactLink('cypress/videos/main.spec.js.mp4', 'cypress test video')}</strong>
  `)
})
