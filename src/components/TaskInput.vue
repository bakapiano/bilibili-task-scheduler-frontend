<template>
  <n-card class="card" title="创建新任务">
    <n-form ref="formRef" :rules="rules" :model="model">
      <n-form-item label="开始时间" required path="start_time">
        <n-date-picker
            type="datetime"
            clearable
            input-readonly
            placement="bottom"
            style="max-width: 400px;width: 100%;"
            v-model:value="model.start_time"
            placeholder="任务开始的时间"
        />
      </n-form-item>
      <n-form-item label="结束时间" required path="end_time">
        <n-date-picker
            type="datetime"
            clearable
            input-readonly
            placement="bottom"
            style="max-width: 400px;width: 100%;"
            v-model:value="model.end_time"
            placeholder="任务结束的时间"
        />
      </n-form-item>
      <n-form-item label="间隔时间" required path="interval">
        <n-input-number
            size="medium"
            style="max-width: 400px;width: 100%;"
            :validator="(x)=>x>=10"
            v-model:value="model.interval"
            placeholder="两次任务之的间隔秒数"
        >
          <template #suffix>
            秒
          </template>
        </n-input-number>
      </n-form-item>
      <n-form-item label="发送内容" required path="bullets">
        <n-input
            style="max-width: 400px"
            type="textarea"
            placeholder="使用回车分割"
            :autosize="{minRows: 1}"
            v-model:value="model.bullets"
        />
      </n-form-item>
      <n-form-item label="目标链接" required path="url">
        <n-row :gutter="24">
          <n-col :span="24">
            <n-input
                style="max-width: 400px"
                type="text"
                placeholder="视频/动态/直播间 链接"
                :loading="loadingUrlInfo"
                :disabled="loadingUrlInfo"
                @change="urlInputChange"
                v-model:value="model.url"
            />
          </n-col>
          <n-col :span="24">
            <bili-preview @completed="(value)=>{
              this.urlFail=value
              this.loadingUrlInfo=false
            }"
                          :url="previewUrl"></bili-preview>
          </n-col>
        </n-row>
      </n-form-item>
      <n-form-item style="height: 64px">
        <n-button type="success" @click="createTask" :loading="buttonLoading">
          创建任务
        </n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script>
import BiliPreview from "./BiliPreview.vue";
import {ref} from "vue";
import {createTask} from "../api/task";
import {useMessage} from "naive-ui";

export default {
  emits: ["created",],
  name: "TaskInput",
  components: {BiliPreview},
  setup() {
    const message = useMessage()
    return {
      message,
      formRef: null,
      model: ref({
        start_time: null,
        end_time: null,
        url: "",
        bullets: "",
        interval: null,
      }),
    }
  },
  data() {
    return {
      buttonLoading: false,
      previewUrl: "",
      loadingUrlInfo: false,
      urlFail: true,
      rules: {
        start_time: [
          {
            required: true,
            message: "请输入起始时间",
          },
          {
            validator: this.validateDate,
            message: "终止时间需晚于起始时间"
          },
          {
            validator: () => this.model.end_time - this.model.start_time <= 60 * 60 * 12 * 1000,
            message: "持续时间需小于12个小时"
          },
        ],
        end_time: [
          {
            required: true,
            message: "请输入终止时间"
          },
          {
            validator: this.validateDate,
            message: "终止时间需晚于起始时间"
          },
          {
            validator: () => this.model.end_time - this.model.start_time <= 60 * 60 * 12 * 1000,
            message: "持续时间需小于12个小时"
          },
        ],
        interval: {
          required: true,
          message: "请输入间隔秒数"
        },
        bullets: {
          required: true,
          message: "请输入发送内容"
        },
        url: [
          {
            required: true,
            message: "请输入链接",
          },
          {
            validator: () => !this.urlFail,
            message: "不支持的链接",
          }
        ]
      },
    }
  },
  methods: {
    urlInputChange(e) {
      const pos = e.indexOf("?")
      if (pos != -1) {
        e = e.substring(0, pos)
      }
      this.loadingUrlInfo = true
      this.previewUrl = e
      this.url = e
      console.log(this.previewUrl)
    },
    createTask(e) {
      e.preventDefault()
      console.log(this.model)
      this.formRef.validate(async (errors) => {
        if (!errors) {
          try {
            this.buttonLoading = true
            const result = await createTask(this.model)
            console.log(result)
            this.message.success("任务创建成功")
            this.$emit("created")
          } catch (err) {
            console.log(err)
            const msg = err.response.data.detail
            if (msg) {
              this.message.error(msg)
            }
          }
          this.buttonLoading = false
        } else {
          console.log(errors);
        }
      })
    },
    validateDate() {
      return this.model.end_time >= this.model.start_time
    },
  }
}
</script>

<style scoped>

</style>
