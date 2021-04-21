
import { sentry_sn as sn } from '../env'
import Sentry from '@2haohr/front-sentry'

export default (app, option) => {
    sn && Sentry.install(app, { sn })
}
