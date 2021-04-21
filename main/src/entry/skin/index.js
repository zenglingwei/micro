import colorMap from '@2haohr-major/front-theme-color'

export default ({ Vue }) => {
    const {
        store,
        util: { localStorage },
        platform,
        edition
    } = Vue.$ctx
    store.dispatch('user/config/init')
    const { skin = {} } = store.state.user.config
    const SKIN_KEY = 'skinProtect'

    class Skin {
        constructor() {
            if (edition === 'enterprise') {
                this.colorName = 'enterprise'
            } else {
                this.colorName =
                    skin.colorName ||
                    (['feishu', 'wework'].includes(platform)
                        ? platform
                        : 'green')
            }
            const colors = colorMap[this.colorName]
            this.colorList = Object.keys(colorMap)
                .map(name => ({
                    name,
                    color: colorMap[name]['--primary']
                }))
                .filter(item => {
                    if (platform === 'wework') {
                        return !['feishu'].includes(item.name)
                    } else if (platform === 'feishu') {
                        return !['wework'].includes(item.name)
                    }
                    return !['feishu', 'wework'].includes(item.name)
                })
            Object.entries(colors).forEach(([name, color]) => {
                document.documentElement.style.setProperty(name, color)
            })

            // currentColors字段用于兼容老业务
            const currentColors = {}
            Object.entries(colors).forEach(([name, color]) => {
                currentColors[name.replace(/\-\-/, '')] = color
            })
            this.currentColors = currentColors

            // 皮肤切换事件窗口监听
            localStorage.addEvent(SKIN_KEY, async () => {
                location.reload(true)
            })
        }

        use(colorName) {
            store.dispatch('user/config/update', {
                key: 'skin',
                value: {
                    colorName
                }
            })
            localStorage.handle(SKIN_KEY)
            location.reload(true)
        }
    }

    Vue.$ctx.skin = new Skin()
}
