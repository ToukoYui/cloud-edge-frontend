import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login', //登录界面
      component: () => import('@/components/common/login')
    },
    {
      path: '/index', //教师主页
      component: () => import('@/components/admin/index'),
      children: [{
          path: '/', //首页默认路由
          component: () => import('@/components/common/hello')
        },
        {
          path: '/nodeManagement', //节点管理
          component: () => import('@/components/resourceManagement/nodeManagement')
        },
        {
          path: '/podManagement', //Pod管理
          component: () => import('@/components/resourceManagement/podManagement')
        },
        {
          path: '/resourceScheduling', //资源调度
          component: () => import('@/components/resourceManagement/resourceScheduling')
        },
        {
          path: '/imageManagement', //镜像管理
          component: () => import('@/components/resourceManagement/imageManagement')
        },
        {
          path: '/dataManagement', //数据卷管理
          component: () => import('@/components/resourceManagement/dataManagement')
        },
        {
          path: '/logManagement', //日志管理
          component: () => import('@/components/resourceManagement/logManagement')
        },
      ]
    }
  ]
})
