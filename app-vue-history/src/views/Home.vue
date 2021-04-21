<template>
    <div class="home">
        <!-- <test></test> -->
        <d-button @click="gogogo">{{ history }}</d-button>
        <d-input placeholder="请输入内容"></d-input>
        <childTest></childTest>
        <d-button @click="changeParentState"
            >主项目的数据：{{ commonData.parent }},点击变为3</d-button
        >
        <!-- <HelloWorld msg="Welcome to app-vue-history" /> -->
    </div>
</template>
<script>
const {
    vuex: { mapState }
} = Vue.$ctx
// import HelloWorld from '@/components/HelloWorld.vue'
import { cube } from './math.js';
export default {
    data() {
        return {
            sessionKey: '',
            localStorageKey: ''
        }
    },
    // components: { HelloWorld },
    computed: {
        ...mapState(["history"]),
        commonData() {
            return this.$root.parentVuex.state.test.commonData
        },
        // history1() {
        //     return this.$store.state.history1
        // }
    },
    async created() {

        const a = cube(2)
        console.log(a)
        // console.log(Vue, Vue2)
        // this.$root.parentVuex.dispatch('user/permission/init'), // 更新企业信息

        // await Vue2.$ctx.api.get("/api/ucenter/v2/permission/my/")
        // await Vue.$ctx.api.get('/api/ucenter/v2/permission/my/')
    },
    methods: {
        changeParentState() {
            this.$root.parentVuex.commit('test/setCommonData', { parent: 3 })
        },
        gogogo() {
            this.$router.push({ name: 'About', query: this.$route.query })
        }
    }
}
</script>
<style scoped>
.hello {
    color: #000;
}
</style>
