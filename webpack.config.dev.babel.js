import merge from 'webpack-merge';
import autoPreFixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common from './webpack.config.common.babel';

const extractStyles = new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    allChunks: false,
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
                            publicPath: '../',
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoPreFixer({
                                browsers: ['last 2 versions'],
                            })],
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        extractStyles,
    ],
};

module.exports = merge(common, config);
