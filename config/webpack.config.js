const path = require('path');
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: paths.mainJs,
    output: {
        filename: 'bundle-[hash].js',
        path: paths.buildPath
        },
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
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.html,
            inject: true
        })
    ]
  };