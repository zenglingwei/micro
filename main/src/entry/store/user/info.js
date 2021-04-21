
import { api } from '../index.js'

export default {
    namespaced: true,
    state: {},
    mutations: {
        update(state, val) {
            for (let i in val) {
                Vue2.set(state, i, val[i])
            }
        }
    },
    actions: {
        async init({ commit }) {
            const data = await Vue2.$ctx.api.get('/api/ucenter/users/users_info/')
            commit('update', data)
        }
    },
    getters: {
        /**
         *  0:拥有者，1:管理员，2:子账号，3:小秘书
         */
        user_type(state, getters, rootState) {
            let rs = true
            switch (state.company_user_type) {
                case 0:// 管理员
                    rs = rootState.corp.info.is_owner ? 0 : 1
                    break
                case 1:// 子帐号
                    rs = 2
                    break
                case 2:// 小秘书
                    rs = 3
                    break
            }
            return rs
        }
    }
}
