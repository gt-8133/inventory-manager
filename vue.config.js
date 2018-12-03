const webpack = require('webpack')

module.exports = {
  pwa: {
    name: 'inventory',
  },

  configureWebpack: {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/typeorm$/, function(result) {
        result.request = result.request.replace(/typeorm/, 'typeorm/browser')
      }),
      new webpack.NormalModuleReplacementPlugin(/\.\.\/Server$/, function(result) {
        result.request = result.request.replace(/Server$/, 'ServerFake')
      }),
    ],
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  },

  lintOnSave: false
}
