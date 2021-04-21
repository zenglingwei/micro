export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        workPlaceList: [],
        allWorkPlaceList: []
    },
    mutations: {
        update_list(state, data) {
            state.allWorkPlaceList = data
            state.workPlaceList = data.filter(item => item.is_manage)
        }
    },
    actions: {
        async getList({ commit, state }) {
            if (state.allWorkPlaceList.length) {
                return
            }
            let data = await Vue2.$ctx.api.get('/api/v1/work_place/list/')
            commit('update_list', data)
        },
        async updateList({ commit }) {
            let data = await Vue2.$ctx.api.get('/api/v1/work_place/list/')
            commit('update_list', data)
        }
    }
}
