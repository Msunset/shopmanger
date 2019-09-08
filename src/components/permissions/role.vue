<template>
  <el-card class="vessel">
    <!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right " class="crumbs">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
    <el-col>
      <el-button class="role btn" type=""  @click="addRole()">添加角色</el-button>
    </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-left: 20px;margin-top: 30px;height: 650px" class="crumbs">
      <el-table-column type="expand">

      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        width="70">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="280">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="280">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="getUserById(scope.row.id)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope.row.id)">删除
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="getPermission(scope.row.id)">权限
          </el-button>
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
      this.getRole()
    },
    methods: {
      getRole(){
        this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        this.axios.get(`roles`).then(res =>{
          console.log(res)
          this.tableData = res.data.data
        })

      },
      addRole(){

      }
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
  .role.btn{
    margin-left: 30px;
    margin-top: 10px;
  }

</style>
