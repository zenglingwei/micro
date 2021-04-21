export default {
    namespaced: true,
    state: {
        commonData: {
            parent: 2
        }
    },
    mutations: {
        setCommonData(state, val) {
            state.commonData = val
        }
    }
}
