import kf5 from './kf5/'
import activate from './activate/'
export default async option => {
    const Vue = Vue2
    const queue = [kf5, activate]
    Promise.all(
        queue.map(
            item =>
                new Promise((resolve, reject) => {
                    item({ Vue }, option)
                })
        )
    )
}
