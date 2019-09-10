<template>
  <el-container class="container">
    <!--    nav-->
    <el-header class="header">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple img">
            <img src="@/assets/images/logo.png" alt="加载失败" height="60px">
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light model">
            <h2>Green系统管理后台</h2>

          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple url">
            <a @click.passive="singOut()" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!--    aside-->
    <el-container>
      <el-aside width="200px" class="aside">
        <el-col :span="24">
          <el-menu
            :unique-opened="true"
            class="el-menu-vertical-demo"
            router="router">
            <el-submenu v-for="(oneMenu,index) in leftList" :key="index" :index="index+1+''" >
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>{{oneMenu.authName}}</span>
              </template>
              <el-menu-item :index="towMenu.path"  v-for="(towMenu,index) in oneMenu.children" >
                <i class="el-icon-c-scale-to-original"></i>
                <span>{{towMenu.authName}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <!--      main-->
      <el-container>
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    beforeCreate: function () {
      let token = localStorage.getItem('token')
      if (token === null) {
        this.$router.push('login')
      }

    },
    data () {
      return {
        leftList:[],
        index:'',
      }
    },
    created(){
      this.getIndex()
    },
    methods: {
      async getIndex(){
        this.axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        const res = await this.axios.get(`menus`)
        const {data,meta:{msg,status}} = res.data
        this.leftList = data
        console.log(this.leftList)
        console.log(res)
      },
      singOut () {
        localStorage.clear()
        this.$router.push('/login')
        this.$message.warning('退出成功')

      },
      userList () {
        this.$router.push({name: 'userList'}).catch(e =>{})
      }

    }

  }
</script>

<style scoped>
  .container {
    height: 100%;
    background-color: #f6fffc;
  }

  .header {
    background-color: #f6fffc;
  }

  .main {
    background-color: #f6fffc;
  }

  .img {
    left: -15px;
    z-index: 1;
  }

  .model {
    padding-left: 30%;
    color: #6a7165;

  }

  .url a {
    text-decoration: none;
    color: #6a7165;
    line-height: 60px;

  }

  .el-menu-vertical-demo {
    height: 100%;
    width: 100%;
  }


</style>
