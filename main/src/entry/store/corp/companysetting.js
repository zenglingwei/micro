export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        menu: {}
    },
    mutations: {
        update(state, data) {
            state.menu = data
        }
    },
    actions: {
        async init(store) {
            const rs = {}
            let data = await Vue2.$ctx.api.get('/api/company_setting/custom_menu/')
            for (let i in data) {
                if (data[i]) {
                    data[i].forEach(item => {
                        rs[item.menu_code] = item.is_display
                    })
                }
            }
            store.commit('update', rs)
        }
    }
}
