<template>
  <el-card class="vessel">
<!--    面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right " class="crumbs">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-input placeholder="请输入姓名" v-model="query" style="width: 30%;padding: 20px">

        <el-button slot="append" icon="el-icon-search" @click="getUser()"></el-button>
      </el-input>
      <el-button type="success"  @click="dialogForm()">添加用户</el-button>
    </div>

    <div style="padding: 20px">
      <el-table
        :data="tableData"
        style="width: 100%" class="crumbs">
        <el-table-column
          type="index"
          label="#"
          width="70">
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.email}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="电话"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.create_time | dateFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户状态"
          width="180">
          <template slot-scope="scope" >
            <el-switch
              @change="updateState(scope.row.id,scope.row.mg_state)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
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
      <div class="block">
<!--        分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <div>

<!--添加弹框-->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" class="dialog">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input  v-model="form.username" ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" :label-width="formLabelWidth" >
            <el-input v-model="form.password" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="addUser()">确 定</el-button>
        </div>
      </el-dialog>
<!--        编辑弹框-->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisible1" class="dialog">
          <el-form :model="form">
            <el-form-item label="* 用户名" :label-width="formLabelWidth" >
              <el-input  v-model="form.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="form.mobile" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="updateUser(form.id)">确 定</el-button>
          </div>
        </el-dialog>
<!--        权限弹窗-->
        <el-dialog title="权限分配" :visible.sync="dialogFormVisible2" class="dialog">
          <el-form :model="form">
            <el-form-item label="* 用户名" :label-width="formLabelWidth" >
              <el-input  v-model="form.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="权限分配" :label-width="formLabelWidth" >
              <el-select v-model=" id">
                <el-option  label="请选择" :value="-1">
                </el-option>
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="updatePermission(form)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </el-card>


</template>

<script>
  export default {
    created () {
      this.getUser()
    },
    data () {
      return {
        id: '',
        options:[],
        tableData: [],
        pageSize : 10,
        total:0,
        currentPage4:1,
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible1 :false,
        dialogTableVisible1: false,
        dialogFormVisible2 :false,
        form: {
          id:'',
          username: '',
          password: '',
          email: '',
          mobile: '',
        },
        query:'',
        formLabelWidth: '120px',
      }

    },


    methods: {

      //更该用户权限
      //1.查询权限
      getPermission(userId){
        this.dialogForm2()
        this.axios.get(`users/${userId}`).then(res =>{
          console.log(res)
          const {data:{username,rid},meta:{msg,status}} = res.data
          this.id = rid
          this.form.username = username
          this.form.id = userId
        })
        this.axios.get(`roles`).then(res =>{
          const {data} = res.data
          this.options = data
          console.log(res)
        })


      },
      //2.修改权限
      updatePermission(form){
        this.axios.put(`users/${form.id}/role`,{rid:this.id}).then(res => {
          const {meta:{msg,status}} = res.data
          if(status === 200){
            this.$message.success(msg)
            this.dialogFormVisible2 =  false
          }else {
            this.$message.error(msg)
          }
          console.log(res)

        })

      },
      //编辑用户
      //1.根据id查询
      getUserById(userId){
        this.dialogForm1()
        this.axios.get(`users/${userId}`).then(res =>{
          console.log(res)
          const {data,meta:{msg,status}} = res.data
          if(status === 200){
            this.form = data
          }

        })

      },
      //2.更改用户资料
      updateUser(userId){
        console.log()
        this.axios.put(`users/${userId}`,this.form).then(res =>{
          console.log(res)
          const {data,meta:{msg,status}} = res.data
          if(status === 200){
            this.getUser()
            this.cancel()

          }
        })

      },

      //删除用户
      deleteUser(userId){
        console.log(userId)
        this.axios.delete(`users/${userId}`).then(res => {
        console.log(res)
          const {meta:{msg,status}} = res.data
          if(status === 200){
            this.$message.success(msg)
            this.getUser()
          }else {
            this.$message.error(msg)
          }
        })

      },
      //更改用户状态
      updateState(id,state){
        console.log(id,state)
       // console.log(id,state)
        this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        this.axios.put(`users/${id}/state/${state}`).then(res =>{
          console.log(res)
          const {meta:{msg,status}} = res.data
          if(status === 200){
            this.$message.success(msg)
            this.getUser()
          }else {
            this.$message.error(msg)
          }
        })
      },
      //添加用户
      addUser(){
        this.axios.post('users',this.form).then(res => {
          console.log(res)
          const {meta:{msg,status}} = res.data
          console.log(status)
          if(status === 201){
            this.$message.success(msg)
            this.getUser()
          }else {
            this.$message.error(msg)

          }
          this.cancel()
        })


      },
      //获取用户列表
      getUser () {
        this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        //this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        this.axios.get('users?query='+this.query+'&pagenum='+this.currentPage4+'&pagesize='+this.pageSize).then(res => {
          console.log(res.data)
          const {data: {users,total}, meta: {msg, status}} = res.data
          if (status === 200) {
            console.log(total)
            this.total = total
            this.tableData = users
          }
        })
      },
      cancel(){
        this.dialogFormVisible =  false
        this.dialogFormVisible1 =  false
        this.dialogFormVisible2 =  false
      },
      //打开弹框（添加）
      dialogForm(){
        this.form = {}
        this.dialogFormVisible =  true
      },
      //打开弹框（编辑）
      dialogForm1(){
        this.form = {}
        this.dialogFormVisible1 =  true
      },
      //打开弹框(权限)
      dialogForm2(){
        this.form = {}
        this.dialogFormVisible2 =  true
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.currentPage4 = 1
        this.getUser ()
        console.log(`每页 ${val} 条`)

      },
      handleCurrentChange (val) {
        this.currentPage4 = val
        this.getUser ()
        console.log(`当前页: ${val}`)
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

  .block {
    width: 100%;
    padding-left: 25%;
    margin-top: 20px;

  }

</style>
