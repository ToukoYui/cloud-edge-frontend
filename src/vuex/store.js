import VUE from 'vue'
import VUEX from 'vuex'

VUE.use(VUEX)

const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  menu: [{
      index: '1',
      title: '用户管理资源',
      icon: 'icon-kechengbiao',
      content: [],
    },
    {
      index: '2',
      title: '资源管理',
      icon: 'icon-tiku',
      content: [{
        item1: '节点管理',
        path: '/nodeManagement'
      }, {
        item2: 'Pod管理',
        path: '/podManagement'
      }, {
        item3: '资源调度',
        path: '/resourceScheduling'
      }, {
        item4: '镜像管理',
        path: '/imageManagement'
      }, {
        item5: '数据卷管理',
        path: '/dataManagement'
      }, {
        item6: '日志管理',
        path: '/logManagement'
      }],
    },
    {
      index: '3',
      title: '资源控制',
      icon: 'icon-performance',
      content: [],
    },
    // {
    //   index: '4',
    //   title: '学生管理',
    //   icon: 'icon-role',
    //   content: [{
    //     item1: '学生管理',
    //     path: '/studentManage'
    //   }, {
    //     item2: '添加学生',
    //     path: '/addStudent'
    //   }],
    // },
    // {
    //   index: '5',
    //   title: '教师管理',
    //   icon: 'icon-Userselect',
    //   content:[{item1:'教师管理',path:'/teacherManage'},{item2: '添加教师',path: '/addTeacher'}],
    // },
    // {
    //   index: '7',
    //   title: '模块管理',
    //   icon: 'icon-module4mokuai',
    //   content:[{item1:'模块操作',path:'/module'}],
    // }
  ],
}
const mutations = {
  practice(state, status) {
    state.isPractice = status
  },
  toggle(state) {
    state.flag = !state.flag
  },
  changeUserInfo(state, info) {
    state.userInfo = info
  }
}
const getters = {

}
const actions = {
  getUserInfo(context, info) {
    context.commit('changeUserInfo', info)
  },
  getPractice(context, status) {
    context.commit('practice', status)
  }
}
export default new VUEX.Store({
  state,
  mutations,
  getters,
  actions,
  // store
})
