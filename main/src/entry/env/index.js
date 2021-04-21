import Env from '@2haohr/front-env'
const getEnv = () => {
    let env = location.host.split('.')[0]
    if (env.indexOf('localhost') > -1) {
        return 'dev-server'
    } else if (env === '2haohr') {
        return 'pd'
    }
    return env
}
const getAffix = () => {
    if (location.host.split('.')[0] === '2haohr') {
        return ''
    }
    return `-${env}`
}
const getNamespace = () => {
    let namespace = location.pathname.split('/')[1] || 'desk'
    return namespace
}
const env = getEnv()
const version = window.version
const affix = getAffix()
const namespace = getNamespace()
let platform = window.platform || ''
const feishu = { app_id: '' }
const wework = { app_id: '' }
const base = `/${namespace}/`
const trail_url = `https://demo${affix}.2haohr.com/desk`
const trail = `demo${affix}.2haohr.com` === location.hostname
let domain = '2haohr.com'
let websocket_host = `push-dev.2haohr.com`
let analysis_sn = ``
const sentry_sn = ``
let website_url = 'http://localhost:13400'
let staff_url = 'http://localhost:13200'
let kf5_domain = '365hr.kf5.com'
let envVal

switch (env) {
    case 'dev-server':
    default:
        domain = 'localhost'
        feishu.app_id = 'cli_9e18068e8974100e'
        feishu.login_url = `https://feishu-dev.2haohr.com/login-feishu?callback=${encodeURIComponent(
            location.href
        )}`
        wework.login_url = `https://wework-dev.2haohr.com/login-wework?callback=${encodeURIComponent(
            location.href
        )}`
        envVal = 0
        break
    case 'dev':
        feishu.app_id = 'cli_9e18068e8974100e'
        feishu.login_url = `${location.origin}/login-feishu`
        wework.login_url = `${location.origin}/login-wework`
        website_url = 'https://www-dev.2haohr.com'
        staff_url = `https://i${platform ? '-' + platform : ''}-dev.2haohr.com`
        envVal = 10
        break
    case 'test':
        feishu.app_id = 'ww96c1874068c9c295'
        feishu.login_url = `${location.origin}/login-feishu`
        wework.login_url = `${location.origin}/login-wework`
        // sentry_sn = 'https://11cc9d1a1eb04076b45f51bb8484051c@sentry.2haohr.com/5'
        website_url = 'https://www-test.2haohr.com'
        staff_url = `https://i${platform ? '-' + platform : ''}-test.2haohr.com`
        envVal = 100
        break
    case 'pd':
        feishu.app_id = 'cli_9e3257d237b4d00d'
        feishu.login_url = `${location.origin}/login-feishu`
        wework.login_url = `${location.origin}/login-wework`
        sentry_sn = 'https://7b0fda5782f64833993cbcc71a01592b@sentry.2haohr.com/4'
        website_url = 'https://www.2haohr.com'
        staff_url = `https://i${platform ? '-' + platform : ''}.2haohr.com`
        websocket_host = `push.2haohr.com`
        analysis_sn = `c19600636d25be064923faec4309a09e`
        kf5_domain = '2haohr.kf5.com'
        envVal = 10000
        break
}

export default (app, option) => {
    Env(app, {
        env,
        envVal,
        affix,
        base,
        trail,
        trail_url,
        domain,
        websocket_host,
        analysis_sn,
        sentry_sn,
        website_url,
        staff_url,
        kf5_domain,
        version,
        namespace,
        platform,
        feishu,
        wework
    })
}
export {
    env,
    affix,
    domain,
    base,
    trail,
    analysis_sn,
    sentry_sn,
    kf5_domain,
    platform,
    feishu,
    wework
}
