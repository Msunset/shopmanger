<template>
  <div class="login-warp">
    <el-form class="login-form"
             label-position="top"
             label-width="80px"
             :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click.passive="login()" id="btn">登录</el-button>

    </el-form>

  </div>
</template>

<script>
  export default {
    created() {
      let that = this;
      document.onkeypress = function(e) {
        var keycode = document.all ? event.keyCode : e.which;
        if (keycode == 13) {
          that.login();// 登录方法名
          return false;
        }
      };
    },
    data () {
      return {
        formData: {
          username: '',
          password: '',
        },
        message:''
      }

    },
    methods: {
      open2(msg,type) {
        this.$message({
          message: msg,
          type: type
        });
      },
      login () {
        console.log(this.formData)
        this.axios.post('login', this.formData).then(res => {
          console.log(res)
          const {data,meta:{msg,status}} = res.data
          if (status ===200 ){
            console.log(data.token)
            localStorage.setItem('token',data.token)
            this.open2(msg,'success')
            this.$router.push("/")
          }else {
            this.open2(msg,'warning')
          }

        })
      }
    }
  }
</script>

<style scoped>
  .login-warp {
    height: 100%;
    background-image: url('http://img.1ppt.com/uploads/allimg/1605/4_160506151207_1.jpg');
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .login-warp .login-form {
    width: 500px;
    background: #ebeeff;
    border-radius: 10px;
    padding: 45px;
    border: rgba(209, 206, 238, 0.91) solid thin;
  }

  .login-warp .login-btn {
    background-color: #45beff;
    width: 100%;
  }

</style>
