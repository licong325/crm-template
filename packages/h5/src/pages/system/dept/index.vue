<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { getDeptTree, deleteDept } from '@shared/api'
import type { DeptInfo } from '@shared/types'

const router = useRouter()

// 列表数据
const list = ref<DeptInfo[]>([])
const loading = ref(false)
const refreshing = ref(false)

// 展开的节点
const expandedKeys = ref<string[]>(['1', '2'])

// 扁平化树结构用于展示
interface FlatDeptItem extends DeptInfo {
  level: number
  hasChildren: boolean
}

const flatList = computed(() => {
  const result: FlatDeptItem[] = []

  const flatten = (items: DeptInfo[], level: number) => {
    items.forEach(item => {
      const hasChildren = !!(item.children && item.children.length > 0)
      result.push({ ...item, level, hasChildren })

      if (hasChildren && expandedKeys.value.includes(item.id)) {
        flatten(item.children!, level + 1)
      }
    })
  }

  flatten(list.value, 0)
  return result
})

// 获取列表
const getDeptList = async () => {
  loading.value = true
  try {
    list.value = await getDeptTree()
  } catch {
    // 获取失败
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

// 下拉刷新
const onRefresh = () => {
  getDeptList()
}

// 切换展开/折叠
const toggleExpand = (id: string, e: Event) => {
  e.stopPropagation()
  const index = expandedKeys.value.indexOf(id)
  if (index > -1) {
    expandedKeys.value.splice(index, 1)
  } else {
    expandedKeys.value.push(id)
  }
}

// 是否展开
const isExpanded = (id: string) => expandedKeys.value.includes(id)

// 查看详情
const handleDetail = (item: DeptInfo) => {
  router.push(`/system/dept/detail/${item.id}`)
}

// 编辑
const handleEdit = (item: DeptInfo) => {
  router.push(`/system/dept/edit/${item.id}`)
}

// 删除
const handleDelete = async (item: DeptInfo) => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: `确定删除部门「${item.name}」吗？`
    })
    await deleteDept(item.id)
    showToast('删除成功')
    getDeptList()
  } catch {
    // 取消
  }
}

// 新增
const handleAdd = () => {
  router.push('/system/dept/add')
}

// 返回
const onClickLeft = () => {
  router.back()
}

onMounted(() => {
  getDeptList()
})
</script>

<template>
  <div class="dept-page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="部门管理"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="plus" size="18" @click="handleAdd" />
      </template>
    </van-nav-bar>

    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-loading v-if="loading" class="loading" />

      <template v-else>
        <div class="dept-tree">
          <van-swipe-cell v-for="dept in flatList" :key="dept.id">
            <div
              class="dept-item"
              :style="{ paddingLeft: `${dept.level * 20 + 16}px` }"
              @click="handleDetail(dept)"
            >
              <div
                class="dept-expand"
                @click="dept.hasChildren ? toggleExpand(dept.id, $event) : null"
              >
                <van-icon
                  v-if="dept.hasChildren"
                  :name="isExpanded(dept.id) ? 'arrow-down' : 'arrow'"
                />
                <span v-else class="expand-placeholder" />
              </div>
              <div class="dept-content">
                <div class="dept-name">{{ dept.name }}</div>
                <div class="dept-info">
                  <span class="leader">{{ dept.leader }}</span>
                  <van-tag :type="dept.status === 1 ? 'success' : 'danger'" size="small">
                    {{ dept.status === 1 ? '启用' : '禁用' }}
                  </van-tag>
                </div>
              </div>
              <van-icon name="arrow" class="dept-arrow" />
            </div>
            <template #right>
              <van-button square type="primary" text="编辑" @click="handleEdit(dept)" />
              <van-button square type="danger" text="删除" @click="handleDelete(dept)" />
            </template>
          </van-swipe-cell>
        </div>
      </template>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.dept-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}

.dept-tree {
  background: #fff;
}

.dept-item {
  display: flex;
  align-items: center;
  padding: 12px 16px 12px 0;
  background: #fff;
  border-bottom: 1px solid #ebedf0;
}

.dept-expand {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.expand-placeholder {
  width: 24px;
}

.dept-content {
  flex: 1;
  min-width: 0;
}

.dept-name {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  margin-bottom: 4px;
}

.dept-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.leader {
  font-size: 12px;
  color: #969799;
}

.dept-arrow {
  color: #969799;
  margin-left: 8px;
}
</style>
