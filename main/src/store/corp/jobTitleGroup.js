const iteratorTitleGroup = function(data, parentItem = {}) {
    return data.reduce((arr, item) => {
        let { id, company_id, title, level, desc, children = [], kind_id } = item
        let indent = ''
        for (let i = 0; i < level; i++) {
            if (i > 0) {
                indent += '　'
            }
        }
        let indent_title = indent + title
        return arr.concat(
            [
                {
                    id,
                    company_id,
                    title,
                    level,
                    desc,
                    indent_title,
                    kind_id,
                    sup_job_title_group_id: parentItem
                        ? parentItem.id || ''
                        : '',
                    sup_job_title_group_title: parentItem
                        ? parentItem.title || ''
                        : ''
                }
            ],
            iteratorTitleGroup(children, item)
        )
    }, [])
}
export default {
    // strict: process.env.NODE_ENV !== 'production',
    namespaced: true,
    state: {
        jobTitleGroupList: []
    },
    mutations: {
        update_list(state, data) {
            state.jobTitleGroupList = iteratorTitleGroup(data)
        }
    },
    actions: {
        async getList({ state, commit }) {
            if (state.jobTitleGroupList.length) {
                return
            }
            let data = await Vue2.$ctx.api.get(
                '/api/v1/job_title_group/group_list/?list_type=with_stat'
            )
            commit('update_list', data)
        },
        async updateList({ commit }) {
            let data = await Vue2.$ctx.api.get(
                '/api/v1/job_title_group/group_list/?list_type=with_stat'
            )
            commit('update_list', data)
        }
    }
}
