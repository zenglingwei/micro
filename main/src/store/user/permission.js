

export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        update(state, val) {
            state.list = val
        }
    },
    actions: {
        async init({ commit }) {
            const data = await Vue2.$ctx.api.get('/api/ucenter/v2/permission/my/')
            commit('update', data)
        }
    }
}
