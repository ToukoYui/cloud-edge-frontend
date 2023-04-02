<script>
export default {
  data() {
    return {
      // namespace: [],
      multipleSelection: [],
      deletePodInfo: {
        name: "",
        namespace: "",
      },
      deletePodInfoList: [],
      form: {
        metadata: {
          name: "",
          namespace: "",
        },
        spec: {
          containers: [
            {
              name: "",
              image: "",
              ports: [
                {
                  hostPort: 0,
                  containerPort: 0,
                },
              ],
            },
          ],
        },
      },
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      pagination: {
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 8, //每页条数
      },
      tableDate: [
        {
          id: 0,
          name: "假数据nginx-pod-697786dc74-qghjv",
          status: "Running",
          image: ["nginx:1.17.1"],
          ip: "10.244.2.5",
          portMapper: ["--:80"],
          createdTime: "2023-03-05 11:38:26",
        },
      ],
    };
  },
  created() {
    this.getPotInfo("");
    this.getNamespace();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 展示表单
    // showDialog(){

    //   this.dialogFormVisible = true
    // },
    // 获取namespace
    getNamespace() {
      this.$axios({
        url: "http://localhost:8081/dgut/namespace",
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.namespace = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showPodTable() {},
    //  删除Pod
    deletePod() {
      //包装数据
      this.multipleSelection.forEach((item, index) => {
        this.deletePodInfo.name = item.name;
        this.deletePodInfo.namespace = item.namespace;
        this.deletePodInfoList.push(this.deletePodInfo);
      });
      this.$axios({
        url: "http://localhost:8081/dgut/pod",
        method: "delete",
        data: this.deletePodInfoList,
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            this.dialogDeleteVisible = false;
            //删除Pod成功则重新查询Pod
            this.getPotInfo("");
          } else {
            this.$message.error(res.data.msg);
            this.dialogDeleteVisible = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 创建Pod
    createPod() {
      console.log(this.form);
      this.$axios({
        url: "http://localhost:8081/dgut/pod",
        method: "post",
        data: this.form,
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });

            //创建Pod成功则重新查询Pod,并重置表单
            this.form = null;
            this.getPotInfo();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialogFormVisible = false;
    },
    // 获取Pod
    getPotInfo(ns) {
      this.$axios({
        url: `http://localhost:8081/dgut/pod?namespace=${ns}`,
        method: "get",
      })
        .then((res) => {
          if (res.data.code == 200) {
            // this.pagination = res.data.data;
            // this.tableDate.push(res.data.data)
            this.tableDate = res.data.data;
            console.log(this.tableDate);
            console.log(res.data.data);
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //     getPot() {
    //         //分页查询所有试卷信息
    //         this.$axios(
    //             `/api/answers/${this.pagination.current}/${this.pagination.size}`
    //         ).then(res => {
    //             if (res.data.code == 200) {
    //                 this.pagination = res.data.data;
    //                 //console.log(res);
    //                 this.$message({
    //                     type: 'success',
    //                     message: res.data.msg
    //                 })
    //             } else {
    //                 this.$message.error(res.data.msg)
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         });
    //     },
    //     //改变当前记录条数
    //     handleSizeChange(val) {
    //         this.pagination.size = val;
    //         this.getAnswerInfo();
    //     },
    //     //改变当前页码，重新发送请求
    //     handleCurrentChange(val) {
    //         this.pagination.current = val;
    //         this.getAnswerInfo();
    //     },
    //     tableRowClassName({ row, rowIndex }) {
    //         if (rowIndex % 2 == 0) {
    //             return "warning-row";
    //         } else {
    //             return "success-row";
    //         }
    //     }
  },
};
</script>
<template>
  <div class="exam">
    <el-row class="el-row">
      <el-col :span="3">
        <el-button type="primary" @click="dialogFormVisible = true"
          >新增Pod</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-button type="danger" @click="dialogDeleteVisible = true"
          >刪除Pod</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-dropdown trigger="click" @command="getPotInfo">
          <el-button type="success">
            命名空间<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="">all</el-dropdown-item>
            <div v-for="(item, index) in this.namespace" :key="index">
              <el-dropdown-item :command="item">{{ item }}</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>

    <el-table
      :data="tableDate"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="name" label="名称" width="250"></el-table-column>
      <el-table-column prop="status" label="状态" width="110"></el-table-column>
      <el-table-column prop="image" label="镜像" width="230"></el-table-column>
      <el-table-column prop="ip" label="IP地址" width="130"></el-table-column>
      <el-table-column
        prop="portMapper"
        label="端口映射"
        width="130"
      ></el-table-column>
      <el-table-column
        prop="namespace"
        label="命名空间"
        width="105"
      ></el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间"
        width="160"
      ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[6, 10]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page"
    ></el-pagination>

    <!-- 新增Pod表单对话框 -->
    <el-dialog title="新增Pod设置" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Pod名称:" :label-width="formLabelWidth">
          <el-input v-model="form.metadata.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="命名空间:" :label-width="formLabelWidth">
          <el-select
            v-model="form.metadata.namespace"
            placeholder="请选择命名空间"
          >
            <div v-for="(item, index) in this.namespace" :key="index">
              <el-option :label="item" :value="item"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="容器名称:" :label-width="30">
          <el-input
            v-model="form.spec.containers[0].name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="镜像设置:">
          <el-input
            v-model="form.spec.containers[0].image"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="主机端口:">
          <el-input
            v-model="form.spec.containers[0].ports[0].hostPort"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="容器端口:">
          <el-input
            v-model="form.spec.containers[0].ports[0].containerPort"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createPod()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除Pod对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogDeleteVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>你确认要删除该Pod吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletePod()">确 定</el-button>
      </span>
    </el-dialog>
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

.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}


.el-row {
    margin-top: 15px;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
  }
</style>