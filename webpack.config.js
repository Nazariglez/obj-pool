'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'source-map',
	entry: ['./src/ObjPool.js'],
	output: {
		path: "./build",
		filename: 'obj-pool.js',
		library: "ObjPool",
		libraryTarget: "umd"
	},
  resolve: {
    extensions: ["", ".js"]
  },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader',
        query: {
          presets: ['es2015','stage-0'],
					plugins: ['add-module-exports']
        }
			}
		]
	}
};
