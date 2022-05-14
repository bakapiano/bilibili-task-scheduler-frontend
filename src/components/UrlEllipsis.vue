<template>
<n-ellipsis style="max-width: 120px">
  <a :href="url" @click.stop.prevent="goTo">{{ url }}</a>
  <template #tooltip>
    <div style="text-align: center;cursor: pointer;" @click="goTo">
      {{ url }}
    </div>
  </template>
</n-ellipsis>
</template>

<script>
export default {
  name: "UrlEllipsis",
  props: {
    url: {
      type: String,
      required: true,
    }
  },
  methods: {
    goTo() {
      window.open(this.url)
    },
  }
}
</script>

<style scoped>

</style>
