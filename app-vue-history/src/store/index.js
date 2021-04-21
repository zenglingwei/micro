import Store from '@2haohr/front-store'
export default ({ Vue }, option = {}) => {
    Store(
        { Vue },
        {
            state: {
                history: 'history2222'
            }
        }
    )
}
