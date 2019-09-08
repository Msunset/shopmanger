<template>

  <el-card class="vessel" >
    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right " class="crumbs">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--      表格-->

    <el-table
      height="650px"
      :data="tableData"
      style="width: 100%;padding: 25px;border-radius: 10px;margin: 10px">
      <el-table-column
        type="index"
        label="#"
        width="70">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="300px">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="400px">
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'"> 二级</span>
          <span v-if="scope.row.level==='2'"> 三级</span>
        </template>
      </el-table-column>
    </el-table>


  </el-card>


</template>

<script>
  export default {
    data () {
      return {
        tableData: []
      }
    },
    created(){
      this.getPermission()
    },
    methods: {
      getPermission(){
        this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        this.axios.get(`rights/list`).then(res =>{
          console.log(res)
          this.tableData = res.data.data

        })

      },
    }

  }
</script>

<style scoped>
  .vessel {
    height: 100%;
    border-radius: 10px;
    background-color: #ebeeff;
  }

  .crumbs {
    padding: 30px;
    border-radius: 10px;
  }
  .block {
    width: 100%;
    padding-left: 25%;
    margin-top: 20px;

  }
</style>
