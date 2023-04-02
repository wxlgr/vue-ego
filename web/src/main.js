import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/css/common.css'

import './plugins/element.js'


import './router/permisson'

// 事件总线
// 同级组件以此可通信
import './utils/eventbus'

Vue.config.productionTip = false

/**
 * 初始化
 */
let tokenObj =JSON.parse(localStorage.getItem('ego'))
if(tokenObj){
  store.commit('loginModule/updateToken',tokenObj.token)
  store.commit('loginModule/updateUsername',tokenObj.username)
}


// 引用注入
import i18n from './plugins/i18n'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
