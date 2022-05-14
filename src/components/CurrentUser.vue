<template>
  <n-card title="登录信息">
    <div style="display: flex;flex-direction: row;align-items: center;cursor: pointer;" @click="clickUserInfo">
      <!--      <n-avatar-->
      <!--          round-->
      <!--          :size="48"-->
      <!--          :src="avatar"-->
      <!--      />-->
      <n-skeleton v-if="!ready" text :repeat="1" :height="41.5" width="60%"/>
      <template v-else>
        <h2 style="margin: 4px;">{{ username }}</h2>
        <n-tag type="info" size="small" style="cursor: pointer;">UID:{{ uid }}</n-tag>
      </template>
    </div>
    <template #action>
      <n-button type="error" @click="logout">
        退出登录
      </n-button>
    </template>
  </n-card>
</template>

<script>
import {getCurrentLoginUserInfo} from "../api/auth";

export default {
  name: "CurrentUser",
  data() {
    return {
      ready: false,
      avatar: "",
      uid: "",
      username: "",
    }
  },
  async mounted() {
    const result = await getCurrentLoginUserInfo()
    console.log(result)
    const {mid, name, face} = result.data.data
    this.avatar = face
    this.username = name
    this.uid = mid
    this.ready = true
  },
  methods: {
    clickUserInfo() {
      window.open(`https://space.bilibili.com/${123}`)
    },
    logout() {
      window.localStorage.clear()
      window.location = "/#/login"
    }
  }
}
</script>

<style scoped>

</style>
