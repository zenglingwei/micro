
import { kf5_domain } from '../env/index.js'
import Kf5 from '@2haohr/front-kf5'

export default (app, option) => {
    Kf5.install(app, { domain: kf5_domain })
}
