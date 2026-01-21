<script setup lang="ts">
import { useUserStore } from '@shared/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// 统计数据
const statistics = ref([
  { label: '客户总数', value: 1234, color: '#1989fa' },
  { label: '本月新增', value: 56, color: '#07c160' },
  { label: '待跟进', value: 23, color: '#ff976a' },
  { label: '商机数', value: 89, color: '#ee0a24' }
])

// 快捷入口
const shortcuts = [
  { icon: 'add-o', text: '新建客户', path: '/customer/create' },
  { icon: 'friends-o', text: '客户列表', path: '/customer' },
  { icon: 'todo-list-o', text: '待办事项', path: '/todo' },
  { icon: 'chart-trending-o', text: '业绩统计', path: '/report' }
]

const handleShortcut = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="home-page">
    <!-- 头部 -->
    <div class="home-header">
      <div class="user-info">
        <van-image
          round
          width="48"
          height="48"
          :src="userStore.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
        />
        <div class="user-text">
          <p class="nickname">{{ userStore.nickname || userStore.username }}</p>
          <p class="greeting">欢迎回来!</p>
        </div>
      </div>
      <van-icon name="bell" size="24" color="#fff" badge="3" />
    </div>

    <!-- 统计卡片 -->
    <div class="stat-card">
      <div v-for="item in statistics" :key="item.label" class="stat-item">
        <p class="stat-value" :style="{ color: item.color }">{{ item.value }}</p>
        <p class="stat-label">{{ item.label }}</p>
      </div>
    </div>

    <!-- 快捷入口 -->
    <div class="shortcut-section">
      <van-grid :column-num="4" :border="false">
        <van-grid-item
          v-for="item in shortcuts"
          :key="item.text"
          :icon="item.icon"
          :text="item.text"
          @click="handleShortcut(item.path)"
        />
      </van-grid>
    </div>

    <!-- 待办事项 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">待办事项</span>
        <span class="section-more">查看全部</span>
      </div>
      <van-empty description="暂无待办事项" image="search" />
    </div>

    <!-- 最近客户 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">最近客户</span>
        <span class="section-more">查看全部</span>
      </div>
      <van-empty description="暂无最近客户" image="search" />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100%;
  padding-bottom: 60px;
}

.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-text {
  .nickname {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .greeting {
    margin: 0;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }
}

.stat-card {
  display: flex;
  margin: -20px 12px 16px;
  padding: 20px 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.stat-item {
  flex: 1;
  text-align: center;

  .stat-value {
    margin: 0 0 4px;
    font-size: 24px;
    font-weight: 600;
  }

  .stat-label {
    margin: 0;
    font-size: 12px;
    color: #999;
  }
}

.shortcut-section {
  margin: 0 12px 16px;
  padding: 12px 0;
  background: #fff;
  border-radius: 12px;
}

.section {
  margin: 0 12px 16px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .section-more {
    font-size: 12px;
    color: #1989fa;
  }
}
</style>
