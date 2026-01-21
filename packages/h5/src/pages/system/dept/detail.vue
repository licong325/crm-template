<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getDeptDetail as fetchDeptDetail, getDeptTree } from '@shared/api'
import type { DeptInfo } from '@shared/types'

const router = useRouter()
const route = useRoute()

const deptId = route.params.id as string
const loading = ref(true)
const deptInfo = ref<DeptInfo | null>(null)
const parentName = ref('')

// 递归查找部门名称
const findDeptName = (tree: DeptInfo[], id: string): string => {
  for (const dept of tree) {
    if (dept.id === id) return dept.name
    if (dept.children) {
      const found = findDeptName(dept.children, id)
      if (found) return found
    }
  }
  return ''
}

// 加载父部门名称
const loadParentName = async (parentId: string) => {
  if (parentId === '0') {
    parentName.value = '无（顶级部门）'
    return
  }
  try {
    const tree = await getDeptTree()
    parentName.value = findDeptName(tree, parentId) || '未知'
  } catch {
    parentName.value = '未知'
  }
}

// 获取部门详情
const loadDeptDetail = async () => {
  loading.value = true
  try {
    deptInfo.value = await fetchDeptDetail(deptId)
    await loadParentName(deptInfo.value.parentId)
  } catch {
    // 获取失败
  } finally {
    loading.value = false
  }
}

// 编辑
const handleEdit = () => {
  router.push(`/system/dept/edit/${deptId}`)
}

// 拨打电话
const handleCall = () => {
  if (deptInfo.value?.phone) {
    window.location.href = `tel:${deptInfo.value.phone}`
  }
}

// 返回
const onClickLeft = () => {
  router.back()
}

onMounted(() => {
  loadDeptDetail()
})
</script>

<template>
  <div class="dept-detail-page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="部门详情"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="edit" size="18" @click="handleEdit" />
      </template>
    </van-nav-bar>

    <van-loading v-if="loading" class="loading" />

    <template v-else-if="deptInfo">
      <!-- 部门头部 -->
      <div class="dept-header">
        <div class="dept-icon">
          <van-icon name="cluster-o" size="40" color="#fff" />
        </div>
        <h3 class="dept-name">{{ deptInfo.name }}</h3>
        <van-tag :type="deptInfo.status === 1 ? 'success' : 'danger'" size="large">
          {{ deptInfo.status === 1 ? '启用' : '禁用' }}
        </van-tag>
      </div>

      <!-- 详细信息 -->
      <van-cell-group inset title="基本信息" class="info-group">
        <van-cell title="上级部门" :value="parentName" />
        <van-cell title="负责人" :value="deptInfo.leader || '-'" />
        <van-cell title="联系电话" :value="deptInfo.phone || '-'">
          <template #right-icon>
            <van-icon
              v-if="deptInfo.phone"
              name="phone-o"
              class="phone-icon"
              @click="handleCall"
            />
          </template>
        </van-cell>
        <van-cell title="邮箱" :value="deptInfo.email || '-'" />
        <van-cell title="排序" :value="String(deptInfo.sort)" />
      </van-cell-group>

      <!-- 部门成员 -->
      <van-cell-group inset title="部门成员" class="info-group">
        <van-cell
          title="查看部门成员"
          is-link
          @click="router.push(`/system/user?deptId=${deptId}`)"
        />
      </van-cell-group>
    </template>
  </div>
</template>

<style scoped>
.dept-detail-page {
  min-height: 100vh;
  background-color: #f7f8fa;
  padding-bottom: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.dept-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dept-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.dept-name {
  margin: 12px 0 8px;
  font-size: 20px;
  color: #fff;
}

.info-group {
  margin-top: 12px;
}

.phone-icon {
  color: #1989fa;
  font-size: 18px;
}
</style>
