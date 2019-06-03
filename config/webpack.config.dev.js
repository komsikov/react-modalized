const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const PATHS = {
  lib: path.join(__dirname, '../lib'),
  src: path.join(__dirname, '../src'),
  public: path.join(__dirname, '../public'),
  dist: path.join(__dirname, '../dist'),
}

const apiUrls = {
  semenov: 'http://api-corp-semenov.develop.paxport.tech',
  khimich: 'http://apicorp-khimich.develop.paxport.tech',
}

module.exports = (NODE_ENV, API = 'semenov') => ({
  mode: 'development',
  entry: {
    app: `${PATHS.src}/app.tsx`
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(PATHS.dist, {}),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.public, 'index.html'),
      favicon: `${PATHS.public}/favicon.ico`,
      title: 'Paxport',
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#ffffff',
      },
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.public}/favicon.ico`, to: PATHS.dist },
    ]),
  ],
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loaders: 'ts-loader'
      },
      {
        test: /((?<!\.module)\.(styl|css))$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[name]__[local]',
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: ['last 3 versions', 'iOS 9'],
                    sourceMap: true,
                  }),
                ],
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {sourceMap: true},
            },
            {
              loader: 'stylus-loader',
              options: {sourceMap: true},
            },
          ]
        })
      },
      {
        test: /\.(module.styl|module.css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]',
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: ['last 3 versions', 'iOS 9'],
                    sourceMap: true,
                  })
                ]
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {sourceMap: true},
            },
            {
              loader: 'stylus-loader',
              options: {sourceMap: true},
            },
          ]
        })
      },
      {
        test: /\.(svg|png|jpg|ttf)$/,
        // exclude: ['/src/images/maps'], TODO не исключает если используется react-svg-loader
        loaders: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      // loader для вагонов
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '/images/map')
        ],
        loader: 'svg-react-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      lib: path.resolve(__dirname, `${PATHS.lib}`),
      interfaces: path.resolve(__dirname, `${PATHS.src}/interfaces`),
      types: path.resolve(__dirname, `${PATHS.src}/types`),

      images: path.resolve(__dirname, `${PATHS.src}/assets/images`),
      styles: path.resolve(__dirname, `${PATHS.src}/assets/styles`),
      services: path.resolve(__dirname, `${PATHS.src}/services`),
      actions: path.resolve(__dirname, `${PATHS.src}/actions`),
      utilities: path.resolve(__dirname, `${PATHS.src}/utils`),
      selectors: path.resolve(__dirname, `${PATHS.src}/selectors`),
      validations: path.resolve(__dirname, `${PATHS.src}/_validations`),
      constants: path.resolve(__dirname, `${PATHS.src}/constants`),
      containers: path.resolve(__dirname, `${PATHS.src}/containers`),
      components: path.resolve(__dirname, `${PATHS.src}/components`),
      appComponents: path.resolve(__dirname, `${PATHS.src}/components/_app`),
      formComponents: path.resolve(__dirname, `${PATHS.src}/components/_Form`),
      modals: path.resolve(__dirname, `${PATHS.src}/components/_modals`)
    }
  },
  // alias: {
  //   styles: path.resolve(__dirname, './src/assets/styles'),
  // },
  // global obj
  externals: {
    config: JSON.stringify({
      apiURL: apiUrls[API],
      apiGET: 'http://hotel-service-semenov.develop.paxport.tech/app',
      sentryDNS: NODE_ENV === 'prod'
        ? 'http://ee6d3f2f9d56435b9b2f38792304ac40@148.251.69.148:9000/7'
        : 'http://13c6824bd5e14f25af4660de752d60ec@148.251.69.148:9000/4',
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCh5VV-7IGMf_3mmoEat4QmXjbL49l_8kA'
    })
  },
  devServer: {
    contentBase: PATHS.dist,
    publicPath: '/',
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 8888
  }
})
