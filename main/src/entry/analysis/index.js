
import { analysis_sn as sn } from '../env'
import Analysis from '@2haohr/front-analysis'

export default (app, option) => {
    Analysis.install(app, { sn })
}
