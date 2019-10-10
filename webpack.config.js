const path = require('path')
const htmlWebPackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/main.js'), //'./src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new htmlWebPackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(ttf|woff|woff2|eot|svg)$/, use: 'url-loader' },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' }
        ]
    }
}