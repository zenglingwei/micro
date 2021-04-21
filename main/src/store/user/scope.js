export default {
    namespaced: true,
    state: {
        business_line: {},
        contract_company: {},
        dept: {},
        work_area: {}
    },
    mutations: {
        update(state, val) {
            for (const i in val) {
                Vue2.set(state, i, val[i])
            }
        },
        // 更新管理范围
        updateScope(state, data) {
            Vue2.set(state, 'select_all', data.select_all)
        },
        // 是否有所有的三个管理范围
        updateAllScope(state, data = {}) {
            let re = true
            for (const key in data) {
                re = !data[key].hasOwnProperty('select_all') || data[key].select_all
                if (!re) break
            }
            Vue2.set(state, 'allScope', re)
        },
        // 更新组织管理范围
        updateOrgScope(state, data = {}) {
            const module = ['work_area'] // 'business_line', 'contract_company',
            Object.entries(data).map(([
                key,
                value
            ]) => {
                // 确认是否有所有部门管理范围
                if (key === 'dept') {
                    Vue2.set(state, 'select_all', data[key].select_all)
                }
                // 构建默认值
                if (module.includes(key) && !Object.keys(data[key]).length) {
                    data[key] = {
                        objs: [],
                        select_all: true
                    }
                }
                Vue2.set(state, key, data[key])
            })
        }
    },
    actions: {
        // 初始化
        async init({ commit, rootState }, code) {
            // 旧接口api/v1/org_scope/info/
            const perm_code = code !== undefined ? code : rootState.corp.info.perm_code
            const org_scope = await Vue2.$ctx.api.get('/api/ucenter/v2/scope/info/', {
                params: {
                    perm_code
                }
            })
            // commit('update', org_scope)
            // commit('updateScope', org_scope.dept)
            commit('updateAllScope', org_scope)
            commit('updateOrgScope', org_scope)
        }
    }
}
