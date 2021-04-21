import Vue from 'vue'
// import { Button, Select, Input, Pagination } from 'element-ui'
import { Button, Select, Input } from 'dm-ui';

import childTest from '@/components/childTest.vue'
export default (config = {}) => {
    
    const comList = {
        Button: config.Button || Button,
        // Pagination: config.Pagination || Pagination,
        Input: config.Input || Input,
        Select: config.Select || Select
    }
    for (let key in comList) {
        Vue.component(comList[key].name, comList[key])
    }
    Vue.component('childTest', childTest)
}
