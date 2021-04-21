class Activate {
    constructor({ interval, timeout } = {}) {
        this.interval = interval || 2 * 1000 // 激活判断时间间隔
        this.timeout = timeout || 30 * 1000 // 失效超时时间
        this.eventPool = []
        this.online = new Date() // 当前在线时间
        this.detect() // 开始检测
        this.wakeup = this.wakeup.bind(this)
    }
    // 检测
    detect() {
        const time = new Date()
        if (window.navigator.onLine) { // 如果网络连接状态良好
            if ((time - this.online) > this.timeout) { // 判断休眠或者离线时间是否超过失效时间
                // 触发事件
                setTimeout(() => {
                    console.log('触发页面休眠激活事件')
                    this.eventPool.forEach(handle => handle())
                }, 5000)
            }
            this.online = time
        }
        // 继续循环
        setTimeout(() => {
            this.detect.apply(this)
        }, this.interval)
    }
    // 激活事件
    wakeup(handle = () => { }) {
        this.eventPool.push(handle)
    }
    static install({ Vue }, option) {
        Vue.$ctx.activate = new Activate()
    }
}

export default Activate
