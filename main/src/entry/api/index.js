import Api from '@2haohr/front-api'

export default async ({ Vue }, option) => {
    Api.install({ Vue }, option)
    Vue.$ctx.api.option.responseSuccess = ({ config, data }) => {
        if (config.url.startsWith('/api') || config.url.startsWith('/yapi')) {
            if (data.resultcode === 200) {
                return Promise.resolve(data.data)
            }
            console.log(
                `%cERROR: ${config.method} ${config.url}`,
                'color: #f00;'
            )
            const errToast = config.errToast === undefined || config.errToast
            return Promise.reject(data)
        }
        return Promise.resolve(data)
    }
    // api出错时的处理
    Vue.$ctx.api.option.responseError = ret => {
        const { config, response } = ret
        const errToast = config.errToast === undefined || config.errToast

        let errMsg = response.data
        let errData = {
            errormsg: response.statusText,
            code: response.status
        }
        if (typeof errMsg === 'object') {
            errMsg = response.data
            errData = {
                errormsg: errMsg.error,
                code: errMsg.resultcode,
                data: errMsg.data
            }
        }
        return Promise.reject(errData)
    }
}
