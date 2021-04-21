import Router from '@2haohr/front-router'

export default ({ Vue }, option = {}) => {
    // 需要传一个VueOption 有时候需要用来挂载App
    Router({ Vue, VueOption: option }, option)
    Vue.$ctx.router.afterEach(route => {
        console.log(route, "父级beforeEach")

    })
}
