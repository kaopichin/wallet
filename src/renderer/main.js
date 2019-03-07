import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

import VueI18n from 'vue-i18n'
import LangEn from '../../static/lang/en'
import LangCh from '../../static/lang/ch'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: '', // 语言标识
  messages:{
    'en': LangEn,
    'ch': LangCh
  }
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')

import { walletList } from '@/service/getData';
var _this=this;

router.beforeEach((to, from, next) => {
if(to.name=="index" && from.name=="start"){
	walletList().then(res=>{
		localStorage.setItem('wallets',res.data.length)
		  if(res.data.length==0){
		     next()
			}else{
				var p=res.data[0].id;
				next({path: '/home',query:{id:p}})
			}
	}).catch(res=>{})
}else{
	next()
}
})