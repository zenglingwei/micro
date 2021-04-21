//     /**
//      * 验证是否页面是否有权限进入
//      *
//      * @param {objext} to 将要进入页面的参数
//      * @param [boolean, string, array, function] to.meta.permission 路由权限判断规则
//      *
//      */
const validateRight = to => {
    const permission = to.meta.permission
    switch (Object.prototype.toString.call(permission)) {
        case '[object Boolean]':
            return permission
        case '[object String]':
            return Vue2.$ctx.store.getters['user/permission'][permission]
        case '[object Array]':
            for (const i of permission) {
                if (!Vue2.$ctx.store.getters['user/permission'][i]) {
                    return false
                }
            }
            break
        case '[object Function]':
            return permission()
        default:
            break
    }
    return true
}


export default to => {
    router.beforeEach(async (to, from, next) => {
        console.log(to, 1)
        for (const i of to.matched) {
            if (!validateRight(i)) {
                console.error('无权限访问')
                location.href = '/permission/denied'
                return
            }
        }
        next()
    })
}

