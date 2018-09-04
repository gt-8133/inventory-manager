import * as sh from 'shelljs'
export const deploy = (
  gh_name: string,
  gh_email: string,
  temp_folder: string,
  dest_folder: string
) => {
  sh.exec('npm run build')
  sh.cp('-r', 'dist', temp_folder)
  sh.exec(`git checkout gh-pages`)
  sh.exec(`git branch --set-upstream-to=origin/gh-pages gh-pages`)
  sh.exec('git pull --rebase')
  sh.rm('-rf', dest_folder)
  sh.mkdir('-p', dest_folder)
  sh.cp('-r', `${temp_folder}/*`, dest_folder)
  sh.exec(`git add ${dest_folder}`)
  sh.exec(`git commit -m "Deploy ${dest_folder}"`)
  sh.set('-e')
  sh.exec('git push origin gh-pages -f')

  sh.exec('git checkout -')
}


if (!sh.which('git')) {
  sh.echo('Git not installed')
  sh.exit(1)
}
sh.exec('git config --global user.name "Ben Kucera - CI"')
sh.exec('git config --global user.email "14625260+Bkucera@users.noreply.github.com"')
const branch_name = sh.exec('git rev-parse --abbrev-ref HEAD').toString().trim()
deploy("bkucera", "benkucera@gmail.com", "tmp", branch_name)
