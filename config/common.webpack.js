const paths = require('./paths.webpack.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  commonModules: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.js$/,
        exclude: '/node_modules',
        loader: 'babel-loader'
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
                  })
                ],
                sourceMap: true
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline'
      }
    ]
  },
  commonPlugins: [
    new HtmlWebpackPlugin({
      template: paths.src + '/template.html',
      favicon: paths.src + '/img/favicon.png',
      filename: 'index.html'
    }),
    new StylelintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/static', to: 'static' }
      ]
    })
  ],
  commonResolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '~': paths.src
    },
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },
};