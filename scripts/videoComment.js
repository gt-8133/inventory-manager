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
  <h3><a href="https://circleci.com/gh/gt-8133"><img alt="clapper" height="30" width="20" src="https://lh3.googleusercontent.com/4-xBGWmF2OwFW2fJYJpVkvyGPKjOI1mhEo2SeMpNT9dk_aRw6xJud8iBFer_efE2Egj55Dfg6qWGkN5ESp7DndsxLYddxHNTOUFAdNqXO0jJFDhFPrSenXHIrSFNJmYcw2Qt8O_PA5baA7U9gmYIF1B-NWjUfBJ8eWhQ5zxIQs5YyvZLAatLPcnaVsp_hoeSOBHk2uRxaP5IHlnO2cZg1tzkmeJNWMALeYqaFcxcNZAQTOUPugNcbuQ6GjA4OScd_U0EBrcgWMHkz1Eo2meFKCXbqC7NkZhQhaD5crMxbzoBQ2L_9NxKm15oOhn-lS0K2QbHxjldjr1gFR_6wtsJ9HmrDWAhqN7AJAr0RnXl2b2t76m7FQqz0TEyxV3FlJsWJMWdkpQx9gKD2y6SFF0MuV1k8EHVQPyIdWNQjq2RmIPKSz3Q1gclcYmmEXo8_j7G_bGOk1np5Co-aMPgN6z0yhRaZl9Yn5LsQyRGiQpANBjo2OUcumhRN40eKHutjSlZ5CmJBtVoiHMWmkNfWoAW-8Fc6KNQIB_I8vIHIJpWe3V3wnaYLq6Urq3SFsCVzGNu0SfBsrQ1b1NZopinPLNy9pcXbCfZj7Gb2k6odpOuYHItkqijwxvsPhIM5I1lNzYpvBw7CeYylqTSRWS--OOZEpAQxiM8FGDwdvBpq8WqHeUdPUTjw1-zOLDM=w597-h901-no"></a> ${bot.env.commitMessage}</h3>
  :clapper: <strong>${bot.artifactLink('cypress/videos/main.spec.js.mp4', 'cypress test video')}</strong>
  `)
})
