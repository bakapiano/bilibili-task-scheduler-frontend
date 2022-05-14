<template>
  <n-skeleton v-if="!url" :width="318" :height="318" :sharp="false"/>
  <n-image v-else :src="url" width="512"></n-image>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: "QRCode",
  props: {
    link: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      url: '',
    }
  },
  updated() {
    console.log(this.link, this.link.length)
    if (this.link && this.link.length) {
      this.genQRCode()
    }
  },
  methods: {
    genQRCode() {
      if (!this.link) return
      const options = {
        errorCorrectionLevel: "L",//容错级别
        type: "image/png",//生成的二维码类型
        quality: 0.3,//二维码质量
        margin: 2,//二维码留白边距
        width: 512,//宽
        height: 512,//高
        color: {
          // dark: "#666666",//前景色
          // light: "#fff"//背景色
        }
      }
      QRCode.toDataURL(this.link, options, (err, url) => {
        if (err) throw err
        this.url = url
      })
    }
  },
}
</script>

<style scoped>
</style>
