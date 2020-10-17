import Vue from "vue"
import VueCookies from "vue-cookies-ts"
 
Vue.use(VueCookies)

// nuxt.config.js
export default {
    plugins: ['~plugins/cookies']
  }