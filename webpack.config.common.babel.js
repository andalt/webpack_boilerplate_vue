import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

import APP_CONFIG from './config/configApp.json';

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    mode: 'none',

    context: path.resolve(__dirname, 'src'),

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/index.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                [
                                    '@babel/preset-env',
                                    { targets: { browsers: 'last 2 versions' } },
                                ],
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                            ],
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                oneOf: [
                    // это применяется к `<template lang="pug">` в компонентах Vue
                    {
                        resourceQuery: /^\?vue/,
                        use: ['pug-plain-loader'],
                    },
                    {
                        use: ['file-loader?name=[name].html', 'pug-html-loader'],
                    },
                    // это применяется к импортам pug внутри JavaScript
                    {
                        use: ['raw-loader', 'pug-plain-loader'],
                    },
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|jpe?g|png|gif|svg)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },

    resolve: {
        modules: [
            path.resolve(__dirname, './src'),
            'node_modules',
        ],

        extensions: ['.js', '.jsx', '.json', '.vue'],

        alias: {
            vue: 'vue/dist/vue.js',
            Styles: path.resolve(__dirname, './src/scss'),
            Js: path.resolve(__dirname, './src/js'),
            Pug: path.resolve(__dirname, './src/pug')
        },
    },

    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, './build')),

        new webpack.ProvidePlugin({
            Promise: 'es6-promise'
        }),

        new CopyWebpackPlugin([{
            from: 'public',
            to: path.resolve(__dirname, './build')
        }]),

        new VueLoaderPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            APP_CONFIG: JSON.stringify(APP_CONFIG),
        }),
    ]
};

module.exports = config;
