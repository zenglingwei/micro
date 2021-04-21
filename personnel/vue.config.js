const { name } = require('./package')
module.exports = {
    productionSourceMap: true,
    devServer: {
        port: 2003,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        proxy: {
            '/api': {
                target: 'https://dev.2haohr.com',
                changeOrigin: true,
            },
        },
    },
    // 自定义webpack配置
    configureWebpack: {
    output: {
        library: `${name}-[name]`,
        libraryTarget: 'umd', // 把子应用打包成 umd 库格式
        jsonpFunction: `webpackJsonp_${name}`,
        },
    },
    chainWebpack: config => {
        config.module
            .rule('fonts')
            .test(/.(ttf|otf|eot|woff|woff2)$/)
            .use('url-loader')
            .loader('url-loader')
            .tap(options => ({ name: '/fonts/[name].[hash:8].[ext]' }))
            .end()
    },
}
