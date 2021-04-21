### 需求以及成果
我所在团队是做toB业务的，技术栈是Vue，团队目前有十多个典型的toB业务（菜单+内容布局），这些业务都是服务于一个大平台的，因为历史原因，每个业务都是独立的，都有一个html入口，所以当用户在这个大平台上使用这十多个业务的时候，每当切换系统时，页面都会刷新，体验很差；在开发层面，这十多个业务又有太多共同之处，每次修改成本都很高。

最近有一个很重要的需求X，内容是这样的：从十多个项目中，每个项目抽取若干功能组成一个新项目，基于现有架构的话，每当点击来自不同系统的功能页面就要刷新一次，这是不可接受的。为了新需求X重复开发一遍这些业务功能又不现实，所以从技术角度来看，架构改造不可避免。

经过一番调研比对，我们决定使用当下比较火的 微服务来完成改造（iframe方案尝试过，不太适合我们的场景），目前改造已完成，我们实现了以下效果：

1. 只有一个不包含子项目（子项目指的是那十多个业务）资源的主项目，主项目只有一个html入口，子项目通过主项目来按需加载，子系统间切换不再刷新；

2. 菜单栏、登录、退出等功能都从子项目剥离，写在主项目里，再有相关改动只需修改主项目，包括错误监控、埋点等行为，只需处理一个主项目，十几个子项目不再需要处理；

3. 子项目原本需要加载的公共部分（如vue、vuex、vue-router、ivew/element、私有npm包等），全部由主项目调度，配合webpack的externals功能通过外链的方式按需加载，一旦有一个子项目加载过，下一个子项目就不需要再加载，这样一来每个子项目的dist文件里就只有子项目自己的业务代码（最终子项目包的体积缩小了80%，只有几十k），项目实际加载速度快了很多，肉眼可见；

4. 子项目并没有重新开发，只是进行了一些改造，接入了微前端这套架构，所以新需求X的开发成本也极大的降低了，接入功能同时可供未来新增子项目使用；

### 展示以及技术点
图1：项目外观示意图：
<img src="https://user-gold-cdn.xitu.io/2019/9/19/16d49638117b10c4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1">

> 做微前端改造之前，蓝色系区域都是用公共包的方式由每个子项目引入，所以子项目运行的时候展示的蓝色系部分都是相同的，给人一种在使用同一个系统的错觉，实际上切换系统的时候整个页面都要重新载入。
 
<img src="https://user-gold-cdn.xitu.io/2019/9/23/16d5cba68085b2b1?imageslim">

乍一看没什么特别的，但如果我说这些tab分别来自于不同git仓库的独立vue项目呢？
这就是这套微前端架构的强大之处，让不同单页vue项目可以随意组合成一个项目，而这些项目自己又是独立的vue项目。

### 子项目间的组件共享
因为主项目会先加载，然后才会加载子项目，所以一般是子项目复用主项目的组件（主项目复用子项目的情况下面再讨论）。
做法也很简单，主项目加载时，将组件挂载到 window 上，子项目直接注册即可。
主项目入口文件：

```javascript
import HelloWorld from '@/components/HelloWorld.vue'
window.commonComponent = { HelloWorld };
```

子项目直接使用：

```javascript
components: { 
  HelloWorld: window.__POWERED_BY_QIANKUN__ ? window.commonComponent.HelloWorld :
     import('@/components/HelloWorld.vue'))
}
```

### 路由跳转问题
在子项目里面如何跳转到另一个子项目/主项目页面呢，直接写 <router-link> 或者用 router.push/router.replace 是不行的，原因是这个 router 是子项目的路由，所有的跳转都会基于子项目的 base 。写 a 链接可以跳转过去，但是会刷新页面，用户体验不好。
> 解决办法也比较简单，在子项目注册时将主项目的路由实例对象传过去，子项目挂载到全局，用父项目的这个 router 跳转就可以了。
但是有一丢丢不完美，这样只能通过 js 来跳转，跳转的链接无法使用浏览器自带的右键菜单

### 项目通信问题
项目之间的不要有太多的数据依赖，毕竟项目还是要独立运行的。通信操作需要判断是否 qiankun 模式，做兼容处理。

通过 props 传递父项目的 Vuex ，如果子项目是 vue 技术栈，则会很好用。假如子项目是 jQuery/react/angular ，就不能很好的监听到数据的变化。

qiakun 提供了一个全局的 GlobalState 来共享数据。主项目初始化之后，子项目可以监听到这个数据的变化，也能提交这个数据。

