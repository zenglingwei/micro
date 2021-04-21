import Vue from 'vue'
import axios from 'axios'

const defaultOption = {
    headers: {
        accesstoken: 'av6bfkek6cxh9m94myxr6kyf2rnctpnn',
    },
    // 请求发送前
    requestSuccess: config => config,
    requestError: error => Promise.reject(error),
    responseSuccess: response => Promise.resolve(response.data),
    responseError: error => Promise.reject(error),
}

class Api {
    constructor(option = {}) {
        this.option = {
            ...defaultOption,
            ...option,
        }

        // 暴露常用请求方法
        Array.of('get', 'post', 'delete', 'put', 'patch', 'request').forEach(
            item => {
                this[item] = (...args) => {
                    // 统计数据
                    const random = Math.random()
                    const statistics = {
                        req_time: new Date().getTime(),
                        random,
                    }
                    this.option.statistics = statistics

                    const axiosInstance = axios.create(this.option)
                    // 加载拦截器配置
                    axiosInstance.interceptors.request.use(
                        this.option.requestSuccess,
                        this.option.requestError
                    )
                    axiosInstance.interceptors.response.use(
                        this.option.responseSuccess,
                        this.option.responseError
                    )
                    return axiosInstance[item].apply(this.axiosInstance, args)
                }
            }
        )
    }

    createInstance(option) {
        return new Api({
            ...this.option,
            ...option,
        })
    }

    static install(option = {}) {
        let api = new Api(option)
        Vue.$ctx.api = api
        Vue.prototype.$api = api
        return api
    }
}

// export default Api
export default option => {
    const api = Api.install(option)
    api.option.responseSuccess = ({ config, data }) => {
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
    api.option.responseError = ret => {
        if (axios.isCancel(ret)) {
            const errData = {
                errormsg: ret.message,
                code: -1,
            }
            return Promise.reject(errData)
        }
        const { config, response } = ret
        const errToast = config.errToast === undefined || config.errToast

        let errMsg = response.data
        let errData = {
            errormsg: response.statusText,
            code: response.status,
        }
        if (typeof errMsg === 'object') {
            errMsg = response.data
            errData = {
                errormsg: errMsg.error,
                code: errMsg.resultcode,
                data: errMsg.data,
            }
        }
        return Promise.reject(errData)
    }
}

export { axios }
