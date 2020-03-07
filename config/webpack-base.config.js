const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, '../src/index.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
	},
	module: {
		rules: [
			{
				test: /.js$/,
				use: 'babel-loader',
			},
			{
				test: /.(css|less)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
						options: {
							javascriptEnabled: true,
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html'),
		}),
	],
};
