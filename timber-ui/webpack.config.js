'use strict'

var webpack = require('webpack')
var env = process.env.NODE_ENV
var path = require('path')

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
}

var reactDOMExternal = {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom'
}

var reduxExternal = {
    root: 'Redux',
    commonjs2: 'redux',
    commonjs: 'redux',
    amd: 'redux'
}

var reactReduxExternal = {
    root: 'ReactRedux',
    commonjs2: 'react-redux',
    commonjs: 'react-redux',
    amd: 'react-redux'
}

var jssExternal = {
    root: 'jss',
    commonjs2: 'js-stylesheet',
    commonjs: 'js-stylesheet',
    amd: 'js-stylesheet'
}

var config = {
    entry: './src/timber.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'timber.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    externals: {
        'react': reactExternal,
        'react-dom': reactDOMExternal,
        'redux': reduxExternal,
        'react-redux': reactReduxExternal,
        'js-stylesheet': jssExternal
    },
    module: {
        loaders: [
            // { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // {
        //     apply: function apply(compiler) {
        //         compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
        //             this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
        //             return false
        //         })
        //     }
        // },
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(env)
        // })
    ]
}

if (env === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    )
}

module.exports = config