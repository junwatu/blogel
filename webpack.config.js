'use strict'

var path = require('path')
var webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var src_dir = path.resolve(__dirname, 'src')
var js_dir = path.resolve(src_dir, 'js')
var build_dir = path.resolve(__dirname, 'public')

module.exports = {
 entry: path.resolve(js_dir, 'app.js'),
 output: { path: build_dir, filename: 'bundle.js' },
 module: {
   loaders: [
     {
       test: /.jsx?$/,
       loader: 'babel-loader',
       include: [js_dir],
       exclude: /node_modules/,
       query: {
         presets: ['es2015', 'react']
       }
     }
   ]
 },
 plugins: [
   new CopyWebpackPlugin([
     { from: './node_modules/jquery/dist/jquery.min.js'},
     { from: path.resolve(src_dir, 'css'), to: 'css' },
     { from: path.resolve(src_dir, 'fonts') , to: 'fonts' },
     { from: path.resolve(src_dir, 'favicon.ico') }
   ])
 ],
 devtool: 'source-map',
 devServer: {
   contentBase: build_dir
 }
}
