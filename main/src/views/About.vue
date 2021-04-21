<template>
    <div id="app">
        <test></test>
        <span @click="changeParentState"
            >主项目的数据：{{ commonData.parent }}，点击变回1</span
        >
        <d-button>默认按钮</d-button>
        <router-view></router-view>
        <div id="appContainer"></div>
    </div>
</template>

<script>
const {
    vuex: { mapState }
} = Vue2.$ctx
export default {
    computed: {
        ...mapState('test', ['history1', 'commonData']),

        // commonData() {
        //     return Vue2.$ctx.store.state.test.commonData
        // },
        // companyInfo() {
        // 
        //     return Vue2.$ctx.store.state.test.companyInfo
        // },
    },
    created() {
        // Vue2.$ctx.store.registerModule(['test'], test)

        // Vue2.$ctx.store.dispatch('test/getCompanyInfo')
        // await Vue2.$ctx.api.get("/api/ucenter/v2/permission/my/")
    },
    mounted() {},
    methods: {
        changeParentState() {
            this.$store.commit('test/setCommonData', { parent: 1 })
        }
    }
}
</script>

<style scoped>
#app {
    height: 100vh;
    text-align: center;
    position: relative;
}
header > a {
    margin: 0 20px;
}
.appContainer {
    background: #ccc;
    padding: 20px;
}
</style>
