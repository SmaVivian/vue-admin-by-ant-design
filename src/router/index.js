import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

//使用Vue.mixin的方法拦截了路由离开事件，并在该拦截方法中实现了销毁页面缓存的功能。
Vue.mixin({
  beforeRouteLeave:function(to, from, next){
    //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
    if (from && from.meta.rank && to.meta.rank && from.meta.rank>to.meta.rank) {
      
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions)
          {
            var key = this.$vnode.key == null
              ? this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '')
              : this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys  = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
});

/* Layout */
// import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/project/index'),
    meta: {title: '项目', rank: 1 }
  },
  // 项目二级页面
  {
    path: '/project/sub',
    name: 'projectSub',
    component: () => import('@/views/project/sub-index'),
    meta: {title: '项目二级菜单', rank: 2 }
  },
  {
    path: '/project/task',
    name: 'projectTask',
    component: () => import('@/views/project/task'),
    meta: {title: '任务', rank: 2 }
  },
  {
    path: '/project/exhibits',
    name: 'projectExhibits',
    component: () => import('@/views/project/exhibits'),
    meta: {title: '展品', rank: 2 }
  },
  {
    path: '/project/file',
    name: 'projectFile',
    component: () => import('@/views/project/file'),
    meta: {title: '文件', rank: 2 }
  },
  {
    path: '/project/discuss',
    name: 'projectDiscuss',
    component: () => import('@/views/project/discuss'),
    meta: {title: '讨论', rank: 2 }
  },
  {
    path: '/project/statistic',
    name: 'projectStatistic',
    component: () => import('@/views/project/statistic'),
    meta: {title: '统计', rank: 2 }
  }
  // {
  //   path: '/collect',
  //   name: 'collect',
  //   component: () => import('@/views/collect/index'),
  //   meta: {title: '藏品', rank: 1 }
  // },
  // {
  //   path: '/digital',
  //   name: 'digital',
  //   component: () => import('@/views/digital/index'),
  //   meta: {title: '数字资产', rank: 1 }
  // },

  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/register', component: () => import('@/views/register/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/404'), hidden: true },

  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: 'Dashboard',
  //   hidden: true,   // 在左侧sidebar中不显示
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // }
]

export const asyncRouterMap = [
  
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
