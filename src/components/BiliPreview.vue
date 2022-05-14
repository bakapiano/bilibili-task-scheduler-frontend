<template>
  <n-card embedded class="bili-preview-main" style="cursor : pointer;" @click="clickPreview">
    <n-skeleton v-if="loading" text :repeat="1" />
    <template v-else>
      <a>{{ title }}</a>
    </template>
  </n-card>
</template>
<script>

import {getUrlInfo} from "../api/task";

export default {
  name: "BiliPreview",
  props: {
    url: {
      type: String,
      default: "https://www.bilibili.com/video/BV19Z4y1k7P7",
    }
  },
  data() {
    return {
      title: "传说的世界",
      description: "test",
      loading: false,
      fail: false,
    }
  },
  async mounted() {
    setTimeout(()=>this.loading=false, 5000)
    this.loadPreviewData()
  },
  async updated() {
    await this.loadPreviewData()
  },
  methods: {
    clickPreview() {
      if (!this.fail) window.open(this.url)
    },
    async loadPreviewData() {
      this.loading = true
      try {
        const result = await getUrlInfo({url: this.url})
        this.title = result.data.title
        this.fail = false
        console.log(result)
      }
      catch (err) {
        console.log(err)
        this.title = "不支持的链接"
        this.fail = true
      }
      this.loading = false
      this.$emit("completed", this.fail)
    },
  },
}
</script>

<style scoped>
.bili-preview-main {
  max-width: 400px;
}
</style>
