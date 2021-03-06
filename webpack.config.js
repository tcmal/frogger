var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	mode: 'development',
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},
	plugins: [],
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			use: ['babel-loader'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			include: path.join(__dirname, 'src')
		}]
	},
	devServer: {
		historyApiFallback: true,
		hot: true
	}
};
