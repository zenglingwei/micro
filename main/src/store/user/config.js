
const CONFIG_KEY = '2haohr_user_config'

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
            const { localStorage } = Vue2.$ctx.util
            try {
                const data = JSON.parse(localStorage.get(CONFIG_KEY) || '{}')
                commit('update', data)
            } catch (e) {
                console.log('获取用户配置失败')
            }
        },
        update({ commit, state }, { key, value }) {
            const { localStorage } = Vue2.$ctx.util

            if (key && value !== undefined) {
                // 更新状态机数据
                commit('update', { [key]: value })

                // 更新localstorage
                localStorage.set(CONFIG_KEY, JSON.stringify(state))
            }
        }
    }
}
