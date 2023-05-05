const prod = process.env.NODE_ENV === 'production';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';

import { fileURLToPath } from "node:url";

const rootPath = fileURLToPath(import.meta.url);
const rootDirectory = path.dirname(rootPath);

const webPackConfig = {
  mode: prod ? 'production' : 'development',
  entry: {
    'app': './src/App.jsx',
    'sinchclient-sw': './src/scripts/serviceworkers/sinchclient-sw.js',
  },
  output: {
    filename: '[name].js',
    path: rootDirectory + '/../server/public',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    fallback: {
      path: false,
      fs: false,
      os: false,
    }
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [

      {
        test: /\.(jsx?)$/,
        exclude: [path.resolve('node_modules')],
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: 'babel-loader',
      },

      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [

          { loader: prod ? MiniCssExtractPlugin.loader : 'style-loader' },

          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          },

        ],
      },

      {
        test: /\.css$/,
        include: path.resolve(rootDirectory, 'node_modules/normalize.css'),
        use: [
          { loader: prod ? MiniCssExtractPlugin.loader : 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          },
        ]
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: path.resolve(rootDirectory, 'src'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: './src/assets/images/icon.ico',
      inject: 'body'
    }),
    new MiniCssExtractPlugin(),

    /*
      We just need to reference our dotenv's config to
      this app if we build this app and bundle it in 
      a nodejs server directory. Thus, we just need
      the configs in 'dotenv.config().parsed'

      When building this on-the-fly like for example
      in netlify, we need to reference the configs in
      netlify. Thus, we need the 'process.env' variable.
      Example: Object.entries(prod ? process.env : dotenv.config().parsed)
    */
    new webpack.DefinePlugin({
      ...Object.entries(dotenv.config().parsed).
        reduce((acc, curr) => (
          {
            ...acc,
            [`process.env.${curr[0]}`]: JSON.stringify(curr[1])
          }
        ), {}),
    }),
  ],
}

export default webPackConfig;