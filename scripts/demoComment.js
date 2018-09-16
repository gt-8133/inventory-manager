// eslint-disable-next-line
const bot = require('circle-github-bot').create()

bot.comment(`
<h3>${bot.env.commitMessage}</h3>
<strong>${bot.artifactLink('dist/index.html', 'demo')}</strong>
`)
