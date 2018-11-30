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
    ],
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  },

  lintOnSave: false
}
