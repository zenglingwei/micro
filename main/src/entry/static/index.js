import dma from '@2haohr/front-statistics/src/action.js'
// import ajaxHook from '@2haohr/front-ajax-hook'
// import performance from '@2haohr/front-performance'
export default ({ Vue }, option) => {
    // 初始化行为统计
    // new ajaxHook()
    // performance.install({ Vue }, option)
    console.time("time")
    dma.init({
        env: 'dev',
        token_id: Vue.$ctx.accesstoken
    })
    dma.enter()
    Vue.$ctx.dma = dma
    console.timeEnd("time")

    // 页面性能监听
    // Performance.install({ Vue }, option)
}
