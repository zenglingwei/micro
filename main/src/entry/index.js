import env from './env/'
import util from './util/'
import api from './api/'
import router from './router/'
import store from './store/'
import auth from './auth/'
import skin from './skin/'
import statics from './static/'
import log from './log/'
import websocket from './websocket/'
import sentry from './sentry/'
import analysis from './analysis/'
// import validateAuth from './validate-auth'

/**
 * 初始化用户信息
 */
export const UserInfo = async ({ Vue }) => {
    const { store, trail, router, env } = Vue.$ctx

    // await Promise.all([
    //     store.dispatch('user/permission/init'), // 更新企业信息
    //     store.dispatch('corp/info/init'), // 更新企业信息
    //     store.dispatch('user/info/init') // 更新用户信息
    // ])
    // const corpInfo = store.state.corp.info
    // if ((!corpInfo.company_no || !corpInfo.fullname) && !trail) {
    //     location.href = '/complete-info'
    //     throw new Error('请先激活账号') // 抛出异常打断后续代码执行
    // }
    // router.beforeEach(async (to, from, next) => {
    //     for (const i of to.matched) {
    //         if (!validateRight(i)) {
    //             console.error('无权限访问')
    //             location.href = '/permission/denied'
    //             return
    //         }
    //     }
    //     next()
    // })
}

/**
 * 初始化用户后置异步处理钩子
 */
export const UserAfter = async ({ Vue }) => {
    const {
        util: { localStorage },
        auth,
        env,
        log
    } = Vue.$ctx

    // 异步处理
    setTimeout(() => {
        // 企业活跃度统计
        log.UV()
        // 用户退出事件窗口监听
        localStorage.addEvent('business_logout', async () => {
            auth.clearToken()
            location.href = '/'
        })
        // 切换企业事件窗口监听
        localStorage.addEvent(`${env}_2HAOHR_CACHE_company_no`, val => {
            location.replace('/desk') // 刷新页面
        })
    }, 0)
}

export default async option => {
    console.time('entry')
    console.time('queue')
    const Vue = Vue2
    const queue = [
        env,
        util,
        api,
        store,
        router,
        auth,
        skin,
        statics,
        log,
        websocket,
        sentry,
        analysis
    ]
    for (let item of queue) {
        await item({ Vue }, option)
    }
    console.timeEnd('queue')
    console.time('api')
    await Promise.all([UserInfo({ Vue }), UserAfter({ Vue })])
    // await Promise.all([
    //     Vue.$ctx.store.dispatch('user/permission/init'), // 更新企业信息
    //     Vue.$ctx.store.dispatch('corp/info/init'), // 更新企业信息
    //     Vue.$ctx.store.dispatch('user/info/init') // 更新用户信息
    // ])

    console.timeEnd('api')
    console.timeEnd('entry')
}
