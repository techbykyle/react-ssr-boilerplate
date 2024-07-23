const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const babelLoader = {
    rules: [
        {
            test: /.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env', 
                        ['@babel/preset-react', { runtime: 'automatic' }]
                    ],
                },
            },
        },
    ],
}

const resolve = {
    extensions: ['.js', '.jsx'],
}

const clientConfig = {
    name: 'client',
    devServer: {
        port: 3002,
        hot: true,
        compress: true
    },
    target: 'web',
    mode: 'development',
    entry: './src/client.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/static',
        filename: 'client.js',
    },
    module: babelLoader,
    plugins: [
        new htmlWebpackPlugin({
            template: `${__dirname}/src/index.html`,
        })
    ],
    resolve
}  

const serverConfig = {
    name: 'server',
    mode: 'development',
    target: 'node',
    entry: './src/server.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'server.cjs',
    },
    module: babelLoader,
    plugins: [
        new htmlWebpackPlugin({
            template: `${__dirname}/src/index.html`,
        })
    ],
    externals: [nodeExternals()],
    resolve
}

module.exports = [clientConfig, serverConfig]