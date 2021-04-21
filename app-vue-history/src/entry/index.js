// import api from './api/'
import router from './router/'
import store from './store/'
export default async option => {
    const queue = [store, router]
    for (let item of queue) {
        await item({ Vue }, option)
    }
}
