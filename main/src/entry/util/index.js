import Util from '@2haohr/front-util'

export default ({ Vue }, option) => {
    Util.install({ Vue }, { affix: Vue.$ctx.affix, domain: Vue.$ctx.domain })

    const { util } = Vue.$ctx

    util.downloadDoc = async template_no => {
        const { api, util } = Vue.$ctx
        const { download_link } = await api.get('/api/op/api/template_file/', {
            params: {
                template_no
            }
        })
        util.downloadFile(download_link)
    }
}
