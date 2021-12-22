// webpack.config.js
var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		'main': './src/main.ts'
	},
	output: {
		//filename: '[name].js',
		filename: 'MAIN_TYPESCRIPT_SDK.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'var',
    	library: 'MAIN_TYPESCRIPT_SDK'
  },
  mode :'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader']
			}
		]
	},
	resolve : {
		//root: __dirname,   
		modules: [
			'node_modules',
			//'./src/components'
		],
		extensions: ['.js', '.ts']
	},
	node: { fs: 'empty' , net : 'empty', tls : 'empty'}   // 웹팩 compile 시 오류 처리
};