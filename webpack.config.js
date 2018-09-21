const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'build.js',
  },
  resolve: {
    modules: ['src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.styl(us)?$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    open: true,
  },
  devtool: '#eval-source-map',

  plugins: [
    new CopyWebpackPlugin([{ from: './src/resources', to: 'resources/' }]),
    new VueLoaderPlugin(),
    new webpack.EnvironmentPlugin({
      MOCKED: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  node: {
    fs: 'empty',
  },

  mode: process.env.NODE_ENV,
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ])
}
