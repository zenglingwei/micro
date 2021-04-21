import './public-path'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'

Vue.config.productionTip = false

let router = null
let instance = null

function render({ data = {}, container } = {}) {
    // api()
    // components()
    router = new VueRouter({
        base: '/personnel',
        mode: 'history',
        routes
    })
    
    instance = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount(
        container ? container.querySelector('#appVueHistory') : '#appVueHistory'
    )
}

//不是微服务，需要手动render
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap() {}

export async function mount(props) {
    // Vue.$ctx = { ...props.data.ctx, ...Vue.$ctx }
    // window.a = 1
    // console.log(window.a, a, 'a')
    // console.log('props from main framework', props)
    render(props)
    // 测试一下 body 的事件，不会被沙箱移除
    // document.body.addEventListener('click', e => console.log('document.body.addEventListener'))
    // document.body.onclick = e => console.log('document.body.addEventListener')
}

export async function unmount() {
    instance.$destroy()
    instance.$el.innerHTML = ''
    instance = null
    router = null
}
