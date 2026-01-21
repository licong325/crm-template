<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { getUserDetail, createUser, updateUser, getRoleList, getDeptTree } from '@shared/api'
import type { RoleInfo, DeptInfo } from '@shared/types'

const router = useRouter()
const route = useRoute()

const isEdit = computed(() => !!route.params.id)
const pageTitle = computed(() => isEdit.value ? '编辑用户' : '新增用户')

// 表单数据
const formData = reactive({
  username: '',
  nickname: '',
  phone: '',
  email: '',
  gender: 1 as 0 | 1 | 2,
  deptId: '',
  deptName: '',
  roleIds: [] as string[],
  roleNames: [] as string[],
  status: 1 as 0 | 1
})

// 部门选择
const showDeptPicker = ref(false)
const deptOptions = ref<{ text: string; value: string }[]>([])
const deptTree = ref<DeptInfo[]>([])

// 角色选择
const showRolePicker = ref(false)
const roleOptions = ref<{ text: string; value: string }[]>([])
const roleList = ref<RoleInfo[]>([])

// 扁平化部门树用于选择器
const flattenDeptTree = (tree: DeptInfo[], result: { text: string; value: string }[] = [], prefix = '') => {
  tree.forEach(item => {
    result.push({ text: prefix + item.name, value: item.id })
    if (item.children && item.children.length) {
      flattenDeptTree(item.children, result, prefix + '  ')
    }
  })
  return result
}

// 加载选项数据
const loadOptions = async () => {
  try {
    const [roleRes, deptRes] = await Promise.all([getRoleList(), getDeptTree()])
    roleList.value = roleRes.list
    roleOptions.value = roleRes.list.map(r => ({ text: r.name, value: r.id }))
    deptTree.value = deptRes
    deptOptions.value = flattenDeptTree(deptRes)
  } catch {
    // 获取失败
  }
}

// 获取用户详情（编辑时）
const loadUserDetail = async () => {
  if (!isEdit.value) return

  showLoadingToast({ message: '加载中...', forbidClick: true })
  try {
    const res = await getUserDetail(route.params.id as string)
    formData.username = res.username
    formData.nickname = res.nickname
    formData.phone = res.phone
    formData.email = res.email
    formData.gender = res.gender
    formData.deptId = res.deptId
    formData.deptName = res.deptName
    formData.roleIds = [...res.roleIds]
    formData.roleNames = [...res.roleNames]
    formData.status = res.status
  } catch {
    showToast('获取用户信息失败')
  } finally {
    closeToast()
  }
}

// 部门选择确认
const onDeptConfirm = ({ selectedOptions }: { selectedOptions: { text: string; value: string }[] }) => {
  const selected = selectedOptions[0]
  formData.deptId = selected.value
  formData.deptName = selected.text.trim()
  showDeptPicker.value = false
}

// 角色显示文本
const roleDisplayText = computed(() => {
  if (formData.roleNames.length === 0) return ''
  return formData.roleNames.join('、')
})

// 角色选择确认（使用 checkbox 选择）
const tempSelectedRoleIds = ref<string[]>([])
const openRolePicker = () => {
  tempSelectedRoleIds.value = [...formData.roleIds]
  showRolePicker.value = true
}
const onRoleConfirm = () => {
  formData.roleIds = [...tempSelectedRoleIds.value]
  formData.roleNames = roleList.value
    .filter(r => tempSelectedRoleIds.value.includes(r.id))
    .map(r => r.name)
  showRolePicker.value = false
}

// 提交
const onSubmit = async () => {
  if (!formData.username) {
    showToast('请输入用户名')
    return
  }
  if (!formData.nickname) {
    showToast('请输入昵称')
    return
  }
  if (!formData.phone) {
    showToast('请输入手机号')
    return
  }
  if (!formData.deptId) {
    showToast('请选择部门')
    return
  }
  if (formData.roleIds.length === 0) {
    showToast('请选择角色')
    return
  }

  showLoadingToast({ message: '保存中...', forbidClick: true })
  try {
    if (isEdit.value) {
      await updateUser(route.params.id as string, formData)
    } else {
      await createUser(formData)
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

onMounted(() => {
  loadOptions()
  loadUserDetail()
})
</script>

<template>
  <div class="user-form-page">
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
          v-model="formData.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :disabled="isEdit"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="formData.nickname"
          name="nickname"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '请输入昵称' }]"
        />
        <van-field
          v-model="formData.phone"
          name="phone"
          label="手机号"
          type="tel"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="formData.email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
        />
        <van-field name="gender" label="性别">
          <template #input>
            <van-radio-group v-model="formData.gender" direction="horizontal">
              <van-radio :name="1">男</van-radio>
              <van-radio :name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>

      <van-cell-group inset class="form-group">
        <van-field
          v-model="formData.deptName"
          is-link
          readonly
          name="dept"
          label="所属部门"
          placeholder="请选择部门"
          @click="showDeptPicker = true"
        />
        <van-field
          :model-value="roleDisplayText"
          is-link
          readonly
          name="roles"
          label="角色"
          placeholder="请选择角色"
          @click="openRolePicker"
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

    <!-- 部门选择器 -->
    <van-popup v-model:show="showDeptPicker" round position="bottom">
      <van-picker
        :columns="deptOptions"
        @cancel="showDeptPicker = false"
        @confirm="onDeptConfirm"
      />
    </van-popup>

    <!-- 角色选择器（多选） -->
    <van-popup v-model:show="showRolePicker" round position="bottom" class="role-popup">
      <div class="popup-header">
        <span class="popup-cancel" @click="showRolePicker = false">取消</span>
        <span class="popup-title">选择角色</span>
        <span class="popup-confirm" @click="onRoleConfirm">确定</span>
      </div>
      <van-checkbox-group v-model="tempSelectedRoleIds" class="role-checkbox-group">
        <van-cell-group>
          <van-cell
            v-for="role in roleList"
            :key="role.id"
            :title="role.name"
            clickable
            @click="() => {
              const idx = tempSelectedRoleIds.indexOf(role.id)
              if (idx > -1) {
                tempSelectedRoleIds.splice(idx, 1)
              } else {
                tempSelectedRoleIds.push(role.id)
              }
            }"
          >
            <template #right-icon>
              <van-checkbox :name="role.id" @click.stop />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
  </div>
</template>

<style scoped>
.user-form-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.form-group {
  margin-top: 12px;
}

.submit-btn {
  padding: 24px 16px;
}

.role-popup {
  max-height: 60%;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ebedf0;
}

.popup-title {
  font-size: 16px;
  font-weight: 500;
}

.popup-cancel {
  color: #969799;
  font-size: 14px;
}

.popup-confirm {
  color: #1989fa;
  font-size: 14px;
}

.role-checkbox-group {
  max-height: 300px;
  overflow-y: auto;
}
</style>
