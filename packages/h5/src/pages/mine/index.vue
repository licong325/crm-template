<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@shared/stores'
import { showConfirmDialog, showToast } from 'vant'

const router = useRouter()
const userStore = useUserStore()

// 菜单列表
const menuList = [
  { icon: 'user-o', title: '个人信息', path: '/profile' },
  { icon: 'setting-o', title: '设置', path: '/settings' },
  { icon: 'info-o', title: '关于我们', path: '/about' }
]

// 系统管理菜单
const systemMenuList = [
  { icon: 'friends-o', title: '用户管理', path: '/system/user' },
  { icon: 'shield-o', title: '角色管理', path: '/system/role' },
  { icon: 'cluster-o', title: '部门管理', path: '/system/dept' }
]

const handleMenuClick = (path: string) => {
  router.push(path)
}

const handleLogout = async () => {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要退出登录吗？'
    })
    await userStore.logout()
    showToast('已退出登录')
    router.replace('/login')
  } catch {
    // 取消
  }
}
</script>

<template>
  <div class="mine-page">
    <!-- 用户信息卡片 -->
    <div class="user-card">
      <van-image
        round
        width="64"
        height="64"
        :src="userStore.avatar || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'"
      />
      <div class="user-info">
        <p class="nickname">{{ userStore.nickname || userStore.username }}</p>
        <p class="phone">{{ userStore.userInfo?.phone || '未绑定手机' }}</p>
      </div>
      <van-icon name="arrow" />
    </div>

    <!-- 数据统计 -->
    <div class="data-card">
      <div class="data-item">
        <p class="data-value">128</p>
        <p class="data-label">我的客户</p>
      </div>
      <div class="data-item">
        <p class="data-value">56</p>
        <p class="data-label">我的商机</p>
      </div>
      <div class="data-item">
        <p class="data-value">23</p>
        <p class="data-label">我的合同</p>
      </div>
    </div>

    <!-- 菜单列表 -->
    <van-cell-group inset class="menu-group">
      <van-cell
        v-for="item in menuList"
        :key="item.title"
        :icon="item.icon"
        :title="item.title"
        is-link
        @click="handleMenuClick(item.path)"
      />
    </van-cell-group>

    <!-- 系统管理 -->
    <van-cell-group inset title="系统管理" class="menu-group">
      <van-cell
        v-for="item in systemMenuList"
        :key="item.title"
        :icon="item.icon"
        :title="item.title"
        is-link
        @click="handleMenuClick(item.path)"
      />
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="logout-wrap">
      <van-button block plain type="danger" @click="handleLogout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<style scoped>
.mine-page {
  min-height: 100%;
  padding-bottom: 80px;
  background-color: #f7f8fa;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 24px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .user-info {
    flex: 1;
    margin-left: 16px;

    .nickname {
      margin: 0 0 4px;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }

    .phone {
      margin: 0;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  .van-icon {
    color: rgba(255, 255, 255, 0.8);
  }
}

.data-card {
  display: flex;
  margin: -12px 12px 16px;
  padding: 20px 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.data-item {
  flex: 1;
  text-align: center;

  .data-value {
    margin: 0 0 4px;
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }

  .data-label {
    margin: 0;
    font-size: 12px;
    color: #999;
  }
}

.menu-group {
  margin-top: 12px;
}

.logout-wrap {
  padding: 24px 16px;
}
</style>
