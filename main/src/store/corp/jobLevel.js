export default {
    namespaced: true,
    state: {
        jobLevelList: [],
        jobLevelListOld: [],
        jobMapTitle: {}
    },
    mutations: {
        update_list(state, data) {
            state.jobLevelList = data
        },
        update_list_old(state, data) {
            state.jobLevelListOld = data
        },
        updateJobMapTitle(state, data) {
            state.jobMapTitle = data
        }
    },
    actions: {
        async getList({ commit, state }) {
            if (state.jobLevelList.length) {
                return
            }
            const data = await Vue2.$ctx.api.get('/api/employee/job_level/select_list/')
            const data_old = await Vue2.$ctx.api.get('/api/v1/job_level/list/')
            const res = await Vue2.$ctx.api.get('/api/employee/job_level/get_job_level_title_info/')
            commit('update_list', data)
            commit('update_list_old', data_old)
            commit('updateJobMapTitle', res)
        },
        async updateList({ commit }) {
            const data = await Vue2.$ctx.api.get('/api/employee/job_level/select_list/')
            const data_old = await Vue2.$ctx.api.get('/api/v1/job_level/list/')
            const res = await Vue2.$ctx.api.get('/api/employee/job_level/get_job_level_title_info/')
            commit('update_list', data)
            commit('update_list_old', data_old)
            commit('updateJobMapTitle', res)
        }
    }
}
