import { api } from '../index.js'


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
            const data = await api.get('/api/ucenter/v2/permission/my/')
            commit('update', data)
        }
    }
}
