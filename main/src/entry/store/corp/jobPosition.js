export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobPositionList: []
    },
    mutations: {
        update_list(state, data) {
            state.jobPositionList = data
        }
    },
    actions: {
        async getList({ commit, state }) {
            if (state.jobPositionList.length) {
                return
            }
            let data = await Vue2.$ctx.api.get('/api/v1/job_position/menu/')
            commit('update_list', data)
        },
        // 职务
        async updateList({ commit }) {
            let data = await Vue2.$ctx.api.get('/api/v1/job_position/menu/')
            commit('update_list', data)
        }
    }
}
