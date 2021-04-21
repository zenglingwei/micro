import Router from '@2haohr/front-router'

export default ({ Vue }, option = {}) => {
    // 需要传一个VueOption 有时候需要用来挂载App
    Router(
        { Vue, VueOption: option },
        {
            base: '/app-vue-history'
        }
    )
    Vue.$ctx.router.beforeEach((to, from, next) => {
        console.log(to, '子系统beforeEach')
        next()
    })
    Vue.$ctx.router.addRoutes([
        {
            path: '/',
            name: 'Home',
            meta: {
                aa: 1
            },
            component: () =>
                import(/* webpackChunkName: "Home" */ '../views/Home.vue')
        },
        {
            path: '/about',
            name: 'About',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    ])
}
