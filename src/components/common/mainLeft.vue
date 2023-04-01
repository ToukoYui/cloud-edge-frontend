<!--左边下拉导航栏-->
<script>
import { mapState } from 'vuex'
export default {
    name: "mainLeft",
    data() {
        return {

        }
    },
    computed: mapState(["flag", "menu"]),
    created() {
        this.addData()
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        //点击标题传递参数给navigator组件
        handleTitle(index, index2) {
            this.bus.$emit('sendIndex', index)
            this.bus.$emit('index', index2)
        },
        // addData() {
        //     let role = this.$cookies.get("role")
        //     //console.log(this.$route.path);
        //     //如果是管理员，就添加教师进行管理
        //     if (role == 0) {
        //         this.menu.push({
        //             index: '5',
        //             title: '教师管理',
        //             icon: 'icon-Userselect',
        //             content: [{ item1: '教师管理', path: '/teacherManage' }, { item2: '添加教师', path: '/addTeacher' }],
        //         })
        //     }
        // }
    },
}
</script>
<template>
    <div id="left">
        <el-menu active-text-color="#dd5862" text-color="#000" :default-active="this.$route.path"
            class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="flag"
            background-color="#124280" menu-trigger="click" router>
            <el-submenu v-for="(item, index) in menu" :index='item.index' :key="index">
                <template slot="title">
                    <div class="left-width">
                        <i class="iconfont" :class="item.icon"></i>
                        <span slot="title" class="title">{{ item.title }}</span>
                    </div>
                </template>
                <el-menu-item-group v-for="(list, index1) in item.content" :key="index1">
                    <el-menu-item @click="handleTitle(item.index, 0)" :index="list.path" v-if="list.item1 != null">
                        {{ list.item1 }}</el-menu-item>
                    <el-menu-item @click="handleTitle(item.index, 1)" :index="list.path" v-if="list.item2 != null">
                        {{ list.item2 }}</el-menu-item>
                    <el-menu-item @click="handleTitle(item.index, 2)" :index="list.path" v-if="list.item3 != null">
                        {{ list.item3 }}</el-menu-item>
                    <el-menu-item @click="handleTitle(item.index, 3)" :index="list.path" v-if="list.item4 != null">
                        {{ list.item4 }}</el-menu-item>
                    <el-menu-item @click="handleTitle(item.index, 4)" :index="list.path" v-if="list.item5 != null">
                        {{ list.item5 }}</el-menu-item>
                    <el-menu-item @click="handleTitle(item.index, 5)" :index="list.path" v-if="list.item6 != null">
                        {{ list.item6 }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<style>
.el-menu-vertical-demo .el-submenu__title {
    overflow: hidden;
}

.left-width .iconfont {
    font-size: 18px;
    color: #fff;
}

.left-width {
    width: 213px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 900px;
}

#left {
    height: 900px;
    background-color: #124280;
    z-index: 0;
}

#left .el-menu-vertical-demo .title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-left: 14px;
}

.el-submenu {
    border-bottom: 1px solid #eeeeee0f !important;
}

.el-submenu__title:hover {
    background-color: #fff;
}

.el-submenu__title i {
    color: #fbfbfc !important;
}
</style>
