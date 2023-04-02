<script>
export default {
  data() {
    return {
      podLogInfo:{
        namespace: "",
        name:"",
        container:""
      },
      namespaces: [],
      podListByNs:[]
    };
  },
  created() {
    this.getNamespaces();
  },
  methods: {
    getPot(ns) {
      this.$axios({
        url: `http://localhost:8081/dgut/pod?namespace=${ns}`,
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.podListByNs = [];
            if(res.data.data.length==0){
              this.$message.warning("该命名空间下无Pod");
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
        <el-dropdown trigger="click" @command="getPot">
          <el-button type="success">
            选择命名空间<i class="el-icon-arrow-down el-icon--right"></i>
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
        <el-dropdown trigger="click" @command="getPotInfo">
          <el-button type="success">
            选择Pod<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in this.podListByNs" :key="index">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3">
        <el-dropdown trigger="click" @command="getPotInfo">
          <el-button type="success">
            选择容器<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div v-for="(item, index) in this.podListByNs" :key="index">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <div class="myborder"></div>
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