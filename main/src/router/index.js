import Router from '@2haohr/front-router'

export default (VueOption = {}, option = {}) => {
    Router({ Vue: Vue2, VueOption }, option)
    const routes = [
        {
            path: '/about',
            name: 'About',
            component: () => import('../views/About.vue')
        }
    ]
    Vue2.$ctx.router.afterEach(route => {
        console.log(route, 222)
    })
    Vue2.$ctx.router.addRoutes(routes)
}
