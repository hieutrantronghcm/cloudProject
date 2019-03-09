import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginPage from "@/views/LoginPage";
import HomePage from "@/views/HomePage";
import AdminHomePage from "../views/AdminHomePage";
import RegisterPage from "../views/RegisterPage";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'no'},
      component: LoginPage
    },
    {
      path: '/admin',
      name: 'admin home page',
      meta: {layout: 'dashboard'},
      component: AdminHomePage
    },
    {
      path: '/register',
      name: 'register page',
      meta: {layout: 'no'},
      component: RegisterPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (to.path === '/login' || to.path === '/') {
  //
  //   next();
  //   return;
  // } else {
    if (to.path === '/admin' && localStorage.getItem("cdpmToken") != null) {
      next();
      return;
    }
    else if(to.path === '/admin' && localStorage.getItem("cdpmToken") == null) {
      next('/login');
      return;
    }
    else {
      next();
      return;
    }

  // }

})

export default router;
