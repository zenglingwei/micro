import info from './info'
import permission from './permission'
import scope from './scope'
import config from './config'

const array2Obj = (arr = []) => {
    arr = Object.values(arr) // 确保一定是数组
    return arr.reduce((prev, item) => {
        prev[item.codename] = item.has
        return {
            ...prev,
            [item.codename]: item.has,
            ...array2Obj(item.children)
        }
    }, {})
}

export default {
    namespaced: true,
    state: {},
    modules: {
        info,
        permission,
        scope,
        config
    },
    getters: {
        permission() {
            return array2Obj(permission.state.list)
        }
    }
}
