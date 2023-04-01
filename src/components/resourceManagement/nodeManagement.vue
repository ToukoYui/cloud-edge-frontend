//查询所有题库
<script>
export default {
    data() {
        return {
            pagination: {
                //分页后的考试信息
                current: 1, //当前页
                total: null, //记录条数
                size: 8 //每页条数
            },
            tableDate: [{
                "id": 0,
                "name": "masterx",
                "ip": "192.168.10.101",
                "role": "masterx",
                "labels": [
                    "dev"
                ]
            },]
        };
    },
    created() {
        this.getNodeInfo();
    },
    methods:{
        getNodeInfo(){
            this.$axios({
                url: 'http://localhost:8081/dgut/node',
                method: 'get'
            }
            ).then(res => {
                if (res.data.code == 200) {
                    // this.pagination = res.data.data;
                    // this.tableDate.push(res.data.data)
                    this.tableDate = res.data.data
                    console.log(this.tableDate);
                    console.log(res.data.data)
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                } else {
                    this.$message.error(res.data.message)
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
    // methods: {
    //     getAnswerInfo() {
    //         //分页查询所有试卷信息
    //         this.$axios(
    //             `/api/answers/${this.pagination.current}/${this.pagination.size}`
    //         ).then(res => {
    //             if (res.data.code == 200) {
    //                 this.pagination = res.data.data;
    //                 //console.log(res);
    //                 this.$message({
    //                     type: 'success',
    //                     message: res.data.message
    //                 })
    //             } else {
    //                 this.$message.error(res.data.message)
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
    // }
};
</script>
<template>
  <div class="exam">
    <el-table :data="tableDate" border :row-class-name="tableRowClassName">
      <el-table-column
        fixed="left"
        prop="name"
        label="名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="ip" label="ip地址" width="200"></el-table-column>
      <el-table-column prop="role" label="角色" width="200"></el-table-column>
      <el-table-column prop="labels" label="标签" width="200"></el-table-column>
      <el-table-column prop="score" label="操作" width="150"></el-table-column>
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
</style>
