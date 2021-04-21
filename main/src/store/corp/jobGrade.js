export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobGradeList: []
    },
    mutations: {
        update_list(state, data) {
            state.jobGradeList = data.map(item => ({
                id: item,
                name: item
            }))
        }
    },
    actions: {
        async getList({ commit, state }) {
            if (state.jobGradeList.length) {
                return
            }
            const data = await Vue2.$ctx.api.get('/api/employee/job_grade/')
            commit('update_list', data)
        },
        async updateList({ commit }) {
            const data = await Vue2.$ctx.api.get('/api/employee/job_grade/')
            commit('update_list', data)
        }
    }
}
