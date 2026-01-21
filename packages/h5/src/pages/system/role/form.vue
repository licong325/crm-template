<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { showToast, showLoadingToast, closeToast } from 'vant'
import { getRoleDetail, createRole, updateRole, getMenuTree } from '@shared/api'
import type { MenuInfo } from '@shared/types'

const router = useRouter()
const route = useRoute()

const isEdit = computed(() => !!route.params.id)
const pageTitle = computed(() => isEdit.value ? '编辑角色' : '新增角色')

// 表单数据
const formData = reactive({
  name: '',
  code: '',
  description: '',
  sort: 1,
  status: 1 as 0 | 1,
  menuIds: [] as string[]
})

// 权限选择
const showPermPicker = ref(false)
const menuTree = ref<MenuInfo[]>([])
const tempSelectedMenuIds = ref<string[]>([])

// 扁平化菜单树用于展示
interface FlatMenuItem {
  id: string
  name: string
  level: number
  type: string
  hasChildren: boolean
}

const flattenMenuTree = (tree: MenuInfo[], result: FlatMenuItem[] = [], level = 0): FlatMenuItem[] => {
  tree.forEach(item => {
    const hasChildren = !!(item.children && item.children.length > 0)
    result.push({
      id: item.id,
      name: item.name,
      level,
      type: item.type || 'menu',
      hasChildren
    })
    if (hasChildren) {
      flattenMenuTree(item.children!, result, level + 1)
    }
  })
  return result
}

const flatMenuList = computed(() => flattenMenuTree(menuTree.value))

// 加载菜单树
const loadMenuTree = async () => {
  try {
    menuTree.value = await getMenuTree()
  } catch {
    // 获取失败
  }
}

// 获取角色详情（编辑时）
const loadRoleDetail = async () => {
  if (!isEdit.value) return

  showLoadingToast({ message: '加载中...', forbidClick: true })
  try {
    const res = await getRoleDetail(route.params.id as string)
    formData.name = res.name
    formData.code = res.code
    formData.description = res.description
    formData.sort = res.sort
    formData.status = res.status
    formData.menuIds = [...(res.menuIds || [])]
  } catch {
    showToast('获取角色信息失败')
  } finally {
    closeToast()
  }
}

// 打开权限选择
const openPermPicker = () => {
  tempSelectedMenuIds.value = [...formData.menuIds]
  showPermPicker.value = true
}

// 切换选中状态
const toggleMenuItem = (id: string) => {
  const idx = tempSelectedMenuIds.value.indexOf(id)
  if (idx > -1) {
    tempSelectedMenuIds.value.splice(idx, 1)
  } else {
    tempSelectedMenuIds.value.push(id)
  }
}

// 权限选择确认
const onPermConfirm = () => {
  formData.menuIds = [...tempSelectedMenuIds.value]
  showPermPicker.value = false
}

// 权限显示文本
const permDisplayText = computed(() => {
  if (formData.menuIds.length === 0) return ''
  return `已选${formData.menuIds.length}个权限`
})

// 获取图标类型
const getIconType = (type: string) => {
  switch (type) {
    case 'directory':
      return 'folder-o'
    case 'menu':
      return 'apps-o'
    case 'button':
      return 'link-o'
    default:
      return 'apps-o'
  }
}

// 提交
const onSubmit = async () => {
  if (!formData.name) {
    showToast('请输入角色名称')
    return
  }
  if (!formData.code) {
    showToast('请输入角色编码')
    return
  }

  showLoadingToast({ message: '保存中...', forbidClick: true })
  try {
    if (isEdit.value) {
      await updateRole(route.params.id as string, formData)
    } else {
      await createRole(formData)
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
  loadMenuTree()
  loadRoleDetail()
})
</script>

<template>
  <div class="role-form-page">
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
          v-model="formData.name"
          name="name"
          label="角色名称"
          placeholder="请输入角色名称"
          :rules="[{ required: true, message: '请输入角色名称' }]"
        />
        <van-field
          v-model="formData.code"
          name="code"
          label="角色编码"
          placeholder="请输入角色编码"
          :disabled="isEdit"
          :rules="[{ required: true, message: '请输入角色编码' }]"
        />
        <van-field
          v-model="formData.description"
          name="description"
          label="角色描述"
          type="textarea"
          rows="2"
          placeholder="请输入角色描述"
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

      <van-cell-group inset class="form-group">
        <van-field
          :model-value="permDisplayText"
          is-link
          readonly
          name="permissions"
          label="权限配置"
          placeholder="请选择权限"
          @click="openPermPicker"
        />
      </van-cell-group>

      <div class="submit-btn">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>

    <!-- 权限选择器（树形多选） -->
    <van-popup v-model:show="showPermPicker" round position="bottom" class="perm-popup">
      <div class="popup-header">
        <span class="popup-cancel" @click="showPermPicker = false">取消</span>
        <span class="popup-title">选择权限</span>
        <span class="popup-confirm" @click="onPermConfirm">确定</span>
      </div>
      <div class="perm-tree">
        <van-checkbox-group v-model="tempSelectedMenuIds">
          <div
            v-for="item in flatMenuList"
            :key="item.id"
            class="perm-item"
            :style="{ paddingLeft: `${item.level * 20 + 16}px` }"
            @click="toggleMenuItem(item.id)"
          >
            <van-icon :name="getIconType(item.type)" class="perm-icon" />
            <span class="perm-name">{{ item.name }}</span>
            <van-checkbox :name="item.id" @click.stop />
          </div>
        </van-checkbox-group>
      </div>
    </van-popup>
  </div>
</template>

<style scoped>
.role-form-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.form-group {
  margin-top: 12px;
}

.submit-btn {
  padding: 24px 16px;
}

.perm-popup {
  max-height: 70%;
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

.perm-tree {
  max-height: 400px;
  overflow-y: auto;
}

.perm-item {
  display: flex;
  align-items: center;
  padding: 12px 16px 12px 0;
  border-bottom: 1px solid #ebedf0;
  background: #fff;
}

.perm-icon {
  margin-right: 8px;
  color: #1989fa;
}

.perm-name {
  flex: 1;
  font-size: 14px;
  color: #323233;
}
</style>
