
export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        allContractCompanyList: [],
        contractCompanyList: []
    },
    mutations: {
        update_list(state, data) {
            state.allContractCompanyList = data
            state.contractCompanyList = data.filter(item => item.is_manage)
        }
    },
    actions: {
        async getList({ state, commit }) {
            if (state.allContractCompanyList.length) {
                return
            }
            let data = await Vue2.$ctx.api.get('/api/v1/contract_company/list/')
            commit('update_list', data)
        },
        async updateList({ commit }) {
            let data = await Vue2.$ctx.api.get('/api/v1/contract_company/list/')
            commit('update_list', data)
        }
    }
}
