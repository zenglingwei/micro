export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobList: []
    },
    mutations: {
        update_list(state, data) {
            state.jobList = data
        }
    },
    actions: {
        async getList({ state, commit }) {
            if (state.jobList.length) {
                return
            }
            let data = await Vue2.$ctx.api.get('/api/v1/jobtitle/list/')
            commit('update_list', data)
        },
        async updateList({ commit }) {
            let data = await Vue2.$ctx.api.get('/api/v1/jobtitle/list/')
            commit('update_list', data)
        }
    }
}
