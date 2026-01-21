<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'

const router = useRouter()
const route = useRoute()

const isEdit = computed(() => !!route.params.id)
const pageTitle = computed(() => isEdit.value ? '编辑客户' : '新建客户')

// 表单数据
const formData = reactive({
  name: '',
  phone: '',
  email: '',
  company: '',
  position: '',
  industry: '',
  industryName: '',
  source: '',
  sourceName: '',
  level: '',
  levelName: '',
  address: '',
  remark: ''
})

// 行业选择
const showIndustryPicker = ref(false)
const industryOptions = [
  { text: '互联网/IT', value: 'it' },
  { text: '金融', value: 'finance' },
  { text: '教育', value: 'education' },
  { text: '医疗', value: 'medical' },
  { text: '制造业', value: 'manufacture' },
  { text: '零售', value: 'retail' },
  { text: '其他', value: 'other' }
]

// 来源选择
const showSourcePicker = ref(false)
const sourceOptions = [
  { text: '网络推广', value: 'web' },
  { text: '客户介绍', value: 'referral' },
  { text: '电话营销', value: 'telemarketing' },
  { text: '展会', value: 'exhibition' },
  { text: '其他', value: 'other' }
]

// 级别选择
const showLevelPicker = ref(false)
const levelOptions = [
  { text: 'A级 - 重要客户', value: 'A' },
  { text: 'B级 - 普通客户', value: 'B' },
  { text: 'C级 - 一般客户', value: 'C' },
  { text: 'D级 - 潜在客户', value: 'D' }
]

// 获取客户详情（编辑时）
const getCustomerDetail = () => {
  if (!isEdit.value) return

  showLoadingToast({ message: '加载中...', forbidClick: true })
  setTimeout(() => {
    formData.name = '张三'
    formData.phone = '13800138000'
    formData.email = 'zhangsan@example.com'
    formData.company = '示例科技有限公司'
    formData.position = '技术总监'
    formData.industry = 'it'
    formData.industryName = '互联网/IT'
    formData.source = 'web'
    formData.sourceName = '网络推广'
    formData.level = 'A'
    formData.levelName = 'A级 - 重要客户'
    formData.address = '北京市朝阳区xxx街道'
    formData.remark = '重要客户，需要重点跟进'
    closeToast()
  }, 300)
}

// 行业选择确认
const onIndustryConfirm = ({ selectedOptions }: { selectedOptions: { text: string; value: string }[] }) => {
  const selected = selectedOptions[0]
  formData.industry = selected.value
  formData.industryName = selected.text
  showIndustryPicker.value = false
}

// 来源选择确认
const onSourceConfirm = ({ selectedOptions }: { selectedOptions: { text: string; value: string }[] }) => {
  const selected = selectedOptions[0]
  formData.source = selected.value
  formData.sourceName = selected.text
  showSourcePicker.value = false
}

// 级别选择确认
const onLevelConfirm = ({ selectedOptions }: { selectedOptions: { text: string; value: string }[] }) => {
  const selected = selectedOptions[0]
  formData.level = selected.value
  formData.levelName = selected.text
  showLevelPicker.value = false
}

// 提交
const onSubmit = () => {
  if (!formData.name) {
    showToast('请输入客户名称')
    return
  }
  if (!formData.phone) {
    showToast('请输入联系电话')
    return
  }

  showLoadingToast({ message: '保存中...', forbidClick: true })
  setTimeout(() => {
    closeToast()
    showToast('保存成功')
    router.back()
  }, 500)
}

// 返回
const onClickLeft = () => {
  router.back()
}

onMounted(() => {
  getCustomerDetail()
})
</script>

<template>
  <div class="customer-form-page">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="pageTitle"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset title="基本信息" class="form-group">
        <van-field
          v-model="formData.name"
          name="name"
          label="客户名称"
          placeholder="请输入客户名称"
          :rules="[{ required: true, message: '请输入客户名称' }]"
        />
        <van-field
          v-model="formData.phone"
          name="phone"
          label="联系电话"
          type="tel"
          placeholder="请输入联系电话"
          :rules="[{ required: true, message: '请输入联系电话' }]"
        />
        <van-field
          v-model="formData.email"
          name="email"
          label="电子邮箱"
          placeholder="请输入电子邮箱"
        />
        <van-field
          v-model="formData.company"
          name="company"
          label="公司名称"
          placeholder="请输入公司名称"
        />
        <van-field
          v-model="formData.position"
          name="position"
          label="职位"
          placeholder="请输入职位"
        />
      </van-cell-group>

      <van-cell-group inset title="客户分类" class="form-group">
        <van-field
          v-model="formData.industryName"
          is-link
          readonly
          name="industry"
          label="所属行业"
          placeholder="请选择行业"
          @click="showIndustryPicker = true"
        />
        <van-field
          v-model="formData.sourceName"
          is-link
          readonly
          name="source"
          label="客户来源"
          placeholder="请选择来源"
          @click="showSourcePicker = true"
        />
        <van-field
          v-model="formData.levelName"
          is-link
          readonly
          name="level"
          label="客户级别"
          placeholder="请选择级别"
          @click="showLevelPicker = true"
        />
      </van-cell-group>

      <van-cell-group inset title="其他信息" class="form-group">
        <van-field
          v-model="formData.address"
          name="address"
          label="地址"
          placeholder="请输入地址"
        />
        <van-field
          v-model="formData.remark"
          name="remark"
          label="备注"
          type="textarea"
          rows="3"
          placeholder="请输入备注信息"
        />
      </van-cell-group>

      <div class="submit-btn">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>

    <!-- 行业选择器 -->
    <van-popup v-model:show="showIndustryPicker" round position="bottom">
      <van-picker
        :columns="industryOptions"
        @cancel="showIndustryPicker = false"
        @confirm="onIndustryConfirm"
      />
    </van-popup>

    <!-- 来源选择器 -->
    <van-popup v-model:show="showSourcePicker" round position="bottom">
      <van-picker
        :columns="sourceOptions"
        @cancel="showSourcePicker = false"
        @confirm="onSourceConfirm"
      />
    </van-popup>

    <!-- 级别选择器 -->
    <van-popup v-model:show="showLevelPicker" round position="bottom">
      <van-picker
        :columns="levelOptions"
        @cancel="showLevelPicker = false"
        @confirm="onLevelConfirm"
      />
    </van-popup>
  </div>
</template>

<style scoped>
.customer-form-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.form-group {
  margin-top: 12px;
}

.submit-btn {
  padding: 24px 16px;
}
</style>
