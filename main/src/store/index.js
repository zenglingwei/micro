import Store from '@2haohr/front-store'
import user from './user'
import corp from './corp'
export default (VueOption = {}, option = {}) => {
    Store({ Vue: Vue2, VueOption }, option)
    const { store } = Vue2.$ctx
    store.registerModule('user', user)
    store.registerModule('corp', corp)
}
