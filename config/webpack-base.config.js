const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: { path: path.resolve(__dirname, '../dist') },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            assets: path.resolve(__dirname, '../src/assets/'),
            components: path.resolve(__dirname, '../src/components/'),
            store: path.resolve(__dirname, '../src/store/'),
            routes: path.resolve(__dirname, '../src/routes/'),
            services: path.resolve(__dirname, '../src/services/'),
            utils: path.resolve(__dirname, '../src/utils/'),
        },
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /.(css|less)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: { javascriptEnabled: true },
                    },
                ],
            },
            {
                test: /\.(jpg|jpeg|bmp|svg|png|webp|gif)$/,
                include: [path.resolve(__dirname, '../src')],
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 8192 },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_PROXY: process.env.IS_PROXY,
            NOVA_ROOT: process.env.NOVA_ROOT,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            favicon: path.resolve(__dirname, '../src/assets/logo.jpg'),
        }),
    ],
}
