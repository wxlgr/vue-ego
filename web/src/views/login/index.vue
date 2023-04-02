<template>
  <div>
    <div class="banner">易购商城后台系统</div>
    <el-card class="box-card">

      <!-- stretch 标签的宽度撑开 -->
      <el-tabs stretch v-model="activeName">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" status-icon ref="loginForm" :rules="rules" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="loginForm.username" clearable=""></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" clearable="" show-password></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input type="text" v-model="registerForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="registerForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="registerForm.password" clearable show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpassword">
              <el-input type="password" v-model="registerForm.checkpassword" clearable show-password></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitRegisterForm('registerForm')">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import api from "../../api";

import { mapMutations } from "vuex";

// 解析token
import jwtDecode from "jwt-decode";

export default {
  data() {
    //用户名验证方法
    var validateUsername = (rule, value = '', callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (value.length < 4 || value.length > 10) {
        callback(new Error("用户名长度必须在4~10"));
      } else {
        callback();
      }
    };

    //邮箱验证
    var validateEmail = (rule, value = '', callback) => {
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value.trim() === "") {
        callback(new Error("邮箱不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("邮箱格式不对"));
      } else {
        callback();
      }
    };
    //密码验证
    var validatePassword = (rule, value = '', callback) => {
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (value.trim() === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    //确认密码验证
    var validateCheckPassword = (rule, value = '', callback) => {
      if (value.trim() === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };

    return {
      activeName: "login", //默认tab
      loginForm: {
        // username: "",
        // password: "",
      },
      registerForm: {
        // username: "",
        // password: "",
        // checkpassword: "",
        // email: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkpassword: [{ validator: validateCheckPassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["updateUsername", "updateToken"]),

    // 点击登录
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单校验通过
          api
            .login({
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then((res) => {
              this.$message({
                showClose: true,
                duration: 2000,
                message: res.data.msg,
                type: res.data.status === 200 ? "success" : "error",
              });
              if (res.data.status === 200) {
                let obj = {
                  token: res.data.token,
                  //解析出username
                  username: jwtDecode(res.data.token).username,
                };
                this.updateToken(obj.token);
                this.updateUsername(obj.username);
                localStorage.setItem("ego", JSON.stringify(obj));
                this.$router.push("/");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("表单验证未通过!!");
          return false;
        }
      });
    },

    //点击注册
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单校验通过
          let { username, password, email } = this.registerForm;
          api
            .register({
              username,
              password,
              email,
            })
            .then((res) => {
              console.log(res);
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: res.data.status === 200 ? "success" : "error",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("表单验证未通过!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.banner {
  margin-top: 100px;
  font-size: 30px;
  text-align: center;
}

.box-card {
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>