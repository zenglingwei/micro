/**
 * 基础接口调用时的错误处理
 */

export default {
    responseSuccess({ config, data }) {
        
        if (!data) {
            return Promise.reject(data)
        }
        if (config.url.startsWith('/api')) {
            switch (data.resultcode) {
                case 200:
                    return Promise.resolve(data.data)
                // 未登录或者token失效
                case 401:
                case 403:
                    Vue2.$ctx.auth.clearToken()
                    if ([
                        'feishu',
                        'wework'
                    ].includes(Vue2.$ctx.platform)) {
                        location.replace(Vue2.$ctx[Vue2.$ctx.platform].login_url)
                    } else {
                        // location.href = '/login'
                    }
                    break
                default:
                    // location.href = `/error`
                    break
            }
            return Promise.reject(data)
        }
        return Promise.resolve(data)
    },
    responseError({ config, response }) {
        const errData = {
            path: config.url,
            errormsg: response.statusText,
            code: response.status
        }
        if (typeof response.data === 'object') {
            errData.errormsg = response.data.error
            errData.code = response.data.resultcode
            errData.data = response.data.data
        }
        switch (response.status) {
            // 未登录或者token失效
            case 401:
            case 403:
                Vue2.$ctx.auth.clearToken()
                if ([
                    'feishu',
                    'wework'
                ].includes(Vue2.$ctx.platform)) {
                    location.replace(Vue2.$ctx[Vue2.$ctx.platform].login_url)
                } else {
                    // location.href = '/login'
                }
                break
            default:
                // location.href = `/error`
                break
        }
        return Promise.reject(errData)
    }
}
