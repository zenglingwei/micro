<template>
    <div :class="s.main">
        <div :class="s.wrap">
            <header>
                <!-- <router-link to="/retire/">retire</router-link> -->
                <router-link to="/personnel/">personnel</router-link>
                <!-- <router-link to="/app-vue-hash/">app-vue-hash</router-link> -->
                <router-link class="a" to="/app-vue-history?a=1"
                    >app-vue-history</router-link
                >
                <!-- <router-link to="/about">about</router-link> -->
            </header>
            <div :class="s.leftMenu">
                <d-button @click="changeParentState"
                    >主项目的数据：{{ commonData.parent }}，</d-button
                >
            </div>
        </div>
        <router-view></router-view>
        <div id="appContainer"></div>
    </div>
</template>

<script>
import test from './store/test.js'

const {
    vuex: { mapState }
} = Vue2.$ctx
export default {
    computed: {
        ...mapState('test', ['history1', 'commonData', 'companyInfo'])
        // commonData() {
        //     return Vue2.$ctx.store.state.test.commonData
        // }
    },
    created() {
        Vue2.$ctx.store.registerModule('test', test)
    },
    mounted() {},
    methods: {
        changeParentState() {
            this.$store.commit('test/setCommonData', { parent: 1 })
        }
    }
}
</script>
<style lang="scss">
@import '@2haohr/front-reset-css/index.scss';
#appContainer {
    margin-left: 180px;
    padding: 20px;
}
</style>
<style module="s" lang="scss">
.main {
    height: 100vh;
    text-align: center;
    position: relative;
    padding-top: 60px;
    @include text-ellipsis;
    color: $color-warning;
}

.wrap {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 200;
    min-width: 1280px;
    min-height: 60px;
    background: linear-gradient(to right, #006946, #555f5d);
    :global() {
        a {
            font-size: 18px;
            padding: 10px 30px;
            line-height: 60px;
        }
        .a {
            font-size: 28px;
        }
    }
}
.leftMenu {
    position: fixed;
    left: 0;
    top: 60px;
    width: 180px;
    height: calc(100% - 104px);
    z-index: 199;
    background: #f8f8f9;
    padding-top: 16px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all 0.5s;
}
</style>
