<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@shared/stores'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

// 统计数据
const statistics = ref([
  { title: '客户总数', value: 1234, icon: 'User', color: '#409eff' },
  { title: '本月新增', value: 56, icon: 'Plus', color: '#67c23a' },
  { title: '商机金额', value: '¥128.5万', icon: 'Money', color: '#e6a23c' },
  { title: '成交订单', value: 89, icon: 'Document', color: '#f56c6c' }
])

// 快捷操作
const shortcuts = [
  { title: '新建客户', icon: 'Plus', path: '/customer' },
  { title: '新建商机', icon: 'TrendCharts', path: '' },
  { title: '新建合同', icon: 'Document', path: '' },
  { title: '查看报表', icon: 'DataAnalysis', path: '' }
]

// 快捷操作点击
const handleShortcut = (item: { title: string; path: string }) => {
  if (item.path) {
    router.push(item.path)
  } else {
    ElMessage.info(`${item.title}功能开发中`)
  }
}
</script>

<template>
  <div class="dashboard">
    <!-- 欢迎语 -->
    <div class="welcome-card">
      <div class="welcome-content">
        <h2>欢迎回来，{{ userStore.nickname || userStore.username }}!</h2>
        <p>今天是个好日子，祝你工作顺利！</p>
      </div>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="16" class="stat-row">
      <el-col v-for="item in statistics" :key="item.title" :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-info">
              <p class="stat-title">{{ item.title }}</p>
              <p class="stat-value">{{ item.value }}</p>
            </div>
            <div class="stat-icon" :style="{ backgroundColor: item.color }">
              <el-icon :size="24"><component :is="item.icon" /></el-icon>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 快捷操作 -->
    <el-card shadow="never" class="shortcut-card">
      <template #header>
        <span>快捷操作</span>
      </template>
      <el-row :gutter="16">
        <el-col v-for="item in shortcuts" :key="item.title" :span="6">
          <div class="shortcut-item" @click="handleShortcut(item)">
            <el-icon :size="32" color="#409eff"><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 待办事项 & 最近动态 -->
    <el-row :gutter="16" class="content-row">
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
              <el-link type="primary">查看全部</el-link>
            </div>
          </template>
          <el-empty description="暂无待办事项" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <template #header>
            <div class="card-header">
              <span>最近动态</span>
              <el-link type="primary">查看全部</el-link>
            </div>
          </template>
          <el-empty description="暂无动态" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  .welcome-card {
    padding: 24px;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    color: #fff;

    h2 {
      margin: 0 0 8px;
      font-size: 24px;
    }

    p {
      margin: 0;
      opacity: 0.8;
    }
  }

  .stat-row {
    margin-bottom: 16px;
  }

  .stat-card {
    .stat-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .stat-info {
      .stat-title {
        margin: 0 0 8px;
        font-size: 14px;
        color: #999;
      }

      .stat-value {
        margin: 0;
        font-size: 28px;
        font-weight: 600;
        color: #333;
      }
    }

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 8px;
      color: #fff;
    }
  }

  .shortcut-card {
    margin-bottom: 16px;

    .shortcut-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 16px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f5f7fa;
      }

      span {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .content-row {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
