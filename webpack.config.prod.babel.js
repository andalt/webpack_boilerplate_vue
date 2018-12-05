import merge from 'webpack-merge';
import autoPreFixer from 'autoprefixer';
import MiniCssExtractPlugin  from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import webpack from 'webpack';

import common from './webpack.config.common.babel';

const extractStyles = new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    allChunks: false
});

const config = {
    entry: [
        'js/index.js',
    ],

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
        extractStyles,
        new UglifyJsPlugin({
            uglifyOptions: {
                cache: true,
                parallel: true,
                sourceMap: true,
            },
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new OptimizeCSSAssetsPlugin({}),
    ],
};

module.exports = merge(common, config);
