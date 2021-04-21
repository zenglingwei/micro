import Store from '@2haohr/front-store'
import user from './user'
import corp from './corp'
import interceptor from './interceptor.js'


export default ({ Vue }, option = {}) => {
    api = Vue.$ctx.api.createInstance(interceptor)
    Store({ Vue }, option)
    const { store } = Vue.$ctx
    store.registerModule('user', user)
    store.registerModule('corp', corp)
}

export let api 
