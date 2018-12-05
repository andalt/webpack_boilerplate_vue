import webpack from 'webpack';
import autoPreFixer from 'autoprefixer';
import path from 'path';
import merge from 'webpack-merge';
import common from './webpack.config.common.babel';

const config = {
    entry: [
        'js/index.js',
    ],

    devtool: 'eval-source-map',

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    'vue-style-loader',
                    'css-loader',
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

    devServer: {
        compress: true,
        port: 1111,
        inline: true,
        host: '0.0.0.0',
        contentBase: path.resolve(__dirname, './build'),
        historyApiFallback: true,
    },

    plugins: [
        new webpack.NamedModulesPlugin(),
    ],
};

export default merge(common, config);
