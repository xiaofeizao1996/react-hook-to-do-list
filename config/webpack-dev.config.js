const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack-base.config')

module.exports = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 7200,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8001',
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
})
