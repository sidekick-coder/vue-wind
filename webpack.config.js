const path = require('path');
const MiniCssExtractplugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/index.ts',
    mode: process.env.NODE_ENV || 'production',
    devtool: 'inline-source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'babel-loader' },
                    { loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } }
                ]
            },
            {
                test: /\.svg$/,
                loader: [
                    'babel-loader',
                    'vue-svg-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    MiniCssExtractplugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('tailwindcss'),
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractplugin({
            filename: 'css/[name].css'
        })
    ],
    output: {
        filename: 'index.js',
        library: 'VueWind',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    }
};
