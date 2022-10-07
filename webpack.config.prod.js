const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

const path = require('path');

const productionGzipExtensions = ['js', 'css'];

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: "js/bundle.[contenthash].min.js",
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    }, 
    context: path.resolve(__dirname, './src'),
    optimization: {
        chunkIds: 'named',
    },
    mode: "production",
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
            "@": [
                path.resolve(__dirname, './src/'),
            ],
        },
        fallback: {
          "buffer": require.resolve("buffer")
      }
    },
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            use: ['ts-loader']
        },
        {
            test: /\.html/,
            use: ['html-loader']
        },      
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                  modules: true,
                  localIdentName: '[local]'
                  }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.mp3$/,
          loader: 'file-loader'
      },
        {
          test: /\.(jpe?g|png|gif|svg)$/i, 
          type: "asset/resource",
      }]
    },
    plugins: [
      new NodePolyfillPlugin(),
      new CopyWebpackPlugin({
        patterns: [
            { from: '../public' }
        ]
      }),
      new HtmlWebpackPlugin({ template: 'index.html.ejs', publicPath: '/' }),
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
    ],
    devServer: {
      port: 8000,
      historyApiFallback: true,
    },
    experiments: {
      asyncWebAssembly: true,
      syncWebAssembly: true
    },
  };
