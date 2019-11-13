import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

import Layout from '@/layout'
import {Message} from 'element-ui'
import getTitle from '@/utils/getTitle'

/*通用routers*/ 
export const currencyRoutes = [
  {
    path:'/login',
    name:'Login',
    component: () => import('@/views/login'),
    meta:{title:'登录页'},
    hidden:true
  },
  {
    path:'/404',
    name:'404',
    component: () => import('@/views/error-page/404.vue'),
    hidden:true
  },
  {
    path:'/',
    name:'Home',
    component:Layout,
    redirect:'/dashbord',
    children:[
      {
        path:'dashbord',
        name:'Dashbord',
        component: () => import('@/views/dashboard'),
        meta:{title:'首页',icon:'el-icon-s-data'}
      }
    ]
  },
  {
    path:'/personal',
    name:'Personal',
    component:Layout,
    redirect:'/personal/index',
    children:[
      {
        path:'index',
        name:'Personal-index',
        component: () => import('@/views/personal'),
        meta:{title:'个人中心'}
      }
    ]
  },
  {
    path:'/driver',
    name:'Driver',
    component:Layout,
    redirect:'/driver/index',
    children:[
      {
        path:'index',
        name:'Driver-index',
        component: () => import('@/views/driver-page'),
        meta:{title:'引导指南',icon:'el-icon-s-flag'}
      }
    ]
  }
]

/*动态添加routers*/
export const asyncRoutes = [
  {
    path:'permission',
    name:'Permission',
    component:Layout,
    redirect:'/permission/page-use',
    meta:{
      title:'权限许可',
      icon:'el-icon-lock'
    },
    children:[
      {
        path:'page-user',
        name:'PageUser',
        component: () => import('@/views/permission/page-user'),
        meta:{title:'用户页面',icon:'el-icon-user'}
      },
      {
        path:'page-admin',
        name:'PageAdmin',
        component: () => import('@/views/permission/page-admin'),
        meta:{
          title:'管理员页面',
          icon:'el-icon-user-solid'
        }
      },
      {
        path:'roles',
        name:'Roles',
        component: () => import('@/views/permission/roles'),
        mate:{title:'权限设置',icon:'el-icon-s-tools'}
      }
    ]
  },
  {
    path:'/echarts',
    name:'Echarts',
    component:Layout,
    redirect:'/echarts/slide-chart',
    meta:{icon:'el-icon-s-marketing',title:'Echarts'},
    children:[
      {
        path:'slide-chart',
        name:'Slide-chart',
        component: () => import('@/views/echarts/slide-chart'),
        meta:{title:'滑动charts'}
      },
      {
        path:'dynamic-chart',
        name:'Dynamic-chart',
        component: () => import('@/views/echarts/dynamic-chart'),
        meta:{title:'切换charts'}
      },
      {
        path:'map-chart',
        name:'Map-chart',
        component: () => import('@/views/echarts/map-chart'),
        meta:{title:'map'}
      }
    ]
  },
  {
    path:'*',
    name:'*404',
    redirect:'/404',
    hidden:true
  }
]

const createRouter = () => {
  return new Router({
    routes:currencyRoutes,
    mode:"history",
    scrollBehavior(){
      return {x:0,y:0}
    }
  })
}
const router = createRouter()
/**解决addRoute不能删除动态路由问题 */
export function resetRouter(){
  const reset = createRouter()
  router.matcher = reset.matcher
}
//导航守卫
router.beforeEach(async (to, from, next) => {
  document.title = getTitle(to.meta.title)
  if(to.path === '/login'){
    next()
  }else{
    if(store.getters.token){
      const hasRoles = store.getters.roles.length > 0
      if(hasRoles){
        next()
      }else{
        try{
          const {roles} = await store.dispatch('user/_getInfo')
          const addRoutes = await store.dispatch(
            'permission/getAsyncRoutes',
            roles
          )
          router.addRoutes(addRoutes)
          next({...to,replace:true})
        }catch(error){
          Message.error(error)
        }
      }
    }else{
      next({
        path:'/login',
        query:{
          redirect:to.fullPath
        }
      })
    }
  }
})
export default router