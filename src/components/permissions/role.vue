<template>
  <el-card class="vessel" >
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
      style="width: 100%;margin-left: 20px;margin-top: 30px" class="crumbs">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <span v-if="scope.row.children.length === 0">没有分配权限</span>
          <el-row v-for="(item,index) in scope.row.children" :key="index">
<!--            第一列-->
            <el-col :span="4">
              <el-tag @close="closeTag(scope.row,item.id)" closable class="vesselTag">{{item.authName}}</el-tag>&nbsp;
              <span class="el-icon-d-arrow-right" style="color: #45beff"></span>
            </el-col>
<!--            第二列-->
            <el-col :span="20">
<!--              二级第一列-->
                <el-row v-for="(item2,index) in item.children" :key="index">
                  <el-col :span="4">
                    <el-tag @close="closeTag(scope.row,item2.id)" closable type="success" class="vesselTag">{{item2.authName}}</el-tag>&nbsp;
                    <span class="el-icon-d-arrow-right" style="color:#2db300"></span>
                  </el-col>
                  <!--              二级第二列-->
                  <el-col :span="20">
                    <el-tag @close="closeTag(scope.row,item3.id)" type="warning" class="vesselTag" closable v-for="(item3,index) in item2.children">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
          </el-row>
        </template>
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
            @click="getRight(scope.row)">权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    对话框-->
    <el-dialog
      title="权限管理"
      :visible.sync="dialogVisible"
      width="50%">
      <el-tree
        ref="tree"
        :data="rightList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checked"
        :props="defaultProps"
      style="margin-left: 20px">
      </el-tree>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateRight()">确 定</el-button>
  </span>
    </el-dialog>

  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        dialogVisible:false,
        defaultProps:{
          label:'authName',
          children:'children'
        },
        rightList:[],
        expandNode:[],
        checked:[],
        roleId:''
      }
    },
    created(){
      this.getRole()
    },
    methods: {
      //获取角色权限
      getRight(role){
        this.roleId = role.id
        this.axios.get(`rights/tree`).then(res => {
          this.dialogVisible = true
          console.log(role)
          //显示树状图数据
          let  arr2 = []
          role.children.forEach(res =>{
            res.children.forEach(res =>{
              res.children.forEach(res =>{
                arr2.push(res.id)
              })
            })
          })
          this.checked = arr2
          console.log(arr2)
          this.rightList = res.data.data
        })

      },
      closeTag(role,rightId){
        this.axios.delete(`roles/${role.id}/rights/${rightId}`).then(res =>{
          const {meta:{msg,status}} = res.data
          if (status === 200){
            role.children = res.data.data
            this.$message.success(msg)
          }
        })
      },
      getRole(){
        this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        this.axios.get(`roles`).then(res =>{
          this.tableData = res.data.data
          console.log(res)
        })

      },

      async updateRight(){
        let arr1 = this.$refs.tree.getCheckedKeys()
        let arr2 =this.$refs.tree.getHalfCheckedKeys()
        let arr = [...arr1,...arr2]
        const res = await this.axios.post(`roles/${this.roleId}/rights`,{rids:arr.join(',')})
        const {meta:{msg,status}} = res.data
        console.log(msg)
        if (status === 200){
          this.$message.success(msg)
          this.getRole()
        }
        this.dialogVisible = false


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
  .vesselTag{
   margin: 3px;

  }

</style>
