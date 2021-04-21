
export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        deptList: [],
        allDeptList: []
    },
    mutations: {
        update_list(state, data) {
            const forUserList = data.filter(item => item.is_in_user_management)
            state.deptList = forUserList
            state.allDeptList = data
        }
    },
    actions: {
        async getList({ state, commit, rootState }, code) {
            if (state.allDeptList.length) {
                return
            }
            const perm_code = code !== undefined ? code : rootState.corp.info.perm_code
            const data = await Vue2.$ctx.api.get('/api/employee/organizaiotn/simple_list_info/', {
                params: {
                    perm_code
                }
            })
            commit('update_list', data)
        },
        async updateList({ commit, rootState }, code) {
            const perm_code = code !== undefined ? code : rootState.corp.info.perm_code
            const data = await Vue2.$ctx.api.get('/api/employee/organizaiotn/simple_list_info/', {
                params: {
                    perm_code
                }
            })
            commit('update_list', data)
        }
    }
}
