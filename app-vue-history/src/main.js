import './public-path'
import Vue from 'vue'
import store from './store'
import routes from './router'
import components from './components'
// import api from './api'
import App from './App.vue'
window.Vue = Vue
window.Vue.$ctx = {}

Vue.config.productionTip = false
Vue.config.devtools = true

let router = null
let instance = null
store({ Vue })
routes({ Vue })
function render({ data = {}, container } = {}) {
    instance = new Vue({
        router: Vue.$ctx.router,
        data() {
            return {
                parentRouter: data.router,
                parentVuex: data.store
            }
        },
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
    Vue.$ctx = { ...props.data.ctx, ...Vue.$ctx }
    components(props.data.components)
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
