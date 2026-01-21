<script setup lang="ts">
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

// 搜索关键词
const keyword = ref('')

// 客户列表
const customerList = ref([
  { id: '1', name: '张三科技有限公司', contact: '张三', phone: '13800138001', status: 1 },
  { id: '2', name: '李四贸易公司', contact: '李四', phone: '13800138002', status: 1 },
  { id: '3', name: '王五集团', contact: '王五', phone: '13800138003', status: 0 }
])

// 加载状态
const loading = ref(false)
const finished = ref(true)
const refreshing = ref(false)

// 下拉刷新
const onRefresh = () => {
  refreshing.value = true
  setTimeout(() => {
    refreshing.value = false
    showToast('刷新成功')
  }, 1000)
}

// 加载更多
const onLoad = () => {
  // TODO: 加载更多
  finished.value = true
}

// 搜索
const onSearch = () => {
  showToast(`搜索: ${keyword.value}`)
}

// 查看详情
const handleDetail = (id: string) => {
  router.push(`/customer/detail/${id}`)
}

// 拨打电话
const handleCall = (phone: string) => {
  window.location.href = `tel:${phone}`
}
</script>

<template>
  <div class="customer-page">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <van-search
        v-model="keyword"
        placeholder="搜索客户名称/联系人"
        show-action
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <!-- 客户列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="item in customerList"
          :key="item.id"
          class="customer-card"
          @click="handleDetail(item.id)"
        >
          <div class="customer-header">
            <span class="customer-name">{{ item.name }}</span>
            <van-tag :type="item.status === 1 ? 'success' : 'default'">
              {{ item.status === 1 ? '活跃' : '沉默' }}
            </van-tag>
          </div>
          <div class="customer-info">
            <div class="info-item">
              <van-icon name="user-o" />
              <span>{{ item.contact }}</span>
            </div>
            <div class="info-item" @click.stop="handleCall(item.phone)">
              <van-icon name="phone-o" color="#1989fa" />
              <span class="phone">{{ item.phone }}</span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 新建按钮 -->
    <div class="fab-btn" @click="router.push('/customer/create')">
      <van-icon name="plus" size="24" color="#fff" />
    </div>
  </div>
</template>

<style scoped>
.customer-page {
  min-height: 100%;
  padding-bottom: 80px;
  background-color: #f7f8fa;
}

.search-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
}

.customer-card {
  margin: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
}

.customer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .customer-name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
}

.customer-info {
  display: flex;
  gap: 24px;

  .info-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #666;

    .phone {
      color: #1989fa;
    }
  }
}

.fab-btn {
  position: fixed;
  right: 20px;
  bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
</style>
