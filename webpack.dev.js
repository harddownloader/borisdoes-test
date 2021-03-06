const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	//	new ForkTsCheckerWebpackPlugin({ async: false }),
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		open: true,
		hot: true,
		port: 9000,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
})
