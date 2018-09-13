const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    serve: {
        content: path.resolve(__dirname, "../dist"),
        add: (app, middleware, options) => {
            const historyOptions = {
            };

            app.use(convert(history(historyOptions)));
        },
    }
});
