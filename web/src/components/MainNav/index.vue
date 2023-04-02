<template>
  <div>
    <div class="header">
      <div class="login">
        <el-dropdown @command="handleCommand" class="lang">
          <span class="el-dropdown-link">
            {{ $t("message.lang")
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-badge :value="12" class="item">
          <i class="el-icon-message-solid"></i>
        </el-badge>
        <span class="user-name">{{ username.slice(0, 4) }}</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ $t("message.user")
            }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/user" tag="span">{{
                  $t("message.my")
              }}</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="logout">
                {{ $t("message.logout") }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-menu :default-active="currentIndex" text-color="#fff" class="el-menu-vertical-nav" background-color="#545c64"
      active-text-color="#25AEF3" router>
      <el-menu-item index="/product">
        <i class="el-icon-goods"></i>
        <span slot="title">{{ $t("message.product") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-s-opportunity"></i>
        <span slot="title">{{ $t("message.params") }}</span>
      </el-menu-item>
      <el-menu-item index="/content">
        <i class="el-icon-tickets"></i>
        <span slot="title">{{ $t("message.content") }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      currentIndex: "/product",
    };
  },
  mounted() {
    // 解决高亮错位
    this.currentIndex = this.$route.path
  },
  computed: {
    ...mapState("loginModule", ["username"]),
  },
  methods: {
    ...mapMutations("loginModule", ["clearToken", "clearUsername"]),
    logout() {
      this.$confirm("确定退出登录？", "注意", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.clearToken();
        this.clearUsername();
        localStorage.removeItem("ego");
        this.$router.push("/login");
      });
    },

    // 切换语言
    handleCommand(command) {
      this.$i18n.locale = command;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-nav {
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  text-align: left;
}

.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  box-shadow: 0 0 5px 1px #999;

  .login {
    height: 50px;
    float: right;
    margin-right: 20px;

    .lang {
      margin-right: 20px;
    }

    .item {
      height: 25px;
      margin-right: 30px;

      i {
        display: block;
        font-size: 25px;
      }
    }

    .user-name {
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      text-align: center;
      display: inline-block;
      background-color: #999;
      line-height: 40px;
      color: #fff;
      margin-right: 10px;
      font-size: 15px;
      border: 1px solid #fff;
      border-radius: 50%;
    }

    .el-dropdown-link {
      color: #666;
    }
  }
}
</style>>