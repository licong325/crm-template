<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { getRoleList, deleteRole } from '@shared/api'
import type { RoleInfo } from '@shared/types'

const router = useRouter()

// 搜索
const searchValue = ref('')

// 列表数据
const list = ref<RoleInfo[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// 获取列表
const onLoad = async () => {
  try {
    if (refreshing.value) {
      list.value = []
      refreshing.value = false
    }

    const res = await getRoleList({ keyword: searchValue.value })
    list.value = res.list
    loading.value = false
    finished.value = true
  } catch {
    loading.value = false
    finished.value = true
  }
}

// 下拉刷新
const onRefresh = () => {
  finished.value = false
  loading.value = true
  onLoad()
}

// 搜索
const onSearch = () => {
  refreshing.value = true
  onRefresh()
}

// 查看详情
const handleDetail = (item: RoleInfo) => {
  router.push(`/system/role/detail/${item.id}`)
}

// 编辑
const handleEdit = (item: RoleInfo) => {
  router.push(`/system/role/edit/${item.id}`)
}

// 删除
const handleDelete = async (item: RoleInfo) => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: `确定删除角色「${item.name}」吗？`
    })
    await deleteRole(item.id)
    showToast('删除成功')
    refreshing.value = true
    onRefresh()
  } catch {
    // 取消
  }
}

// 新增
const handleAdd = () => {
  router.push('/system/role/add')
}

// 返回
const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <div class="role-page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="角色管理"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="plus" size="18" @click="handleAdd" />
      </template>
    </van-nav-bar>

    <!-- 搜索 -->
    <van-search
      v-model="searchValue"
      placeholder="搜索角色名称/编码"
      @search="onSearch"
    />

    <!-- 列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-swipe-cell v-for="item in list" :key="item.id">
          <van-cell @click="handleDetail(item)">
            <template #title>
              <div class="role-title">
                <span class="role-name">{{ item.name }}</span>
                <van-tag type="primary" size="small">{{ item.code }}</van-tag>
              </div>
            </template>
            <template #label>
              <div class="role-desc">{{ item.description }}</div>
            </template>
            <template #value>
              <van-tag :type="item.status === 1 ? 'success' : 'danger'" size="medium">
                {{ item.status === 1 ? '启用' : '禁用' }}
              </van-tag>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="primary" text="编辑" @click="handleEdit(item)" />
            <van-button square type="danger" text="删除" @click="handleDelete(item)" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.role-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.role-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.role-name {
  font-size: 16px;
  font-weight: 500;
}

.role-desc {
  color: #999;
  font-size: 12px;
  margin-top: 4px;
}

.van-swipe-cell {
  margin-bottom: 1px;
}
</style>
