<template>
  <n-layout content-style="padding: 24px;">
    <n-grid cols="24" item-responsive v-if="ready">
      <n-grid-item
          span="0:24 400:24 1200:4"
          offset="0:0 400:0 1200:4"
          style="padding: 6px"
      >
        <CurrentUser></CurrentUser>
        <TaskInput style="margin-top: 12px" @created="loadTaskData"></TaskInput>
      </n-grid-item>
      <n-grid-item
          span="0:24 400:24 1200:12"
          offset="0:0 400:0 1200:0"
          style="padding: 6px"
      >
        <n-spin :show="data === null">
          <div v-if="data==null" style="height: 60px">
          </div>
          <n-data-table
              v-else
              :data="data"
              :columns="columns"
              :row-props="rowProps"
              @select="handleSelect"
          />
        </n-spin>
      </n-grid-item>
    </n-grid>

    <n-modal
        v-model:show="showModal"
        class="custom-card"
        preset="card"
        title="任务详细"
        :bordered="false"
        style="max-width: 720px;"
    >
      <TaskDetail :task-id="taskId"></TaskDetail>
    </n-modal>

  </n-layout>
</template>

<script>

import BiliPreview from "../components/BiliPreview.vue";
import TaskInput from "../components/TaskInput.vue";
import {getAllTask} from "../api/task";
import CurrentUser from "../components/CurrentUser.vue";
import {h} from "vue";
import {NTime, useMessage} from "naive-ui";
import TaskStatus from "../components/TaskStatus.vue";
import UrlEllipsis from "../components/UrlEllipsis.vue";
import TaskDetail from "../components/TaskDetail.vue";

export default {
  name: "home",
  components: {TaskDetail, CurrentUser, TaskInput, BiliPreview},
  setup() {
    const message = useMessage()
    return {
      columns: [
        {
          title: "id",
          key: "id",
          sortOrder: "descend",
          sorter: 'default',
        },
        //  移动端隐藏 begin
        ...(document.body.clientWidth >= 900 ? ([
          {
            title: "开始时间",
            key: "start_time",
            render(row) {
              return h(NTime, {time: new Date(row.start_time)})
            }
          },
          {
            title: "结束时间",
            key: "end_time",
            render(row) {
              return h(NTime, {time: new Date(row.end_time)})
            }
          },
          {
            title: "间隔秒数",
            key: "interval",
          },
        ]) : []),
        // 移动端隐藏 end
        {
          title: "目标链接",
          key: "url",
          render(row) {
            return h(UrlEllipsis, {url: row.url})
          },
        },
        {
          title: "成功/尝试",
          render(row) {
            return `${row.success_count}/${row.total_count}`
          }
        },
        {
          title: "任务状态",
          key: "status",
          render(row) {
            return h(TaskStatus, {status: String(row.status)})
          }
        },
      ]
    }
  },
  data() {
    return {
      ready: false,
      data: null,
      taskId: 0,
      showModal: false,
      loadTaskInterval: null,
      rowProps: (row) => {
        return {
          style: 'cursor: pointer;',
          onClick: () => {
            console.log(row)
            // message.info(row.id)
            this.showTaskDetail(row.id)
          }
        }
      },
    }
  },
  async mounted() {
    this.loadTaskInterval = setInterval(()=>{
      if (this.data != null) {
        this.loadTaskData()
      }
    }, 1000*60)
    if (!window.localStorage.getItem("token")) {
      window.location = "/#/login"
    }
    await this.loadTaskData()
    this.ready = true
  },
  async unmounted() {
    if (this.loadTaskInterval) {
      clearInterval(this.loadTaskInterval)
    }
  },
  methods: {
    async handleSelect(e) {
      console.log(e)
    },
    async loadTaskData() {
      this.data = null
      const result = await getAllTask()
      this.data = result.data
      console.log(result.data)
    },
    showTaskDetail(task_id) {
      console.log(task_id)
      this.taskId = task_id
      this.$nextTick(()=>{
        this.showModal = true
      })
    },
  },
}
</script>

<style scoped>
.main, .n-layout {
  height: 100%;
  width: 100%;
}

.card {
  width: 100%;
}
</style>
