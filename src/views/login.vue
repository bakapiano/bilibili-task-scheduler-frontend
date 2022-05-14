<template>
  <n-layout embedded content-style="padding: 24px;">
    <n-space justify="center" align="center" class="login-main">
      <n-card title="使用b站手机客户端扫码登录" class="login-card">
        <template #cover>
          <QRCode :link="url"/>
        </template>
        <template #action>
          <n-button type="primary" @click="loadLoginData">刷新二维码</n-button>
        </template>
      </n-card>
    </n-space>
  </n-layout>
</template>

<script>
import QRCode from "../components/QRCode.vue";
import {authLoginToken, getLoginQRCodeInfo} from "../api/auth";
import router from "../router";

export default {
  name: "login",
  components: {QRCode},
  setup() {
  },
  data() {
    return {
      listener: null,
      oauthKey: "",
      url: "",
    }
  },
  async mounted() {
    if (window.localStorage.getItem("token")) {
      window.location = "/#/"
    }
    await this.loadLoginData()
  },
  async unmounted() {
    if (this.listener) clearInterval(this.listener)
  },
  methods: {
    async loadLoginData() {
      this.url = ""
      const result = await getLoginQRCodeInfo()
      console.log(result)
      const {url, oauthKey} = result.data.data
      this.url = url
      this.oauthKey = oauthKey
      console.log(url, oauthKey)

      if (this.listener) clearInterval(this.listener)
      this.listener = setInterval(async () => {
        console.log(this.oauthKey)
        try {
          const result = await authLoginToken({oauth_key: this.oauthKey})
          // 登陆成功
          if (this.listener) clearInterval(this.listener)
          const token = result.data.access_token
          window.localStorage.setItem("token", token)
          // router.replace({ path: '/' })
          window.location = "/#/"
        }
        catch (err) {
          console.log(err)
        }
      }, 5000)
    },
  },
}
</script>

<style scoped>

.login-main, .n-layout {
  height: 100%;
  width: 100%;
}

.login-card {
  max-width: 320px;
}
</style>
