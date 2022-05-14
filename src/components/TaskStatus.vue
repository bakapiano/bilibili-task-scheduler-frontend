<template>
  <n-tag :type="calc(this.status)">
    {{ this.status }}
  </n-tag>
</template>

<script>
export default {
  name: "TaskStatus",
  props: {
    status: {
      type: String,
    }
  },
  methods: {
    calc(status) {
      return {
        '等待中': '',
        '执行中': 'info',
        '已完成': "success",
        '已取消': 'error',
      }[status]
    }
  },
}
</script>

<style scoped>

</style>
