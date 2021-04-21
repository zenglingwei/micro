const { name } = require('./package')
const variable = require('@2haohr/front-sass-variable')
const mixin = require('@2haohr/front-sass-mixin')
module.exports = {
    productionSourceMap: false, // 生产环境禁用
    configureWebpack: {
        devtool: false // 开发环境禁用
    },
    devServer: {
        port: 2001,
        allowedHosts: ['http://106.75.175.67:2000/'],
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api': {
                target: 'https://dev.2haohr.com',
                changeOrigin: true
            }
        }
    },
    css: {
        sourceMap: false,
        loaderOptions: {
            scss: {
                additionalData:
                    Object.keys(variable)
                        .map(key => `$${key}:${variable[key]};`)
                        .join('\n') + `${mixin}`
            }
        }
    },
    // 自定义webpack配置
    configureWebpack: {
        output: {
            library: `${name}-[name]`,
            libraryTarget: 'umd', // 把子应用打包成 umd 库格式
            jsonpFunction: `webpackJsonp_${name}`
        }
    },
    chainWebpack: config => {
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        config.module
            .rule('fonts')
            .test(/.(ttf|otf|eot|woff|woff2)$/)
            .use('url-loader')
            .loader('url-loader')
            .tap(options => ({ name: '/fonts/[name].[hash:8].[ext]' }))
            .end()
    }
}
