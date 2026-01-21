<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import { getUserList, deleteUser } from '@shared/api'
import type { UserInfo } from '@shared/types'

const router = useRouter()

// 搜索
const searchValue = ref('')

// 分页
const page = ref(1)
const pageSize = ref(20)

// 列表数据
const list = ref<UserInfo[]>([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

// 获取列表
const onLoad = async () => {
  try {
    if (refreshing.value) {
      list.value = []
      page.value = 1
      refreshing.value = false
    }

    const res = await getUserList({
      page: page.value,
      pageSize: pageSize.value,
      keyword: searchValue.value
    })

    list.value.push(...res.list)
    loading.value = false

    if (list.value.length >= res.total) {
      finished.value = true
    } else {
      page.value++
    }
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
const handleDetail = (item: UserInfo) => {
  router.push(`/system/user/detail/${item.id}`)
}

// 编辑
const handleEdit = (item: UserInfo) => {
  router.push(`/system/user/edit/${item.id}`)
}

// 删除
const handleDelete = async (item: UserInfo) => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: `确定删除用户「${item.nickname}」吗？`
    })
    await deleteUser(item.id)
    showToast('删除成功')
    refreshing.value = true
    onRefresh()
  } catch {
    // 取消
  }
}

// 新增
const handleAdd = () => {
  router.push('/system/user/add')
}

// 返回
const onClickLeft = () => {
  router.back()
}
</script>

<template>
  <div class="user-page">
    <!-- 导航栏 -->
    <van-nav-bar
      title="用户管理"
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
      placeholder="搜索用户名/昵称/手机号"
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
          <van-cell :title="item.nickname" :label="item.phone" center @click="handleDetail(item)">
            <template #icon>
              <van-image
                round
                width="40"
                height="40"
                :src="item.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
                style="margin-right: 12px"
              />
            </template>
            <template #value>
              <div class="cell-right">
                <van-tag :type="item.status === 1 ? 'success' : 'danger'" size="medium">
                  {{ item.status === 1 ? '启用' : '禁用' }}
                </van-tag>
                <div class="cell-info">
                  <span class="dept">{{ item.deptName }}</span>
                </div>
              </div>
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
.user-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.cell-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.cell-info {
  font-size: 12px;
  color: #999;
}

.van-swipe-cell {
  margin-bottom: 1px;
}
</style>
