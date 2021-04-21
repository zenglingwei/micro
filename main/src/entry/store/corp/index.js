
import contractCompany from './contractCompany'
import dept from './dept'
import info from './info'
import job from './job'
import jobGrade from './jobGrade'
import jobLevel from './jobLevel'
import jobPosition from './jobPosition'
import jobTitleGroup from './jobTitleGroup'
import workPlace from './workPlace'
import companysetting from './companysetting'

export default {
    namespaced: true,
    state: {
        list: []
    },
    actions: {
        /*
         ** 获取企业列表
         */
        async getList({state}) {
            state.list = await Vue2.$ctx.api.get('/api/ucenter/companys/company/list/')
        }
    },
    modules: {
        contractCompany,
        dept,
        info,
        job,
        jobGrade,
        jobLevel,
        jobPosition,
        jobTitleGroup,
        workPlace,
        companysetting
    }
}
