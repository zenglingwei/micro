import _WebSocket from '@2haohr/front-websocket'

export default ({ Vue }) => {
    const { websocket_host, api, store, auth } = Vue.$ctx

    const ws = new _WebSocket({ host: websocket_host })

    Vue.$ctx.websocket = ws

    // 异步处理，放在下一个事件循环
    setTimeout(async () => {
        const notify = ({ title, url }) => {
            const instance = Vue.$notice.info({
                desc: title,
                onClick() {
                    url && Vue.$ctx.hyperlink.open(url)
                    instance.close()
                },
                duration: 10000
            })
        }

        // 获取channel启动websocket
        const data = await api.get('/api/v1/notify/get_channel/')
        store.state.user.info.pid
        ws.start(Object.values(data))

        // 刷新权限
        ws.addEvent('refresh_permission', () => {
            store.dispatch('user/permission/init')
            store.dispatch('user/scope/init')
            // 刷新集团门户入口接口
            store.dispatch('user/info/init'), store.dispatch('corp/job/getList')
            // store.dispatch('layout/initGroup')
            // store.dispatch('layout/menu/init')
        })
        // 刷新应用菜单
        // ws.addEvent('update_sys_app_status', () => {
        //     store.dispatch('layout/menu/init')
        // })

        // 退出登录
        ws.addEvent('logout', data => {
            notify(data)
            auth.signout()
        })

        // 版本切换
        ws.addEvent('update_corp_edition', data => {
            // notify(data)
            // store.dispatch('user/permission/init')
            // store.dispatch('user/scope/init')
            // store.dispatch('corp/info/init')
            // // 刷新导航栏的菜单和二级菜单
            // store.dispatch('layout/menu/init')
            // store.dispatch('menu/getSecondMenus')
            // TODO: 后面设计成 notice 队列
            Vue.$ctx.util.localStorage.set(
                'update_corp_edition',
                JSON.stringify(data)
            )
            location.href = '/desk' // 切换版本跳转到 desk 页面
        })

        // 转让管理员
        ws.addEvent('transfer_admin', data => {
            notify(data)
        })

        // 微信绑定
        ws.addEvent('wechat_bind', data => {
            store.dispatch('user/info/init')
        })

        // 微信解绑
        ws.addEvent('wechat_unbind', data => {
            notify(data)
            store.dispatch('user/info/init')
        })

        // 更新用户信息
        ws.addEvent('user_update', data => {
            store.dispatch('user/info/init')
        })

        // 注销、移除子账号
        ws.addEvent('downline', async data => {
            notify(data)
        })

        // 启用子账号
        ws.addEvent('start_user', data => {
            notify(data)
            store.dispatch('corp/getList')
        })

        // 禁用子账号
        ws.addEvent('stop_user', async data => {
            notify(data)
            // 如果是当前企业 直接退出登录
            if (data.code === store.state.corp.info.company_no) {
                setTimeout(() => {
                    if (['feishu', 'wework'].includes(Vue.$ctx.platform)) {
                        location.replace(Vue.$ctx[Vue.$ctx.platform].login_url)
                    } else {
                        location.href = '/login'
                    }
                }, 1000)
            } else {
                store.dispatch('corp/getList')
            }
        })

        // 企业认证通过
        ws.addEvent('company_accredit_success', data => {
            notify(data)
            store.dispatch('corp/info/init')
            store.dispatch('corp/getList')
        })

        // 刷新数据字典
        ws.addEvent('update_enums', data => {
            store.dispatch('meta/updateRemote')
        })

        // 刷新
        ws.addEvent('update_cache_info', data => {
            // 刷新部门
            if (data.data.department) {
                store.dispatch('corp/dept/updateList')
            }
            // 刷新岗位
            if (data.data.job_title) {
                store.dispatch('corp/job/updateList')
            }
            // 刷新岗位职级
            if (data.data.job_level) {
                store.dispatch('corp/jobLevel/updateList')
            }
            // 刷新工作地点
            if (data.data.work_place) {
                store.dispatch('corp/workPlace/updateList')
            }
            // 刷新合同公司
            if (data.data.contract_company) {
                store.dispatch('corp/contractCompany/updateList')
            }
            // 刷新职等
            if (data.data.job_grade) {
                store.dispatch('corp/jobGrade/updateList')
            }
            // 刷新职务
            if (data.data.job_position) {
                store.dispatch('corp/jobPosition/updateList')
            }
        })

        // 短信申请
        ws.addEvent('sms_apply', notify)
        // 默认处理
        ws.addEvent('default', notify)
    }, 0)
}
