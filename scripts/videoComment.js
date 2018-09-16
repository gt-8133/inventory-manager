// eslint-disable-next-line
const bot = require('circle-github-bot').create()

bot.comment(`
<h3>${bot.env.commitMessage}</h3>
:clapper: <strong>${bot.artifactLink('cypress/videos/main.spec.js.mp4', 'cypress test video')}</strong>
`)
