<template>
  <div>
    <template v-if="fail">
      加载失败
    </template>
    <template v-else-if="loading">
      <template v-for="i in 10">
        <div style="margin: 12px;">
          <n-skeleton text :repeat="1" style="width: 60%;height: 18px"></n-skeleton>
          <n-skeleton text :repeat="1" style="width: 80%;height: 18px"></n-skeleton>
        </div>
      </template>
    </template>
    <template v-else>
      <n-list v-if="data">
        <n-list-item>
          <n-thing title="任务 ID">
            {{ data.id }}
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="起始时间">
            <n-time :time="new Date(data.start_time)"></n-time>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="结束时间">
            <n-time :time="new Date(data.end_time)"></n-time>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="间隔秒数">
            {{ data.interval }}
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="目标链接">
<!--            <url-ellipsis :url="data.url"></url-ellipsis>-->
            <a :href="data.url" target="_blank">{{ data.url }}</a>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="发送内容">
            <n-input type="textarea" :value="data.bullets" disabled>
            </n-input>
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="成功/尝试">
            {{ data.success_count }} / {{ data.total_count }}
          </n-thing>
        </n-list-item>
        <n-list-item>
          <n-thing title="任务状态">
            <TaskStatus :status="data.status"></TaskStatus>
          </n-thing>
        </n-list-item>
      </n-list>
    </template>
  </div>
</template>
<script>
import {getTaskDetail} from "../api/task";
import UrlEllipsis from "./UrlEllipsis.vue";
import TaskStatus from "./TaskStatus.vue";

export default {
  name: "TaskDetail",
  components: {TaskStatus, UrlEllipsis},
  props: {
    taskId: {
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      fail: false,
      data: null,
    }
  },
  async mounted() {
    await this.loadTaskDetail()
  },
  methods: {
    async loadTaskDetail() {
      console.log("update")
      this.data = null
      this.fail = false
      this.loading = true
      try {
        const result = await getTaskDetail({task_id: this.taskId})
        this.data = result.data
        console.log(result)
      } catch (err) {
        console.log(err)
        this.fail = true
      }
      this.loading = false
    },
  }
}
</script>

<style scoped>

</style>
