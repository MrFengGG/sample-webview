const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const apiMocker = require('webpack-api-mocker');

module.exports = {
    entry: paths.mainJs,
    output: {
        filename: 'bundle-[hash].js',
        path: paths.buildPath
        },
    devtool:'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },{
                 test: /\.css$/, 
                 use: ['style-loader', 'css-loader'] 
            },{ 
                test: /\.(png|jpg|jpeg|gif)$/, 
                use: 'url-loader' 
            },
        ]
    },
    devServer: {
        before(app){
           apiMocker(app, paths.mockPath, {
            changeHost: true,
           })
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.html,
            inject: true
        }),
        new CleanWebpackPlugin([paths.buildPath],{
            root: paths.rootPath,
            verbose: true
        })
    ]
  };