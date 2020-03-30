import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTouch from 'vue-touch'
import service from './plugins/feach'
import Calendar from 'vue2-datepick'
import VueCookies from 'vue-cookies'
import Toast from '@/components/toast'
Vue.use(VueCookies)

Vue.prototype.$toast = Toast
Vue.config.productionTip = false
Vue.prototype.$server = service
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(Calendar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
