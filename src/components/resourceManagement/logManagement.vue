<script>
export default {
  data() {
    return {
      podLogInfo:{
        namespace: "",
        name:"",
        container:""
      },
      namespace: "选择命名空间",
      podName: "选择Pod",
      container: "请选择容器",
      namespaces: [],
      podListByNs:[],
      containers: [],
      logStr: ""
    };
  },
  created() {
    this.getNamespaces();
  },
  methods: {
    getLog(container){
      this.$axios({
        url: `http://localhost:8081/dgut/log`,
        method: "get",
        params: {
          namespace: this.namespace,
          name: this.podName,
          container: container
        }
      }).then((res) => {
          if (res.data.code == 200) {
            this.container = container;
            this.logStr = res.data.data;
            if(res.data.data==null || res.data.data.length==0){
              this.$message.warning("该容器下无日志");
              this.logStr = "无日志结果";
            }
          }
           else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPodInfo(pod){
      this.$axios({
        url: `http://localhost:8081/dgut/pod/container`,
        method: "get",
        params: {
          ns: this.namespace,
          pod: pod
        }
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.podName = pod;
            if(res.data.data.length==0){
              this.$message.warning("该Pod下无容器");
              this.podName = "无";
            }
            this.containers = res.data.data;
          }
           else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPod(ns) {
      this.$axios({
        url: `http://localhost:8081/dgut/pod?namespace=${ns}`,
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.namespace = ns;
            this.podListByNs = [];
            if(res.data.data.length==0){
              this.$message.warning("该命名空间下无Pod");
              this.podName = "无";
            }
            res.data.data.forEach(pod => {
              this.podListByNs.push(pod.name);
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取namespaces
    getNamespaces() {
      this.$axios({
        url: "http://localhost:8081/dgut/namespace",
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.namespaces = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<template>
  <div class="exam">
    <el-row class="el-row">
      <el-col :span="4">
        <el-dropdown trigger="click" @command="getPod">
          <el-button type="success" >
            {{namespace}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="">all</el-dropdown-item> -->
            <div v-for="(item, index) in this.namespaces" :key="index">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3">
        <el-dropdown trigger="click" @command="getPodInfo">
          <el-button type="success" >
            {{podName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in this.podListByNs" :key="index">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3">
        <el-dropdown trigger="click" @command="getLog">
          <el-button type="success" >
            {{container}}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in this.containers" :key="index">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <div class="myborder">{{this.logStr}}</div>
  </div>
</template>
<style lang="less" scoped>
.exam {
  padding: 0px 40px;

  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .edit {
    margin-left: 20px;
  }

  .el-table tr {
    background-color: #dd5862 !important;
  }
}

.myborder{
    margin-top: 20px;
    border-radius: 15px;
    border-color: rgb(152, 151, 151);
    height: 500px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
</style>