```javascript

// 主项目初始化
import { initGlobalState } from 'qiankun';
const actions = initGlobalState(state);
// 主项目项目监听和修改
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);

// 子项目监听和修改
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  props.setGlobalState(state);
}
```
vue 项目之间数据传递还是使用共享父组件的 Vuex 比较方便，与其他技术栈的项目之间的通信使用 qiankun 提供的 GlobalState 。


### 子项目之间的公共插件如何共享
如果主项目和子项目都用到了同一个版本的 Vue/Vuex/Vue-Router 等，主项目加载一遍之后，子项目又加载一遍，就很浪费。

要想复用公共依赖，前提条件是子项目必须配置 externals ，这样依赖就不会打包进 chunk-vendors.js ，才能复用已有的公共依赖。
按需引入公共依赖，有两个层面：

1. 没有使用到的依赖不加载
2. 大插件只加载需要的部分，例如 UI 组件库的按需加载、echarts/lodash 的按需加载。

webpack 的 externals 是支持大插件的按需引入的：

```javascript
subtract : {
   root: ['math', 'subtract']
}
```

subtract 可以通过全局 math 对象下的属性 subtract 访问（例如 window['math']['subtract']）。

#### single-spa 可以按需引入子项目的公共依赖

single-spa 是使用 systemJs 加载子项目和公共依赖的，将公共依赖和子项目一起配置到 systemJs 的配置文件 importmap.json ，就可以实现公共依赖的按需加载：

```javascript
{
    "imports": {
        "appVueHash": "http://localhost:7778/app.js",
        "appVueHistory": "http://localhost:7779/app.js",
        "single-spa": "https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.7/system/single-spa.min.js",
        "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js",
        "vue-router": "https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js",
        "echarts": "https://cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js"
    }
}
```

### qiankun 使用总结

1. 只有一个子项目时，要想启用预加载，必须使用start({ prefetch: 'all' })


2. js 沙箱并不能解决所有的 js 污染，例如我用 onclick 或 addEventListener 给 <body> 添加了一个点击事件，js 沙箱并不能消除它的影响，所以说，还得靠代码规范和自己自觉


3. qiankun 框架不太好实现 keep-alive 需求，因为解决 css/js 污染的办法就是删除子项目插入的 css 标签和劫持 window 对象，卸载时还原成子项目加载前的样子，这与 keep-alive 相悖： keep-alive 要求保留这些，仅仅是样式上的隐藏。


4. qiankun 无法很好嵌入一些老项目


虽然 qiankun 支持 jQuery 老项目，但是似乎对多页应用没有很好的解决办法。每个页面都去修改，成本很大也很麻烦，但是使用 iframe 嵌入这些老项目就比较方便。

5. 安全和性能的问题

qiankun 将每个子项目的 js/css 文件内容都记录在一个全局变量中，如果子项目过多，或者文件体积很大，可能会导致内存占用过多，导致页面卡顿。
另外，qiankun 运行子项目的 js，并不是通过 script 标签插入的，而是通过 eval 函数实现的，eval 函数的安全和性能是有一些争议的：MDN的eval介绍

6. 微前端调试时，每次都需要分别进入子项目和主项目运行和打包，非常麻烦，可以使用 npm-run-all 插件来实现：一个命令，运行所有项目。

```javascript
{
  "scripts": {
    "install:hash": "cd app-vue-hash && npm install",
    "install:history": "cd app-vue-history && npm install",
    "install:main": "cd main && npm install",
    "install:purehtml": "cd purehtml && npm install",
    "install-all": "npm-run-all install:*",
    "start:hash": "cd app-vue-hash && npm run serve ",
    "start:history": "cd app-vue-history && npm run serve",
    "start:main": "cd main && npm run serve",
    "start:purehtml": "cd purehtml && npm run serve",
    "start-all": "npm-run-all --parallel start:*",
    "serve-all": "npm-run-all --parallel start:*",
    "build:hash": "cd app-vue-hash && npm run build",
    "build:history": "cd app-vue-history && npm run build",
    "build:main": "cd main && npm run build",
    "build-all": "npm-run-all --parallel build:*"
  }
}
```

7. 给 body 、 document 等绑定的事件，请在 unmount 周期清除

js 沙箱只劫持了 window.addEventListener，使用 document.body.addEventListener 或者 document.body.onClick 添加的事件并不会被沙箱移除，会对其他的页面产生影响，请在 unmount 周期清除

8. 子项目之间相互跳转方式
> 需要使用主项目的router来切换，有个弊端需要使用js来切换不然使用router-view组件
this.$root.parentRouter.push(path)

9. 父子组件数据共用
> 需要使用主项目的Vuex，使用方式this.$root.parentVuex.state。变更主项目数据使用this.$root.parentVuex.commit('', {})
