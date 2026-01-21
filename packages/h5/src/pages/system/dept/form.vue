<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { getDeptDetail, createDept, updateDept, getDeptTree } from '@shared/api'
import type { DeptInfo } from '@shared/types'

const router = useRouter()
const route = useRoute()

const isEdit = computed(() => !!route.params.id)
const pageTitle = computed(() => isEdit.value ? '编辑部门' : '新增部门')

// 表单数据
const formData = reactive({
  name: '',
  parentId: '0',
  parentName: '无（顶级部门）',
  leader: '',
  phone: '',
  email: '',
  sort: 1,
  status: 1 as 0 | 1
})

// 上级部门选择
const showParentPicker = ref(false)
const parentOptions = ref<{ text: string; value: string }[]>([])
const deptTree = ref<DeptInfo[]>([])

// 扁平化部门树用于选择器
const flattenDeptTree = (tree: DeptInfo[], result: { text: string; value: string }[] = [], prefix = '') => {
  tree.forEach(item => {
    // 编辑时排除自己及子部门
    if (isEdit.value && item.id === route.params.id) return
    result.push({ text: prefix + item.name, value: item.id })
    if (item.children && item.children.length) {
      flattenDeptTree(item.children, result, prefix + '  ')
    }
  })
  return result
}

// 加载部门树选项
const loadDeptOptions = async () => {
  try {
    deptTree.value = await getDeptTree()
    parentOptions.value = [
      { text: '无（顶级部门）', value: '0' },
      ...flattenDeptTree(deptTree.value)
    ]
  } catch {
    // 获取失败
  }
}

// 获取部门详情（编辑时）
const loadDeptDetail = async () => {
  if (!isEdit.value) return

  showLoadingToast({ message: '加载中...', forbidClick: true })
  try {
    const res = await getDeptDetail(route.params.id as string)
    formData.name = res.name
    formData.parentId = res.parentId
    formData.leader = res.leader || ''
    formData.phone = res.phone || ''
    formData.email = res.email || ''
    formData.sort = res.sort
    formData.status = res.status

    // 设置父级部门名称
    if (res.parentId === '0') {
      formData.parentName = '无（顶级部门）'
    } else {
      const parent = parentOptions.value.find(p => p.value === res.parentId)
      formData.parentName = parent?.text.trim() || ''
    }
  } catch {
    showToast('获取部门信息失败')
  } finally {
    closeToast()
  }
}

// 上级部门选择确认
const onParentConfirm = ({ selectedOptions }: { selectedOptions: { text: string; value: string }[] }) => {
  const selected = selectedOptions[0]
  formData.parentId = selected.value
  formData.parentName = selected.text.trim()
  showParentPicker.value = false
}

// 提交
const onSubmit = async () => {
  if (!formData.name) {
    showToast('请输入部门名称')
    return
  }

  showLoadingToast({ message: '保存中...', forbidClick: true })
  try {
    const data = {
      name: formData.name,
      parentId: formData.parentId,
      leader: formData.leader,
      phone: formData.phone,
      email: formData.email,
      sort: formData.sort,
      status: formData.status
    }

    if (isEdit.value) {
      await updateDept(route.params.id as string, data)
    } else {
      await createDept(data)
    }
    closeToast()
    showToast('保存成功')
    router.back()
  } catch {
    closeToast()
    showToast('保存失败')
  }
}

// 返回
const onClickLeft = () => {
  router.back()
}

onMounted(async () => {
  await loadDeptOptions()
  loadDeptDetail()
})
</script>

<template>
  <div class="dept-form-page">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="pageTitle"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset class="form-group">
        <van-field
          v-model="formData.parentName"
          is-link
          readonly
          name="parent"
          label="上级部门"
          placeholder="请选择上级部门"
          @click="showParentPicker = true"
        />
        <van-field
          v-model="formData.name"
          name="name"
          label="部门名称"
          placeholder="请输入部门名称"
          :rules="[{ required: true, message: '请输入部门名称' }]"
        />
        <van-field
          v-model="formData.leader"
          name="leader"
          label="负责人"
          placeholder="请输入负责人姓名"
        />
        <van-field
          v-model="formData.phone"
          name="phone"
          label="联系电话"
          type="tel"
          placeholder="请输入联系电话"
        />
        <van-field
          v-model="formData.email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱地址"
        />
        <van-field
          v-model.number="formData.sort"
          name="sort"
          label="排序"
          type="digit"
          placeholder="请输入排序号"
        />
        <van-field name="status" label="状态">
          <template #input>
            <van-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
          </template>
        </van-field>
      </van-cell-group>

      <div class="submit-btn">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>

    <!-- 上级部门选择器 -->
    <van-popup v-model:show="showParentPicker" round position="bottom">
      <van-picker
        :columns="parentOptions"
        @cancel="showParentPicker = false"
        @confirm="onParentConfirm"
      />
    </van-popup>
  </div>
</template>

<style scoped>
.dept-form-page {
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
