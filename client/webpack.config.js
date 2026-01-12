const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/index.jsx', // Entry point of your React app
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory for the bundle
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // Regex to target .js and .jsx files
                exclude: /node_modules/, // Don't transpile node_modules
                use: {
                    loader: 'babel-loader', // Use Babel to transpile ES6+ and JSX
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                        ],
                    },
                },
            },
            {
                test: /\.(css)$/i, // Regex to target CSS files
                use: ['style-loader', 'css-loader'], // Load and inject CSS into the bundle
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/i, // Regex to target image files
                type: 'asset/resource', // Use asset/resource to emit files and provide URLs
                generator: {
                    filename: 'static/images/[name][hash:8][ext]', // Customize output file name and path
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve .js and .jsx extensions
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Serve content from the dist folder
        },
        compress: true,
        port: 3000,
        historyApiFallback: true, // Handles routing for SPA apps
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './Public/index.html', // Point to your HTML template
            filename: 'index.html',
        }),
        new webpack.DefinePlugin({
          'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL)
        }),
        new NodePolyfillPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(
                        __dirname,
                        'Public/img/FireflyLaser.jpg'
                    ),
                    to: 'static/images', // Output directory in `dist`
                },
            ],
        }),
    ],
}
