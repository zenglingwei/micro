import { api } from '../index.js'
const cacheKey = 'corp-info'

export default {
    namespaced: true,
    state: {
        perm_code: ''
    },
    mutations: {
        update(state, val) {
            for (const i in val) {
                Vue2.set(state, i, val[i])
            }
        }
    },
    actions: {
        async initFromCache({ state, commit, dispatch }) {
            // 从缓存中获取
            const {
                util: {
                    cache
                }
            } = Vue2.$ctx
            const data = cache.get(cacheKey)
            if (data) {
                commit('update', data)
                // 异步
                dispatch('updateCache')
            } else {
                await dispatch('updateCache')
            }
        },
        async updateCache({ state, dispatch }) {
            // 更新并缓存
            const {
                util: {
                    cache
                }
            } = Vue2.$ctx
            await dispatch('init')
            const {
                perm_code, // 不缓存该属性
                ..._state
            } = state
            cache.set(cacheKey, _state)
        },
        
        async init({ commit }) {
            const {
                trail
            } = Vue2.$ctx
            const data = await api.get('/api/ucenter/companys/company_info/')
            // Vue2.$ctx.platform = data.platform 
            if ((!data.company_no || !data.fullname) && !trail && location.pathname !== '/complete-info') {
                // 需要完善信息
                location.href = '/complete-info'
                throw new Error('请先激活账号')// 抛出异常打断后续代码执行
            }
            commit('update', data)
        },
        setPermCode({ commit }, perm_code) {
            commit('update', {
                perm_code
            })
        },
        removeCache() {
            const {
                util: {
                    cache
                }
            } = Vue2.$ctx
            cache.remove(cacheKey)
        }
    },
    getters: {
        edition(state) {
            let rs = 0
            // 如果订阅字段存在，为数组，且数组长度大于0
            if (state.subscription && state.subscription instanceof Array && state.subscription.length) {
                // 如果订阅数组中存在有效的，则认为是付费版本
                const idx = state.subscription.findIndex(item => {
                    // item.is_invalid [true:免费,false:付费] sub_type [1：企业版, 2：集团版, 3:培训版, 4:启航版]
                    const isEdition = [
                        1,
                        2
                    ]
                    // 考勤、薪酬的启航版、培训版归类到个人版中
                    const pathname = location.pathname
                    if (!(/^\/payroll|attendance|social/i).test(pathname)) {
                        isEdition.push(3, 4)
                    }
                    return !item.is_invalid && isEdition.includes(item.sub_type)
                })
                if (idx > -1) {
                    // 付费版
                    rs = 1
                }
            }
            return rs
        },
        // 是否认证
        accredited(state) {
            return state.accredit_status === 3
        }
    }
}
