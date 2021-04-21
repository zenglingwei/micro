// import Vue from 'vue'
// import { Button, Select, Input } from 'element-ui'
import { Button, Select, Input, Notice, Icon } from 'dm-ui'
import test from '@/components/test.vue'
const components = [Button, Icon, Select, Input, Notice]

const install = function(Vue) {
    components.forEach(component => {
        Vue.use(component)
        // Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue2) {
    install(window.Vue2)
}

export default {
    install,
    Button,
    Icon,
    Select,
    Input,
    Notice
}

// export default () => {
//     // 全局组件挂载对象
//     window.parentCom = {}

//     /**
//      * 判断组件是否window.parentCom对象已存在，存在直接公用，不存在需要在fun方法引入注册
//      *
//      * @param {function} fun 组件的引入函数，函数返回值应该为 组件对象
//      * @param {string} comName 需要引入的组件名称 可以为空，为空取组件的name
//      *
//      */

//     window.installComFun = (fun, comName) => {
//         if (!window.parentCom[comName]) {
//             const com = fun()
//             const name = comName || com.name
//             window.parentCom[name] = com
//             Vue2.component(name, com)
//         } else {
//             const com = window.parentCom[comName]
//             Vue2.component(comName, com)
//         }
//     }

//     // 把通用组件挂到全局window上，方便子组件复用
//     window.parentCom.test = test
//     window.parentCom.Button = Button

//     Vue2.component(Button.name, Button)
//     Vue2.component('test', test)
// }
