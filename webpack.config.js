const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    optimization: {
        chunkIds: 'named',
    },
    mode: "development",
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
          test: /\.(jpe?g|png|gif|svg)$/i, 
          type: "asset/resource",
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      }),

      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
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
