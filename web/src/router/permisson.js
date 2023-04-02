import router from './index'
import store from '../store'

router.beforeEach((to, from, next) => {
   // console.log(to);
   if (to.matched.some(record => record.meta.requireAuth)) {
      //判断用户是否登录
      const token = store.state.loginModule.token
      return token ? next() : next({ path: '/login' })
   } else {
      next()
   }
})