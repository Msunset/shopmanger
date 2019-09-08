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
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/userList" @click="userList()">
                <i class="el-icon-c-scale-to-original"></i>
                <span>用户列表</span>
              </el-menu-item>

            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-cooperation"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/role">
                <i class="el-icon-thumb"></i>
                <span>角色列表</span>
              </el-menu-item>
              <el-menu-item index="/permission">
                <i class="el-icon-cpu"></i>
                <span>权限列表</span>
              </el-menu-item>

            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-tickets"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="3-1">
                <i class="el-icon-document"></i>
                <span>分类参数</span>
              </el-menu-item>
              <el-menu-item index="3-1">
                <i class="el-icon-document-remove"></i>
                <span>商品分类</span>
              </el-menu-item>

            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-tickets"></i>
                <span>订单列表</span>
              </el-menu-item>

            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1">
                <i class="el-icon-s-grid"></i>
                <span>数据报表</span >
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
      var token = localStorage.getItem('token')
      if (token === null) {
        this.$router.push('login')
      }

    },
    data () {
      return {}
    },
    methods: {
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
