import merge from 'webpack-merge';
import autoPreFixer from 'autoprefixer';
// import path from 'path';
import MiniCssExtractPlugin  from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import common from './webpack.config.babel.common';

const extractStyles = new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    allChunks: false
});

const config = {
    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoPreFixer({
                                browsers: ['last 2 versions']
                            })]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        extractStyles
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
};

module.exports = merge(common, config);
