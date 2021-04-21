import 'whatwg-fetch'
import 'custom-event-polyfill'
import 'core-js/stable/promise'
import 'core-js/stable/symbol'
import 'core-js/stable/string/starts-with'
import 'core-js/web/url'
import Vue from 'vue'
import components from './components'
import entry from './entry'
import lazy from './entry/lazy'

import {
    registerMicroApps,
    start,
    setDefaultMountApp,
    runAfterFirstMounted
} from 'qiankun'

console.time('main')
console.time('bb')

Vue2.config.devtools = true
Vue2.config.productionTip = false

entry().then(() => {
    // 删除router vuex传给子应用ctx
    const ctx = { ...Vue2.$ctx }
    delete ctx.router
    delete ctx.vuex
    const msg = {
        components: components, // 从主应用读出的组件库
        ctx
        // emitFnc: childEmit, // 从主应用下发emit函数来收集子应用反馈
    }

    const App = require('./App.vue').default
    const vueApp = new Vue2({
        router: Vue2.$ctx.router,
        render: h => h(App)
    }).$mount('#app')
    setTimeout(() => {
        lazy()
    }, 1000)

    registerMicroApps(
        [
            {
                name: 'app-vue-hash',
                entry: 'http://localhost:2002',
                container: '#appContainer',
                activeRule: '/app-vue-hash',
                props: {
                    data: { store: Vue2.$ctx.store, router: Vue2.$ctx.router }
                }
            },
            {
                name: 'app-vue-history',
                entry: 'http://localhost:2001',
                container: '#appContainer',
                activeRule: '/app-vue-history',
                props: {
                    data: {
                        ...msg,
                        store: Vue2.$ctx.store,
                        router: Vue2.$ctx.router
                    }
                }
            },
            {
                name: 'app-vue-personnel',
                entry: 'http://localhost:2003',
                container: '#appContainer',
                activeRule: '/personnel',
                props: {
                    data: {
                        ...msg,
                        store: Vue2.$ctx.store,
                        router: Vue2.$ctx.router
                    }
                }
            },
            {
                name: 'app-vue-retire',
                entry: 'http://localhost:2004',
                container: '#appContainer',
                activeRule: '/retire',
                props: {
                    data: {
                        ...msg,
                        store: Vue2.$ctx.store,
                        router: Vue2.$ctx.router
                    }
                }
            }
        ],
        {
            // beforeLoad: app => {
            //     console.log('beforeLoad')
            // },
            // beforeMount: app => {
            //     console.log('beforeMount')
            // },
            // afterMount: app => {
            //     console.log('afterMount')
            // },
            // beforeUnmount: app => {
            //     console.log('beforeUnmount')
            // },
            // afterUnmount: app => {
            //     console.log('afterUnmount')
            // }
        }
    )

    setDefaultMountApp('/app-vue-history')
    console.timeEnd('main')
    vueApp.$nextTick(() => {
        console.timeEnd('bb')
        console.log(new Date().getTime())
        // 第一个子应用加载完毕回调
        runAfterFirstMounted(app => {
            console.log(app)
        })
        //在这里注册并启动 qiankun
        start()
    })
})
