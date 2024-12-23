const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const ENABLE_SSR = process.env.ENABLE_SSR === 'true' ? true : false
const client_public_path = !ENABLE_SSR ? '/': '/static'

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
    devServer: ENABLE_SSR ? {} :{
        port: 3002,
        hot: true,
        compress: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'static'),
            publicPath: client_public_path,
        },
    },
    target: 'web',
    mode: 'development',
    entry: './src/Client.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: client_public_path,
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
    entry: './src/Server.jsx',
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