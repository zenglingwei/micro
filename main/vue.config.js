const path = require('path')
const variable = require('@2haohr/front-sass-variable')
const mixin = require('@2haohr/front-sass-mixin')
module.exports = {
    productionSourceMap: true,
    transpileDependencies: ['single-spa', 'qiankun', 'import-html-entry'],
    devServer: {
        port: 2000,
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
        loaderOptions: {
            scss: {
                additionalData:
                    Object.keys(variable)
                        .map(key => `$${key}:${variable[key]};`)
                        .join('\n') + `${mixin}`
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                components: '@/components',
                views: '@/views'
            }
        }
    },
    chainWebpack: config => {
        config.externals({
            vue: 'Vue2'
        })
    }
}
